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
  connectedItems: ItemID[]
  availableData: DataProduct[]
}

export const items: { [id: ItemID]: Item } = {
  RDX5_Drill_BG00928740: {
    name: "RDX5 Drill",
    serial: "BG00928740",
    manufacturer: "Sandvik",
    imageUrl: "/images/items/RDX5_Drill_BG00928740.png",
    connectedItems: ["Transmission_BG00788225"],
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
    connectedItems: ["RDX5_Drill_BG00928740"],
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
