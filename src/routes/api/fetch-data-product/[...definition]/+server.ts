import { error } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { config } from "$lib/config"
import { getApiToken } from "$lib/api/dataspace.server"

// POST /api/fetch-data-product/{definition}?source={source}
export const POST: RequestHandler = async ({ fetch, url, params, request }) => {
  const definition = params.definition
  const source = url.searchParams.get("source") || ""

  const apiToken = await getApiToken(definition, source, fetch)
  const gatewayUrl = new URL(`https://gateway.${config.dataspaceBaseDomain}/${params.definition}`)
  gatewayUrl.searchParams.append("source", source)

  const headers = {
    "Content-Type": "application/json",
    "X-API-Key": apiToken,
  }

  const response = await fetch(gatewayUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(await request.json()),
  })

  if (response.ok) {
    console.log(`Fetched ${definition} from ${source}`)
    return new Response(JSON.stringify(await response.json()))
  }

  console.error(
    `Data product request from ${config.dataspaceBaseDomain} failed for ${definition} source ${source} with status ${response.status} ${response.statusText}: ${JSON.stringify(await response.json())}`
  )

  return error(500, `Upstream responded with status ${response.status}: ${response.statusText}`)
}
