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
  serial: string
  manufacturer: string
  imageUrl: string
  parentId?: ItemID
  childIds: ItemID[]
  availableData: DataProduct[]
}

export const items: { [id: ItemID]: Item } = {
  RDX5_Drill_BG00928740: {
    name: "RDX5 Drill",
    serial: "BG00928740",
    manufacturer: "Sandvik",
    imageUrl: "/images/items/RDX5_Drill_BG00928740.png",
    childIds: ["RDX5_Drill_BG00928741"],
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

  RDX5_Drill_BG00928741: {
    name: "RDX5 Drill",
    serial: "BG00928741",
    manufacturer: "Sandvik",
    imageUrl: "/images/items/RDX5_Drill_BG00928740.png",
    childIds: ["RDX5_Drill_BG00928742"],
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

  RDX5_Drill_BG00928742: {
    name: "RDX5 Drill",
    serial: "BG00928742",
    manufacturer: "Sandvik",
    imageUrl: "/images/items/RDX5_Drill_BG00928740.png",
    childIds: ["RDX5_Drill_BG00928743", "Transmission_BG00788225"],
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

  RDX5_Drill_BG00928743: {
    name: "RDX5 Drill",
    serial: "BG00928743",
    manufacturer: "Sandvik",
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

  Transmission_BG00788225: {
    name: "Transmission",
    serial: "BG00788225",
    manufacturer: "Sandvik",
    imageUrl: "/images/items/Transmission_BG00788225.png",
    childIds: [],
    availableData: [
      {
        name: "Product data sheet (MOCK)",
        definition: "Foo/Bar",
        source: "foo",
        args: {
          serial: "BG00788225",
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
        definition: "Carbon/Foot/Print",
        source: "foo",
        args: {
          item: "Transmission",
          serial: "BG00788225",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
      {
        name: "Traceability report",
        definition: "Traceability",
        source: "foo",
        args: {
          item: "Transmission",
          serial: "BG00788225",
        },
        roles: [Role.QUALITY_ENGINEER, Role.SUSTAINABILITY_MANAGER],
      },
      {
        name: "Measurement report",
        definition: "Measurement",
        source: "foo",
        args: {
          item: "Transmission",
          serial: "BG00788225",
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

export function getItemByNameSerial(name: string, serial: string): Item {
  let item = Object.values(items).find((item) => item.name === name && item.serial === serial)

  if (!item) {
    throw new Error(`No item by name ${name} and serial ${serial}`)
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
      if (items[childId].parentId) {
        console.warn(`Overriding parent of ${childId}, seems like it has multiple parents?`)
        console.warn(`Old: ${items[childId].parentId}, New: ${itemId}`)
      }
      items[childId].parentId = itemId
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
    // Not a critical error
    console.error("Seems there is infinite recursion in item tree, you might want to fix that.")

    // @ts-ignore ... TypeScript didn't want me typing the catch either so eh, whatever
    console.error(e.nesting.join(" -> "))
  }
}

init()
