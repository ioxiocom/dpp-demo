export type Mock = {
  definition: string
  source: string
  args?: object // If not provided all requests to definition+source match
  response: object
}

export const mocks: Mock[] = [
  // Foo/Bar?source=foo BG00928740
  {
    definition: "Foo/Bar",
    source: "foo",
    args: {
      serial: "L082566",
    },
    response: {
      hello: "BG00928740 L082566",
    },
  },

  // Foo/Bar?source=foo BG00788225
  {
    definition: "Foo/Bar",
    source: "foo",
    args: {
      serial: "BG00788225",
    },
    response: {
      hello: "BG00788225",
    },
  },
]

export function getMock(definition: string, source: string, data: object): Mock {
  const item = mocks.find((item) => {
    if (item.definition === definition && item.source === source) {
      if (!item.args) {
        return item
      }
      for (let key in item.args) {
        // @ts-ignore
        if (item.args[key] !== data[key]) {
          return false
        }
      }
      return item
    }
  })

  if (!item) {
    throw new Error("No mock found.")
  }

  return item
}
