<script lang="ts">
  import { formatNumberPrecision, formatDuration, formatTimestamp } from "$lib/utils"
  import DataRow from "$lib/components/DataRow.svelte"
  import Article from "$lib/components/Article.svelte"
  import SectionHeader from "$lib/components/SectionHeader.svelte"
  import Divider from "$lib/components/Divider.svelte"

  type ComponentIdentification = {
    purchaseOrder?: string
    componentName?: string
    productionNumber?: string
    drawingNumber?: string
  }

  type CustomerInformation = {
    name?: string
    department?: string
  }

  type MeasurementResult = {
    featureName?: string
    measuredValue?: number
    nominalValue?: number
    upperTolerance?: number
    lowerTolerance?: number
    deviation?: number
    isWithinTolerance?: boolean
  }

  type MeasurementEquipment = {
    machineSerialNumber?: string
  }

  type MeasurementSetup = {
    remarks?: string
    measurementId?: string
    measurementTimestamp?: string
    measurementRunType?: string
    batchSize?: number
    measuredItems?: number
    deviations?: number
    duration?: number
    measurementEquipment: MeasurementEquipment[]
  }

  type MeasurementReportResponse = {
    componentIdentification: ComponentIdentification
    customerInformation: CustomerInformation
    measurementSetup: MeasurementSetup
    measurementResults: MeasurementResult[]
  }

  export let response: MeasurementReportResponse

  const mSetup = response.measurementSetup
  const cId = response.componentIdentification
</script>

<Article>
  <SectionHeader title="Component Identification">The identifiers related to the component.</SectionHeader>
  <DataRow label="Purchase order" value={cId.purchaseOrder} />
  <DataRow label="Component name" value={cId.componentName} />
  <DataRow label="Production number" value={cId.productionNumber} />
  <DataRow label="Drawing number" value={cId.drawingNumber} />

  {#if response.measurementResults.length > 0}
    <SectionHeader title="Measurement results">The results of the quality measurements.</SectionHeader>
    {#each response.measurementResults as result}
      <div class="padded">
        <SectionHeader title={result.featureName || "-"}>Feature name</SectionHeader>
        <DataRow label="Measured value" value={formatNumberPrecision(result.measuredValue || 0, 3, "mm")} />
        <DataRow label="Nominal value" value={formatNumberPrecision(result.nominalValue || 0, 3, "mm")} />
        <DataRow label="Upper tolerance" value={formatNumberPrecision(result.upperTolerance || 0, 3, "mm")} />
        <DataRow label="Lower tolerance" value={formatNumberPrecision(result.lowerTolerance || 0, 3, "mm")} />
        <DataRow label="Deviation" value={formatNumberPrecision(result.deviation || 0, 3, "mm")} />
        <DataRow label="Within tolerance?" value={result.isWithinTolerance} />
      </div>
      <Divider />
    {/each}
  {/if}

  <SectionHeader title="Measurement setup">
    The details describing the quality measurement setup.
  </SectionHeader>

  <DataRow label="Remarks" value={mSetup.remarks} />
  <DataRow label="Measurement ID" value={mSetup.measurementId} />
  <DataRow label="Measurement time" value={formatTimestamp(mSetup.measurementTimestamp)} />
  <DataRow label="Measurement run type" value={mSetup.measurementRunType} />
  <DataRow label="Batch size" value={mSetup.batchSize?.toString()} />
  <DataRow label="Measured items" value={mSetup.measuredItems?.toString()} />
  <DataRow label="Deviations" value={mSetup.deviations?.toString()} />
  <DataRow label="Duration" value={formatDuration(mSetup.duration)} />

  <Divider />
  <SectionHeader title="Customer Information">The identifiers related to the customer.</SectionHeader>

  <DataRow label="Name" value={response.customerInformation.name} />
  <DataRow label="Department" value={response.customerInformation.department} />

  {#if mSetup.measurementEquipment.length > 0}
    <Divider />
    <SectionHeader title="Measurement equipment">The identifiers related to the customer.</SectionHeader>
    {#each mSetup.measurementEquipment as equipment}
      <div class="padded">
        <DataRow label="Machine serial number" value={equipment.machineSerialNumber} />
      </div>
    {/each}
  {/if}
</Article>

<style>
  .padded {
    padding-left: 1rem;
    padding-bottom: 1rem;
  }
</style>
