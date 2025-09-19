import { env } from "$env/dynamic/private"

const accessControlKeys: { [definition: string]: { [source: string]: string } } = {
  "foo/bar": {
    ioxio: env.ACK_FOO_BAR_IOXIO || "",
  },
  "Meteorology/Weather_v0.1": {
    "ioxio:visual_crossing": env.ACK_METEOROLOGY_WEATHER_IOXIO_VISUAL_CROSSING || "",
  },
  "Product/MetalComponent/Traceability_v0.3": {
    hanza: env.ACK_PRODUCT_METAL_COMPONENT_TRACEABILITY_HANZA || "",
    ita_nordic: env.ACK_PRODUCT_METAL_COMPONENT_TRACEABILITY_ITA_NORDIC || "",
    tasowheel: env.ACK_PRODUCT_METAL_COMPONENT_TRACEABILITY_TASOWHEEL || "",
  },
  "Product/Sustainability/CarbonFootprint_v0.1": {
    hanza: env.ACK_PRODUCT_SUSTAINABILITY_CARBON_FOOTPRINT_HANZA || "",
    ita_nordic: env.ACK_PRODUCT_SUSTAINABILITY_CARBON_FOOTPRINT_ITA_NORDIC || "",
    nomet: env.ACK_PRODUCT_SUSTAINABILITY_CARBON_FOOTPRINT_NOMET || "",
    tasowheel: env.ACK_PRODUCT_SUSTAINABILITY_CARBON_FOOTPRINT_TASOWHEEL || "",
  },
}

export const secrets = {
  accessControlKeys: accessControlKeys,
}

export function getAccessControlKey(definition: string, source: string): string {
  if (!secrets.accessControlKeys[definition] || !secrets.accessControlKeys[definition][source]) {
    throw new Error(`No access control key found for ${definition} from source ${source}`)
  }

  return secrets.accessControlKeys[definition][source]
}
