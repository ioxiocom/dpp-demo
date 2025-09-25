<script lang="ts">
  import DataRow from "$lib/components/DataRow.svelte"
  import FakeLink from "$lib/components/FakeLink.svelte"
  import Article from "$lib/components/Article.svelte"
  import SectionHeader from "$lib/components/SectionHeader.svelte"

  export let response: {
    inspectionReport: boolean
    inspectionReportUrl: string
    statisticalControl: boolean
    processCapability: string
    remarks: string
  }

  const href = response.inspectionReportUrl.startsWith("https://itacloud")
    ? response.inspectionReportUrl
    : new URL(response.inspectionReportUrl).origin
</script>

<Article>
  <SectionHeader title="Conformity report"></SectionHeader>

  <DataRow label="Inspection report" value={response.inspectionReport} />
  <FakeLink label="Inspection report URL" {href} value={response.inspectionReportUrl} />
  <DataRow label="Process in statistical control" value={response.statisticalControl} />
  <DataRow label="Process capability" value={response.processCapability} />
  <DataRow label="Remarks" value={response.remarks} />
</Article>
