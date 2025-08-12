<script lang="ts">
  import Container from "$lib/components/Container.svelte"
  import DataProduct from "$lib/components/DataProduct.svelte"

  import type { PageProps } from "./$types"
  import { startLogin } from "$lib/state.svelte"

  let { data }: PageProps = $props()
  let user = $derived(data.user)
  let item = $derived(data.item)
</script>

<Container>
  <h1>{item.name}</h1>
  <h2>{item.serial}</h2>
  <img src={item.imageUrl} alt="" />

  {#if user.role}
    <h3>Connected data</h3>
    <div class="data-products">
      {#each item.availableData as dataproduct}
        {#if dataproduct.roles.includes(user.role)}
          <DataProduct {...dataproduct} />
        {/if}
      {/each}
    </div>
  {:else}
    <div>
      <button onclick={startLogin}>Log in</button>
    </div>
  {/if}
</Container>

<style lang="scss">
  @use "$scss/init" as *;

  .data-products {
    display: flex;
    flex-direction: column;
    gap: $default-spacing;
  }
</style>
