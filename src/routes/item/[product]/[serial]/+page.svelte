<script lang="ts">
  import Badge from "$lib/components/Badge.svelte"
  import DataProduct from "$lib/components/DataProduct.svelte"
  import LockIcon from "$lib/assets/lock-icon.svg?component"
  import { roleNames } from "$lib/state.svelte"

  import type { PageProps } from "./$types"
  import { startLogin } from "$lib/state.svelte"

  let { data }: PageProps = $props()
  let user = $derived(data.user)
  let item = $derived(data.item)
</script>

<div>
  <div class="item-header">
    <div class="text">
      <h1>
        {item.name}
        <Badge size="large">{item.batch ? "Batch" : "Item"}</Badge>
      </h1>
      <div class="serial-block">
        <h2>{item.serial}</h2>
        {#if item.batchSize}
          <Badge size="small">{item.batchSize} items</Badge>
        {/if}
      </div>
    </div>
    <div class="logo">
      {#if item.manufacturer === "Sandvik"}
        <img src="/images/logos/sandvik.png" alt="" />
      {:else if item.manufacturer === "ITA Nordic"}
        <img src="/images/logos/ita-nordic.png" alt="" />
      {:else if item.manufacturer === "Nomet"}
        <img src="/images/logos/nomet.png" alt="" />
      {:else if item.manufacturer === "Tasowheel"}
        <img src="/images/logos/tasowheel.png" alt="" />
      {:else if item.manufacturer === "Hanza"}
        <img src="/images/logos/hanza.png" alt="" />
      {/if}
    </div>
  </div>
  <div class="item-image-container">
    <img class="item-image" src={item.imageUrl} alt="" />
  </div>

  {#if user.role}
    <div class="data-products-header">
      <h3>Data available for users with the role {roleNames[user.role]}</h3>
    </div>
    <div class="data-products">
      {#each item.availableData as dataproduct}
        {#if dataproduct.roles.includes(user.role)}
          <DataProduct {...dataproduct} />
        {/if}
      {/each}
    </div>
  {:else}
    <div class="not-logged-in">
      <LockIcon width="70" height="70" />
      <p>Viewing data requires authentication, please log in.</p>
      <button class="btn" onclick={startLogin}>Demo login</button>
    </div>
  {/if}
</div>

<style lang="scss">
  @use "$scss/init" as *;

  .item-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.5rem;

    .serial-block {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      align-items: flex-start;
    }

    .text {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      h1 {
        font-family: "Istok Web", sans-serif;
        font-size: 2.25rem;
        font-weight: 400;
        color: #101010;
        margin: 0;
      }

      h2 {
        font-family: "Inter", sans-serif;
        font-size: 1rem;
        font-weight: 400;
        color: #6f6f6f;
        margin: 0;
      }
    }

    .logo {
      flex-shrink: 0;
    }

    :global(.logo img) {
      height: 1.5rem;
    }
  }

  .item-image-container {
    background: #000;
    width: 100%;
    aspect-ratio: 16/9;
    display: flex;
    align-items: center;
    justify-content: center;

    .item-image {
      width: 100%;
    }
  }

  .not-logged-in {
    margin-top: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    p {
      font-family: "Istok Web", sans-serif;
    }
  }

  .data-products {
    display: flex;
    flex-direction: column;
    gap: $default-spacing;
    padding: 0 $default-spacing;
  }

  .data-products-header {
    padding: 1rem;

    h3 {
      background-color: #e6ebff;
      text-align: center;
      color: #1441f5;
      font-weight: 400;
      padding: 0.5rem 0;
    }
  }
</style>
