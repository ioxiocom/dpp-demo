/*
 * Logic for how the backend interfaces with the dataspace, server-only code with access to secrets.
 */

import { getAccessControlKey } from "$lib/secrets.server"
import { config } from "$lib/config"

// Server-side API token cache
const apiTokenLifetime = 50 * 60 * 1000 // 50min
const apiTokenCache = {}

export async function getApiToken(definition: string, source: string, fetch) {
  // Check if already available in cache
  const cacheKey = `${definition}?source=${source}`
  const ts = Date.now()
  if (apiTokenCache[cacheKey] && apiTokenCache[cacheKey].expires > ts) {
    return apiTokenCache[cacheKey].token
  }

  // Request a new token
  const accessControlKey = getAccessControlKey(definition, source)
  const token = await fetchApiToken(definition, source, accessControlKey, fetch)

  // Store in cache
  apiTokenCache[cacheKey] = {
    expires: ts + apiTokenLifetime,
    token: token,
  }

  console.log(`Fetched fresh API token for ${definition} source ${source}.`)

  return token
}

async function fetchApiToken(definition: string, source: string, accessControlKey: string, fetch) {
  const url = `https://gateway.${config.dataspaceBaseDomain}/api/v1/api-token/request`
  const dsi = `dpp://${source}@${config.dataspaceBaseDomain}/${definition}`

  const headers = {
    "Content-Type": "application/json",
  }

  const result = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      sub: config.dataspaceGroup,
      aud: dsi,
      accessControlKey: accessControlKey,
    }),
  })

  if (!result.ok) {
    throw new Error(
      `Failed to fetch API token, server responded with status ${result.status} ${result.statusText}`
    )
  }

  const response = await result.json()
  return response.apiToken
}
