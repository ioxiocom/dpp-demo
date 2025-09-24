/*
 * This file is for the client-side to make data product requests from the backend (or use mocks).
 * We don't need to know access tokens, API tokens, or any other secrets in this file.
 */

import { sleep } from "$lib/utils"
import { getMock, type Mock } from "$lib/api/mocks"
import { config } from "$lib/config"

// Client-side data product cache
const dataProductLifetime = 5 * 60 * 1000 // 5min
const dataProductCache = {}

export async function getDataProduct(definition: string, source: string, args: object) {
  // Check if already available in cache
  const cacheKey = `${definition}?source=${source}&args=` + JSON.stringify(args)
  const ts = Date.now()
  if (dataProductCache[cacheKey] && dataProductCache[cacheKey].expires > ts) {
    await sleep(config.fakeRequestTime) // We want it to look like there's always a request
    return dataProductCache[cacheKey].result
  }

  try {
    const mock = getMock(definition, source, args)
    return await getMockData(mock)
  } catch (e) {
    // No mock found
    const result = await fetchDataProduct(definition, source, args)

    // Store in cache
    dataProductCache[cacheKey] = {
      expires: ts + dataProductLifetime,
      result: result,
    }

    return result
  }
}

async function fetchDataProduct(definition: string, source: string, data: object) {
  // Pass the request to the backend
  const url = `/api/fetch-data-product/${definition}?source=${source}`

  const result = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (result.ok) {
    return result.json()
  }

  throw new Error(`Failed to fetch data product, got status ${result.status} ${result.statusText}`)
}

async function getMockData(mock: Mock) {
  await sleep(config.fakeRequestTime)

  return mock.response
}
