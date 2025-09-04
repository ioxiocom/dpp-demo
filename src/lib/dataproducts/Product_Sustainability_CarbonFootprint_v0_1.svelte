<script lang="ts">
  import { formatNumber, formatNumberPrecision } from "$lib/utils"
  import DataRow from "$lib/components/DataRow.svelte"
  import Divider from "$lib/components/Divider.svelte"
  import Article from "$lib/components/Article.svelte"
  import SectionHeader from "$lib/components/SectionHeader.svelte"

  export let response: {
    logisticsFootprint: number
    materialFootprint: number
    processingFootprint: number
  }

  const totalFootprint =
    response.logisticsFootprint + response.materialFootprint + response.processingFootprint
</script>

<Article>
  <SectionHeader title="Carbon Footprint">The carbon footprint of manufacturing a product.</SectionHeader>

  <DataRow
    label="Material footprint"
    value={formatNumberPrecision(response.materialFootprint, 2, "kg CO₂e")}
  />
  <DataRow
    label="Processing footprint"
    value={formatNumberPrecision(response.processingFootprint, 2, "kg CO₂e")}
  />
  <DataRow
    label="Logistics footprint"
    value={formatNumberPrecision(response.logisticsFootprint, 2, "kg CO₂e")}
  />
  <Divider />
  <DataRow label="Total" value={formatNumberPrecision(totalFootprint, 2, "kg CO₂e")} />
</Article>
