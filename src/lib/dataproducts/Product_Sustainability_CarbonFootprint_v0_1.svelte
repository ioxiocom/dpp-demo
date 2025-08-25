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

  const totalFootprint =
    response.logisticsFootprint + response.materialFootprint + response.processingFootprint
</script>

<Article>
  <SectionHeader title="Carbon Footprint">The carbon footprint of manufacturing a product.</SectionHeader>

  <DataRow label="Material footprint" value={formatNumber(response.materialFootprint, "kg CO₂e")} />
  <DataRow label="Processing footprint" value={formatNumber(response.processingFootprint, "kg CO₂e")} />
  <DataRow label="Logistics footprint" value={formatNumber(response.logisticsFootprint, "kg CO₂e")} />
</Article>
