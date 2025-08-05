<script lang="ts">
  import type { DataProduct } from "$lib/items"
  import { getDataProduct } from "$lib/api/dataproduct"
  import { supportedDataProducts } from "$lib/dataproducts"
  import type { Component } from "svelte"
  import { onNavigate } from "$app/navigation"

  let dataProduct: DataProduct = $props()
  let DataProductComponent: Component<any> | undefined = $derived(
    supportedDataProducts[dataProduct.definition]
  )

  let open = $state(false)
  let data = $state({})
  let loading = $state(false)
  let error = $state(false)

  async function fetchData() {
    loading = true
    try {
      data = await getDataProduct(dataProduct.definition, dataProduct.source, dataProduct.args)
      open = true
    } catch (e) {
      error = true
      setTimeout(() => (error = false), 1500)
    }
    loading = false
  }

  function closeBox() {
    open = false
    data = {}
  }

  onNavigate(() => {
    closeBox()
  })
</script>

<div class="box" class:unsupported={!DataProductComponent}>
  <div class="title" class:open>
    <span>{dataProduct.name}</span>
    <div class="request">
      {#if DataProductComponent}
        <button onclick={fetchData} class:error>
          {#if error}
            Error, please try again.
          {:else if !loading}
            Request latest data
          {:else}
            Loading...
          {/if}
        </button>
      {:else}
        <button disabled>Unsupported</button>
      {/if}
    </div>
    <div class="close">
      <button onclick={closeBox}>Close</button>
    </div>
  </div>
  {#if open}
    <div class="content">
      <DataProductComponent request={dataProduct.args} response={data}></DataProductComponent>
    </div>
  {/if}
</div>

<style lang="scss">
  @use "$scss/init" as *;

  .box {
    border: 1px solid black;
    border-radius: 3px;
    padding: 1rem;

    &.unsupported {
      border-style: dashed;
      background: rgba(0, 0, 0, 3%);
    }
  }

  button.error {
    background-color: #ffb6b6;
  }

  .title {
    .close {
      display: none;
    }

    &.open {
      .request {
        display: none;
      }

      .close {
        display: block;
      }
    }
  }
</style>
