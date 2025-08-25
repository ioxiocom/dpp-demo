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

  // Product/Sustainability/CarbonFootprint_v0.1
  {
    definition: "Product/Sustainability/CarbonFootprint_v0.1",
    source: "foo",
    args: {
      item: "Transmission",
      serial: "09N25",
    },
    response: {
      materialFootprint: 4.8,
      processingFootprint: 5.3,
      logisticsFootprint: 0.3,
    },
  },

  // Product/MetalComponent/MeasurementReport_v0.3
  {
    definition: "Product/MetalComponent/MeasurementReport_v0.3",
    source: "foo",
    args: {
      serial: "L082566",
    },
    response: {
      componentIdentification: {
        purchaseOrder: "12345",
        componentName: "valve xyz",
        productionNumber: "pn-20240205-00123",
        drawingNumber: "xy00012345687",
      },
      customerInformation: {
        name: "Company xyz",
        department: "Department xyz",
      },
      measurementSetup: {
        remarks: "Measurement taken from the outer edge to center, following xyz standards.",
        measurementId: "1234567",
        measurementTimestamp: "2025-02-06T09:26:52Z",
        measurementRunType: "partial measurement",
        batchSize: 100,
        measuredItems: 50,
        deviations: 0,
        duration: 825,
        measurementEquipment: [
          {
            machineSerialNumber: "mfg-model-xxxx-yyyy",
          },
        ],
      },
      measurementResults: [
        {
          featureName: "valve diameter middle D84",
          measuredValue: 84.025,
          nominalValue: 84,
          upperTolerance: 0.055,
          lowerTolerance: 0.055,
          deviation: 0.025,
          isWithinTolerance: true,
        },
      ],
    },
  },

  // Product/MetalComponent/Traceability_v0.3
  {
    definition: "Product/MetalComponent/Traceability_v0.3",
    source: "foo",
    args: {
      serial: "L082566",
    },
    response: {
      manufacturingDate: "2025-02-06",
      deliveryDate: "2025-03-07",
      componentIdentification: {
        name: "string",
        subComponentDeclaration: [
          {
            name: "metal fastener",
            identifier: "batch-2024-ssbolt-0037",
          },
        ],
        purchaseOrder: "2345",
        workOrder: "wo-2025-0001",
        shipmentId: "19910123456784",
        blanks: [
          {
            identifier: "st-42crmo4-blt-ht1234-btch5678",
            type: "forging billet",
          },
        ],
        codeNomenclature: "73269010",
        drawingNumber: "12345",
        drawingRevision: "Rev A",
      },
      manufacturerInformation: {
        name: "Company xyz",
        identification: {
          identifierScheme: "gln",
          identifier: "1234567890123",
        },
        address: "Rue des Lilas 12, 1050 Bruxelles, Belgium",
        contactEmail: "contact@company.com",
      },
      processIdentification: {
        identifier: "procset-metal-2024-0458",
      },
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
