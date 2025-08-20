<script lang="ts">
  import { formatNumber } from "$lib/utils"
  import DataRow from "$lib/components/DataRow.svelte"
  import Divider from "$lib/components/Divider.svelte"
  import Article from "$lib/components/Article.svelte"
  import SectionHeader from "$lib/components/SectionHeader.svelte"

  export let response: {
    logisticsFootprint: number
    materialFootprint: number
    processingFootprint: number
  }

  const totalFootprint = response.logisticsFootprint + response.materialFootprint + response.processingFootprint
  console.log(response)
</script>

<Article>
  <SectionHeader title="Carbon Footprint">
    Breakdown of the product's carbon footprint by category (kg CO₂e)
  </SectionHeader>

  <DataRow label="Total carbon footprint" value={formatNumber(totalFootprint, "kg CO₂e")} />

  <Divider />

  <DataRow label="Material footprint" value={formatNumber(response.materialFootprint, "kg CO₂e")} />
  <DataRow label="Processing footprint" value={formatNumber(response.processingFootprint, "kg CO₂e")} />
  <DataRow label="Logistics footprint" value={formatNumber(response.logisticsFootprint, "kg CO₂e")} />
</Article>
