<script lang="ts">
  import DataRow from "$lib/components/DataRow.svelte"
  import Article from "$lib/components/Article.svelte"
  import SectionHeader from "$lib/components/SectionHeader.svelte"
  import Divider from "$lib/components/Divider.svelte"
  import { formatDate } from "$lib/utils"

  type CompanyIdentifierScheme = "gln" | "nationalBusinessId" | "duns"

  type SubComponent = {
    name?: string
    identifier?: string
  }

  type Blank = {
    identifier?: string
    type?: string
  }

  type CompanyIdentification = {
    identifierScheme?: CompanyIdentifierScheme
    identifier?: string
  }

  type ProcessIdentification = {
    identifier?: string
  }

  type ComponentIdentification = {
    name?: string
    subComponentDeclaration: SubComponent[]
    purchaseOrder?: string
    workOrder?: string
    shipmentId?: string
    blanks: Blank[]
    codeNomenclature?: string
    drawingNumber?: string
    drawingRevision?: string
  }

  type ManufacturerInformation = {
    name?: string
    identification: CompanyIdentification
    address?: string
    contactEmail?: string
  }

  type TraceabilityResponse = {
    manufacturingDate?: string
    deliveryDate?: string
    componentIdentification: ComponentIdentification
    manufacturerInformation: ManufacturerInformation
    processIdentification: ProcessIdentification
  }

  const { response }: { response: TraceabilityResponse } = $props()

  function getCompanyIdentifierDisplay(identification: CompanyIdentification): string {
    if (!identification.identifier) return "-"
    const id = identification.identifier
    switch (identification.identifierScheme) {
      case "gln":
        return `${id} (GLN)`
      case "nationalBusinessId":
        return `${id} (National business ID)`
      case "duns":
        return `${id} (D-U-N-S)`
      case undefined:
        return id
    }
  }

  const component = response.componentIdentification
  const manufacturer = response.manufacturerInformation
  const process = response.processIdentification

  const subComponents = $derived.by(() => {
    const components: SubComponent[] = []
    for (const c of component.subComponentDeclaration) {
      if (c.name?.toLowerCase() !== "null" && c.identifier?.toLowerCase() !== "null") {
        components.push(c)
      }
    }
    return components
  })
</script>

<Article>
  <SectionHeader title="Traceability Information">
    The traceability information of a metal component.
  </SectionHeader>

  <SectionHeader title="Basic information" />
  <DataRow label="Manufacturing date" value={formatDate(response.manufacturingDate)} />
  <DataRow label="Delivery date" value={formatDate(response.deliveryDate)} />

  <SectionHeader title="Component Identification">The identifiers related to the component.</SectionHeader>

  <DataRow label="Name" value={component.name} />
  <DataRow label="Purchase order" value={component.purchaseOrder} />
  <DataRow label="Work order" value={component.workOrder} />
  <DataRow label="Shipment ID" value={component.shipmentId} />
  <DataRow label="Code nomenclature" value={component.codeNomenclature} />
  <DataRow label="Drawing number" value={component.drawingNumber} />
  <DataRow label="Drawing revision" value={component.drawingRevision} />

  {#if subComponents.length > 0}
    <SectionHeader title="Subcomponent declaration">The identifiers related to the component.</SectionHeader>

    {#each subComponents as subComponent}
      <div class="padded">
        <DataRow label="Name" value={subComponent.name} />
        <DataRow label="Work order" value={subComponent.identifier} />
      </div>
      <Divider />
    {/each}
  {/if}

  {#if component.blanks.length > 0}
    <SectionHeader title="Blanks">
      The identification details of the the blanks used for manufacturing the component.
    </SectionHeader>

    {#each component.blanks as blank}
      <div class="padded">
        <DataRow label="Type" value={blank.type} />
        <DataRow label="Identifier" value={blank.identifier} />
      </div>
      <Divider />
    {/each}
  {/if}

  <SectionHeader title="Manufacturer Information">The details of the component manufacturer.</SectionHeader>

  <DataRow label="Name" value={manufacturer.name} />
  <DataRow label="Company identifier" value={getCompanyIdentifierDisplay(manufacturer.identification)} />
  <DataRow label="Address" value={manufacturer.address} />
  <DataRow label="Contact email" value={manufacturer.contactEmail} />

  <Divider />

  <SectionHeader title="Process Identification">The details of the process.</SectionHeader>
  <DataRow label="Identifier" value={process.identifier} />
</Article>

<style lang="scss">
  .padded {
    padding-left: 1rem;
    padding-bottom: 1rem;
  }
</style>
