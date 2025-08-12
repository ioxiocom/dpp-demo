<script lang="ts">
  import { page } from "$app/state"
  import { getItemById, type Item } from "$lib/items"
  import { goto, invalidateAll } from "$app/navigation"
  import { login, roleNames, startLogin, unauthenticated, type User } from "$lib/state.svelte"

  let item: Item = $derived(page.data.item)
  let user: User = $derived(page.data.user)
  let open = $state(false)

  async function toggleMenu() {
    if (user.role) {
      open = !open
    } else {
      open = false
      await startLogin()
    }
  }

  function selectItem(item: Item) {
    goto(`/item/${item.name}/${item.serial}/`)
  }

  function kbdSelectItem(evt: KeyboardEvent, item: Item) {
    if (evt.code === "Enter" || evt.code === "Space") {
      selectItem(item)
    }
  }

  async function logout() {
    login(unauthenticated)
    open = false
    await invalidateAll()
    await goto(page.url)
  }
</script>

<nav>
  <div class="navbar">
    {#if item}
      <button onclick={toggleMenu}>Menu</button>
    {/if}
  </div>
  {#if item}
    <div class="nav-items" class:open>
      <div class="auth">
        {#if user.role}
          <p>You're currently authenticated as demo@example.com and using the {roleNames[user.role]} role.</p>
          <button onclick={logout}>Log out</button>
        {/if}
      </div>
      <div class="current">
        <h2>Selected item</h2>
        <!-- TODO: Maybe move these 3 near-identical boxes in some item component? -->
        <div class="box selected">
          <h3>{item.name}</h3>
          <div class="details">
            <span>{item.serial}</span>
            <span>{item.manufacturer}</span>
          </div>
        </div>
      </div>
      <div class="parent">
        <h2>Selected item is a part of</h2>
        {#if item.parentId}
          {@const _item = getItemById(item.parentId)}
          <div
            class="box"
            onclick={() => selectItem(_item)}
            onkeyup={(evt) => kbdSelectItem(evt, _item)}
            role="button"
            tabindex="0"
          >
            <h3>{_item.name}</h3>
            <div class="details">
              <span>{_item.serial}</span>
              <span>{_item.manufacturer}</span>
            </div>
          </div>
        {:else}
          <div class="box none">
            <h3>Nothing</h3>
            <div class="details">
              <span>&nbsp;</span>
              <span>&nbsp</span>
            </div>
          </div>
        {/if}
      </div>
      <div class="children">
        <h2>Parts of the selected item</h2>
        {#if item.childIds.length > 0}
          {#each item.childIds as id}
            {@const _item = getItemById(id)}
            <div
              class="box"
              onclick={() => selectItem(_item)}
              onkeyup={(evt) => kbdSelectItem(evt, _item)}
              role="button"
              tabindex="0"
            >
              <h3>{_item.name}</h3>
              <div class="details">
                <span>{_item.serial}</span>
                <span>{_item.manufacturer}</span>
              </div>
            </div>
          {/each}
        {:else}
          <div class="box none">
            <h3>Nothing</h3>
            <div class="details">
              <span>&nbsp;</span>
              <span>&nbsp</span>
            </div>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</nav>

<style lang="scss">
  @use "$scss/init" as *;

  .nav-items {
    display: none;

    &.open {
      display: flex;
      flex-direction: column;
    }

    .children {
      display: flex;
      flex-direction: column;
      gap: $default-spacing;
    }

    .box {
      border: 1px solid black;
      border-radius: 3px;
      padding: 1rem;

      h3 {
        margin: 0;
      }

      &.selected {
        border-color: #1441f5;
        background-color: #e6ebff;
      }

      &.none {
        border-style: dashed;
        border-color: #888888;
      }
    }

    .box[role="button"] {
      cursor: pointer;
    }

    .details {
      color: #888;
      font-size: 14px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
</style>
