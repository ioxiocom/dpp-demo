import { Role } from "./state.svelte"

type ItemID = string

export type DataProduct = {
  definition: string
  source: string
  args: object
  name: string
  roles: Role[]
}

export type Item = {
  name: string
  product: string
  serial: string
  manufacturer: string
  imageUrl: string
  parentId?: ItemID
  childIds: ItemID[]
  availableData: DataProduct[]
}

export const items: { [id: ItemID]: Item } = {
  BG00928740_L082566: {
    name: "RDX5 Rock Drill",
    product: "BG00928740",
    serial: "L082566",
    manufacturer: "Sandvik",
    imageUrl: "/images/items/RDX5_Drill_BG00928740.png",
    childIds: [
      "BG00788225_T2-3265",
      "55003625_43496",
      "BG00790833_8675",
      "BG00787392_09N25",
      "55057798_TW711338",
      "BG01127113_C25TF",
      "BG00737500_K23-38",
    ],
    availableData: [
      {
        name: "Product data sheet (MOCK)",
        definition: "Foo/Bar",
        source: "foo",
        args: {
          serial: "L082566",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
      {
        name: "Current weather (REAL)",
        definition: "Meteorology/Weather_v0.1",
        source: "ioxio:visual_crossing",
        args: {
          lat: "59.43",
          lon: "24.75",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
    ],
  },

  "BG00788225_T2-3265": {
    name: "Housing, Gear",
    product: "BG00788225",
    serial: "T2-3265",
    manufacturer: "Sandvik",
    imageUrl: "/images/items/RDX5_Drill_BG00928740.png",
    childIds: [],
    availableData: [
      {
        name: "Product data sheet (MOCK)",
        definition: "Foo/Bar",
        source: "foo",
        args: {
          serial: "T2-3265",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
      {
        name: "Current weather (REAL)",
        definition: "Meteorology/Weather_v0.1",
        source: "ioxio:visual_crossing",
        args: {
          lat: "59.43",
          lon: "24.75",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
    ],
  },

  "55003625_43496": {
    name: "Accumulator",
    product: "55003625",
    serial: "43496",
    manufacturer: "Ita Nordic",
    imageUrl: "/images/items/RDX5_Drill_BG00928740.png",
    childIds: [],
    availableData: [
      {
        name: "Product data sheet (MOCK)",
        definition: "Foo/Bar",
        source: "foo",
        args: {
          serial: "43496",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
      {
        name: "Current weather (REAL)",
        definition: "Meteorology/Weather_v0.1",
        source: "ioxio:visual_crossing",
        args: {
          lat: "59.43",
          lon: "24.75",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
    ],
  },

  BG00790833_8675: {
    name: "Flushing device",
    product: "BG00790833",
    serial: "8675",
    manufacturer: "Ita Nordic",
    imageUrl: "/images/items/RDX5_Drill_BG00928740.png",
    childIds: [],
    availableData: [
      {
        name: "Product data sheet (MOCK)",
        definition: "Foo/Bar",
        source: "foo",
        args: {
          serial: "BG00928740",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
      {
        name: "Current weather (REAL)",
        definition: "Meteorology/Weather_v0.1",
        source: "ioxio:visual_crossing",
        args: {
          lat: "59.43",
          lon: "24.75",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
    ],
  },

  BG00787392_09N25: {
    name: "Housing, Seal",
    product: "BG00787392",
    serial: "09N25",
    manufacturer: "Nomet",
    imageUrl: "/images/items/Transmission_BG00788225.png",
    childIds: [],
    availableData: [
      {
        name: "Product data sheet (MOCK)",
        definition: "Foo/Bar",
        source: "foo",
        args: {
          serial: "09N25",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
      {
        name: "Fail test (ERROR)",
        definition: "Foo/Bar",
        source: "foo",
        args: {
          serial: "abc123",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
      {
        name: "Product carbon footprint",
        definition: "Product/Sustainability/CarbonFootprint_v0.1",
        source: "foo",
        args: {
          item: "Transmission",
          serial: "09N25",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
      {
        name: "Traceability report",
        definition: "Traceability",
        source: "foo",
        args: {
          item: "Transmission",
          serial: "09N25",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
      {
        name: "Measurement report",
        definition: "Measurement",
        source: "foo",
        args: {
          item: "Transmission",
          serial: "09N25",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
    ],
  },

  "55057798_TW711338": {
    name: "Bushing, Rotation",
    product: "55057798",
    serial: "TW711338",
    manufacturer: "Tasowheel",
    imageUrl: "/images/items/RDX5_Drill_BG00928740.png",
    childIds: [],
    availableData: [
      {
        name: "Product data sheet (MOCK)",
        definition: "Foo/Bar",
        source: "foo",
        args: {
          serial: "TW711338",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
      {
        name: "Current weather (REAL)",
        definition: "Meteorology/Weather_v0.1",
        source: "ioxio:visual_crossing",
        args: {
          lat: "59.43",
          lon: "24.75",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
    ],
  },

  BG01127113_C25TF: {
    name: "Rotation, Shaft",
    product: "BG01127113",
    serial: "C25TF",
    manufacturer: "Hanza",
    imageUrl: "/images/items/RDX5_Drill_BG00928740.png",
    childIds: [],
    availableData: [
      {
        name: "Product data sheet (MOCK)",
        definition: "Foo/Bar",
        source: "foo",
        args: {
          serial: "C25TF",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
      {
        name: "Current weather (REAL)",
        definition: "Meteorology/Weather_v0.1",
        source: "ioxio:visual_crossing",
        args: {
          lat: "59.43",
          lon: "24.75",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
    ],
  },

  "BG00737500_K23-38": {
    name: "Cylinder",
    product: "BG00737500",
    serial: "K23-38",
    manufacturer: "Sandvik",
    imageUrl: "/images/items/RDX5_Drill_BG00928740.png",
    childIds: [],
    availableData: [
      {
        name: "Product data sheet (MOCK)",
        definition: "Foo/Bar",
        source: "foo",
        args: {
          serial: "K23-38",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
      {
        name: "Current weather (REAL)",
        definition: "Meteorology/Weather_v0.1",
        source: "ioxio:visual_crossing",
        args: {
          lat: "59.43",
          lon: "24.75",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
    ],
  },
}

export function getItemById(id: ItemID): Item {
  if (!items[id]) {
    throw new Error(`Invalid ID ${id}`)
  }

  return items[id]
}

export function getItemByProductSerial(product: string, serial: string): Item {
  let item = Object.values(items).find((item) => item.product === product && item.serial === serial)

  if (!item) {
    throw new Error(`No item by name ${product} and serial ${serial}`)
  }

  return item
}

function _traverse(itemId: string, nesting: string[], processed: string[]) {
  nesting.push(itemId)
  processed.push(itemId)
  if (nesting.length > 25) {
    const err = new Error("Infinite recursion?")
    // @ts-ignore
    err.nesting = nesting

    throw err
  }

  for (let childId of items[itemId].childIds) {
    _traverse(childId, JSON.parse(JSON.stringify(nesting)), processed)
  }
}

function init() {
  // Generate parent IDs
  for (let itemId in items) {
    let children = items[itemId].childIds

    for (let childId of children) {
      if (typeof items[childId] === "undefined") {
        console.error(`${itemId} has child ${childId} which does not exist.`)
        continue
      }
      if (typeof items[childId].parentId !== "undefined" && items[childId].parentId) {
        console.warn(`Overriding parent of ${childId}, seems like it has multiple parents?`)
        console.warn(`Old: ${items[childId].parentId}, New: ${itemId}`)
      }
      items[childId].parentId = itemId
    }
  }

  for (let itemId in items) {
    if (typeof items[itemId].parentId === "undefined" || !items[itemId].parentId) {
      console.warn(`Item ${itemId} does not have a parent.`)
    }
  }

  // Do a basic sanity check for infinite recursion
  try {
    const processed: string[] = []
    for (let itemId in items) {
      if (!processed.includes(itemId)) {
        _traverse(itemId, [], processed)
      }
    }
  } catch (e) {
    console.error(e)
    // Not a critical error
    console.error("Seems there is infinite recursion in item tree, you might want to fix that.")

    // @ts-ignore ... TypeScript didn't want me typing the catch either so eh, whatever
    console.error(e.nesting.join(" -> "))
  }
}

init()
