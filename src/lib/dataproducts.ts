import type { Component } from "svelte"

import FooBar from "$lib/dataproducts/FooBar.svelte"
import Meteorology_Weather_v0_1 from "$lib/dataproducts/Meteorology_Weather_v0_1.svelte"
import MeasurementReport_v_0_3 from "$lib/dataproducts/Product_MetalComponent_MeasurementReport_v0_3.svelte"
import Traceability_v_0_3 from "$lib/dataproducts/Product_MetalComponent_Traceability_v0_3.svelte"
import CarbonFootprint_v_0_1 from "$lib/dataproducts/Product_Sustainability_CarbonFootprint_v0_1.svelte"
import MeasurementConformity_v_0_1 from "$lib/dataproducts/Product_MeasurementConformity_v0_1.svelte"

export const supportedDataProducts: { [definition: string]: Component<any> } = {
  "Foo/Bar": FooBar,
  "Meteorology/Weather_v0.1": Meteorology_Weather_v0_1,
  "Product/MetalComponent/MeasurementReport_v0.3": MeasurementReport_v_0_3,
  "Product/MetalComponent/Traceability_v0.3": Traceability_v_0_3,
  "Product/Sustainability/CarbonFootprint_v0.1": CarbonFootprint_v_0_1,
  "Product/MeasurementConformity_v0.1": MeasurementConformity_v_0_1,
}
