import { env } from "$env/dynamic/private"

const accessControlKeys: { [definition: string]: { [source: string]: string } } = {
  "foo/bar": {
    ioxio: env.ACK_FOO_BAR_IOXIO || "",
  },
  "Meteorology/Weather_v0.1": {
    "ioxio:visual_crossing": env.ACK_METEOROLOGY_WEATHER_IOXIO_VISUAL_CROSSING || "",
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
