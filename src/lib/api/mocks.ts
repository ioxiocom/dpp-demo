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

const SANDVIK_MANUFACTURER_INFORMATION = {
  name: "Sandvik Mining and Construction Oy",
  identification: {
    identifierScheme: "nationalBusinessId",
    identifier: "FI02116007",
  },
  address: "Pihtisulunkatu 9, 33330 TAMPERE, Finland",
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
  {
    definition: "Product/MeasurementConformity_v0.1",
    source: "foo",
    args: {
      serial: "09N25",
    },
    response: {
      inspectionReport: true,
      inspectionReportUrl: "https://nomet.fi/measurementReport.pdf/?secret_key=1234",
      statisticalControl: true,
      processCapability: "Cp 1.33",
      remarks: "Mesaured with Zeiss Prismo 12/24/10",
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
      // housing gear
      item: "BG00788225",
      serial: "T2-3265",
    },
    response: {
      materialFootprint: 207.35,
      processingFootprint: 22.39,
      logisticsFootprint: 1.89,
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
  {
    definition: "Product/MetalComponent/Traceability_v0.3",
    source: "foo",
    args: {
      serial: "L082566",
    },
    response: {
      manufacturingDate: "2025-09-16",
      deliveryDate: "2025-09-30",
      componentIdentification: {
        name: "Rock drill RDX5 80cc, Water Flushing, 20kW, 67Hz",
        subComponentDeclaration: [],
        purchaseOrder: "121898",
        workOrder: "W241966",
        shipmentId: "19910123456784",
        blanks: [],
        codeNomenclature: "84314300",
        drawingNumber: "BG00928740",
        drawingRevision: "C",
      },
      manufacturerInformation: SANDVIK_MANUFACTURER_INFORMATION,
      processIdentification: {
        identifier: "BG00928740-M01",
      },
    },
  },
  {
    definition: "Product/MetalComponent/Traceability_v0.3",
    source: "foo",
    args: {
      serial: "T2-3265",
    },
    response: {
      manufacturingDate: "2025-09-01",
      deliveryDate: "2025-09-08",
      componentIdentification: {
        name: "Gear housing RDX5, machined",
        subComponentDeclaration: [],
        workOrder: "W234465",
        codeNomenclature: "84314300",
        drawingNumber: "BG00788225",
        drawingRevision: "F",
        blanks: [{ identifier: "7558", type: "Casting" }],
      },
      manufacturerInformation: SANDVIK_MANUFACTURER_INFORMATION,
      processIdentification: {
        identifier: "BG00788225-M05",
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
