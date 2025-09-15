export type Mock = {
  definition: string
  source: string
  args?: object // If not provided all requests to definition+source match
  response: object
}

const TRACEABILITY_EXAMPLE_RESPONSE = {
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
}

const CARBON_FOOTPRINT_EXAMPLE_RESPONSE = {
  materialFootprint: 1.23,
  processingFootprint: 2.45,
  logisticsFootprint: 0.18,
}

export const mocks: Mock[] = [
  // Product/MeasurementConformity_v0.1
  {
    definition: "Product/MeasurementConformity_v0.1",
    source: "foo",
    args: {
      serial: "C25TF",
    },
    response: {
      inspectionReport: true,
      inspectionReportUrl: "https://hanza.com/measurementReport.pdf?secret_key=1234",
      statisticalControl: false,
      processCapability: "Not available",
      remarks: "Measured with Coordinate Measuring Machine DEA Global S/N GLCI000435",
    },
  },
  {
    definition: "Product/MeasurementConformity_v0.1",
    source: "foo",
    args: {
      serial: "TW711338",
    },
    response: {
      inspectionReport: true,
      inspectionReportUrl: "https://tasowheel.fi/measurementReport.pdf?secret_key=1234",
      statisticalControl: true,
      processCapability: "Cp 1.33",
      remarks: "Measurements according to control plan",
    },
  },

  // Product/Sustainability/CarbonFootprint_v0.1
  {
    definition: "Product/Sustainability/CarbonFootprint_v0.1",
    source: "foo",
    args: {
      item: "BG00928740",
      serial: "L082566",
    },
    response: {
      materialFootprint: 574.66,
      processingFootprint: 62.13,
      logisticsFootprint: 4.92,
    },
  },
  {
    definition: "Product/Sustainability/CarbonFootprint_v0.1",
    source: "foo",
    args: {
      item: "BG00788225",
      serial: "T2-3265",
    },
    response: {
      materialFootprint: 207.35,
      processingFootprint: 22.39,
      logisticsFootprint: 1.89,
    },
  },
  {
    definition: "Product/Sustainability/CarbonFootprint_v0.1",
    source: "foo",
    args: {
      item: "55003625",
      serial: "43496",
    },
    response: CARBON_FOOTPRINT_EXAMPLE_RESPONSE,
  },
  {
    definition: "Product/Sustainability/CarbonFootprint_v0.1",
    source: "foo",
    args: {
      item: "55003691",
      serial: "M11411521",
    },
    response: CARBON_FOOTPRINT_EXAMPLE_RESPONSE,
  },
  {
    definition: "Product/Sustainability/CarbonFootprint_v0.1",
    source: "foo",
    args: {
      item: "9733978",
      serial: "M11967763",
    },
    response: CARBON_FOOTPRINT_EXAMPLE_RESPONSE,
  },
  {
    definition: "Product/Sustainability/CarbonFootprint_v0.1",
    source: "foo",
    args: {
      item: "BG00790833",
      serial: "8675",
    },
    response: CARBON_FOOTPRINT_EXAMPLE_RESPONSE,
  },

  // Product/MetalComponent/MeasurementReport_v0.3
  {
    definition: "Product/MetalComponent/MeasurementReport_v0.3",
    source: "foo",
    args: {
      serial: "09N25",
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
      serial: "43496",
    },
    response: TRACEABILITY_EXAMPLE_RESPONSE,
  },
  {
    definition: "Product/MetalComponent/Traceability_v0.3",
    source: "foo",
    args: {
      serial: "8675",
    },
    response: TRACEABILITY_EXAMPLE_RESPONSE,
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
