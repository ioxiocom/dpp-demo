<script lang="ts">
  import Container from "$lib/components/Container.svelte"
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
      <h1>{item.name}</h1>
      <h2>{item.serial}</h2>
    </div>
    <div></div>
  </div>
  <img class="item-image" src={item.imageUrl} alt="" />

  {#if user.role}
    <h3>Data available for users with the role {roleNames[user.role]}</h3>
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
      <button class="btn" onclick={startLogin}>Log in</button>
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
    padding: 1.5rem;

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
  }

  .item-image {
    width: 100%;
  }

  .not-logged-in {
    margin-top: 2rem;
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

  h3 {
    text-align: center;
    padding: 1rem 0;
  }
</style>
