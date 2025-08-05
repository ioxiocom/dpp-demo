import type { Component } from "svelte"

import FooBar from "$lib/dataproducts/FooBar.svelte"
import Meteorology_Weather_v0_1 from "$lib/dataproducts/Meteorology_Weather_v0_1.svelte"

export const supportedDataProducts: { [definition: string]: Component<any> } = {
  "Foo/Bar": FooBar,
  "Meteorology/Weather_v0.1": Meteorology_Weather_v0_1,
}
