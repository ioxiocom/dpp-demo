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
    name: "RDX5 Rock Drill (Item)",
    product: "BG00928740",
    serial: "L082566",
    manufacturer: "Sandvik",
    imageUrl: "/images/items/RDX5-Drill.png",
    childIds: [
      "BG00788225_T2-3265",
      "55003625_43496",
      "BG00790833_8675",
      "BG00787392_09N25",
      "55057798_TW711338",
      "BG01127113_C25TF",
    ],
    availableData: [
      {
        name: "Product carbon footprint",
        definition: "Product/Sustainability/CarbonFootprint_v0.1",
        source: "foo",
        args: {
          item: "BG00928740",
          serial: "L082566",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
    ],
  },

  "BG00788225_T2-3265": {
    name: "Housing gear (Item)",
    product: "BG00788225",
    serial: "T2-3265",
    manufacturer: "Sandvik",
    imageUrl: "/images/items/Housing-gear.png",
    childIds: [],
    availableData: [
      {
        name: "Product carbon footprint",
        definition: "Product/Sustainability/CarbonFootprint_v0.1",
        source: "foo",
        args: {
          item: "BG00788225",
          serial: "T2-3265",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
    ],
  },

  "55003625_43496": {
    name: "Accumulator (Item)",
    product: "55003625",
    serial: "43496",
    manufacturer: "Ita Nordic",
    imageUrl: "/images/items/Accumulator.png",
    childIds: ["55003691_M11411521", "9733978_M11967763"],
    availableData: [
      {
        name: "Product carbon footprint",
        definition: "Product/Sustainability/CarbonFootprint_v0.1",
        source: "foo",
        args: {
          item: "55003625",
          serial: "43496",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
      {
        name: "Traceability report",
        definition: "Product/MetalComponent/Traceability_v0.3",
        source: "foo",
        args: {
          serial: "43496",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
    ],
  },

  "55003691_M11411521": {
    name: "Base (Item)",
    product: "55003691",
    serial: "M11411521",
    manufacturer: "Ita Nordic",
    imageUrl: "/images/items/Accumulator.png",
    childIds: [],
    availableData: [
      {
        name: "Product carbon footprint",
        definition: "Product/Sustainability/CarbonFootprint_v0.1",
        source: "foo",
        args: {
          item: "55003691",
          serial: "M11411521",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
    ],
  },

  "9733978_M11967763": {
    name: "Cover (Item)",
    product: "9733978",
    serial: "M11967763",
    manufacturer: "Ita Nordic",
    imageUrl: "/images/items/Accumulator.png",
    childIds: [],
    availableData: [
      {
        name: "Product carbon footprint",
        definition: "Product/Sustainability/CarbonFootprint_v0.1",
        source: "foo",
        args: {
          item: "9733978",
          serial: "M11967763",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
    ],
  },

  BG00790833_8675: {
    name: "Flushing device (Batch)",
    product: "BG00790833",
    serial: "8675",
    manufacturer: "Ita Nordic",
    imageUrl: "/images/items/Flushing-device.png",
    childIds: [],
    availableData: [
      {
        name: "Product carbon footprint",
        definition: "Product/Sustainability/CarbonFootprint_v0.1",
        source: "foo",
        args: {
          item: "BG00790833",
          serial: "8675",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
      {
        name: "Traceability report",
        definition: "Product/MetalComponent/Traceability_v0.3",
        source: "foo",
        args: {
          serial: "8675",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
    ],
  },

  BG00787392_09N25: {
    name: "Housing seal (Batch)",
    product: "BG00787392",
    serial: "09N25",
    manufacturer: "Nomet",
    imageUrl: "/images/items/Housing-seal.png",
    childIds: [],
    availableData: [
      {
        name: "Measurement report",
        definition: "Product/MetalComponent/MeasurementReport_v0.3",
        source: "foo",
        args: {
          serial: "09N25",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
    ],
  },

  "55057798_TW711338": {
    name: "Bushing rotation (Batch)",
    product: "55057798",
    serial: "TW711338",
    manufacturer: "Tasowheel",
    imageUrl: "/images/items/Bushing-rotation.png",
    childIds: [],
    availableData: [
      {
        name: "Product carbon footprint",
        definition: "Product/Sustainability/CarbonFootprint_v0.1",
        source: "tasowheel",
        args: {
          "product": "55057794",
          "queryLevel": "batch",
          "id": "711338",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
      {
        name: "Traceability report",
        definition: "Product/MetalComponent/Traceability_v0.3",
        source: "tasowheel",
        args: {
          "product": "55057794",
          "queryLevel": "batch",
          "id": "711338",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
      {
        name: "Measurement conformity",
        definition: "Product/MeasurementConformity_v0.1",
        source: "foo",
        args: {
          serial: "TW711338",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
    ],
  },

  BG01127113_C25TF: {
    name: "Rotation shaft (Batch)",
    product: "BG01127113",
    serial: "C25TF",
    manufacturer: "Hanza",
    imageUrl: "/images/items/Rotation-shaft.png",
    childIds: [],
    availableData: [
      {
        name: "Product carbon footprint",
        definition: "Product/Sustainability/CarbonFootprint_v0.1",
        source: "foo",
        args: {
          item: "BG01127113",
          serial: "C25TF",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
      {
        name: "Traceability report",
        definition: "Product/MetalComponent/Traceability_v0.3",
        source: "foo",
        args: {
          serial: "C25TF",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
      {
        name: "Measurement conformity",
        definition: "Product/MeasurementConformity_v0.1",
        source: "foo",
        args: {
          serial: "C25TF",
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
