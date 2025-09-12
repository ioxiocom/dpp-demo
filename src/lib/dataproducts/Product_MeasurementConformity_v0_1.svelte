<script lang="ts">
  import DataRow from "$lib/components/DataRow.svelte"
  import Article from "$lib/components/Article.svelte"
  import SectionHeader from "$lib/components/SectionHeader.svelte"

  export let response: {
    inspectionReport: boolean
    inspectionReportUrl: string
    statisticalControl: boolean
    processCapability: string
    remarks: string
  }
</script>

<Article>
  <SectionHeader title="Conformity report"></SectionHeader>

  <DataRow label="Inspection report" value={response.inspectionReport} />
  <DataRow label="Inspection report URL" value={response.inspectionReportUrl} />
  <DataRow label="Process in statistical control" value={response.statisticalControl} />
  <DataRow label="Process capability" value={response.processCapability} />
  <DataRow label="Remarks" value={response.remarks} />
</Article>
