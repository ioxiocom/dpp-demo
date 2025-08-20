<script lang="ts">
  import { page } from "$app/state"
  import { getItemById, type Item } from "$lib/items"
  import { goto, invalidateAll } from "$app/navigation"
  import SandvikLogo from "$lib/assets/sandvik-logo.svg?component"
  import Hamburger from "$lib/assets/hamburger.svg?component"
  import { login, roleNames, startLogin, unauthenticated, type User } from "$lib/state.svelte"
  import ItemComponent from "./Item.svelte"
  import ArrowLeftDown from "$lib/assets/arrow-left-down.svg?component"

  let item: Item = $derived(page.data.item)
  let user: User = $derived(page.data.user)
  let open = $state(true)

  async function toggleMenu() {
    if (user.role) {
      open = !open
    } else {
      open = false
      await startLogin()
    }
  }

  async function logout() {
    login(unauthenticated)
    open = false
    await invalidateAll()
    await goto(page.url)
  }

  const rotate90 = { style: "transform: rotate(90deg)" }
</script>

<nav>
  <div class="navbar">
    <button class="hamburger" onclick={toggleMenu}>
      <Hamburger width="24" height="24" />
    </button>
    <SandvikLogo height="24" />
  </div>
  {#if item}
    <div class="nav-items" class:open>
      {#if user.role}
        <div class="auth">
          <p>
            You're currently authenticated as <b>demo@example.com</b> and using the {roleNames[user.role]} role.
          </p>
          <button class="btn outlined small" onclick={logout}>Log out</button>
        </div>
        <hr />
      {/if}
      <div class="current">
        <h2>Selected item</h2>
        <ItemComponent {item} selected />
      </div>
      <div class="parent">
        <h2 class="part-title">
          <ArrowLeftDown width="16" height="16" />
          <span>Selected item is a part of</span>
        </h2>
        {#if item.parentId}
          {@const _item = getItemById(item.parentId)}
          <ItemComponent item={_item} />
        {:else}
          <ItemComponent />
        {/if}
      </div>
      <div class="children">
        <h2 class="part-title">
          <ArrowLeftDown width="16" height="16" {...rotate90} />
          <span>Parts of the selected item</span>
        </h2>
        {#if item.childIds.length > 0}
          {#each item.childIds as id}
            {@const _item = getItemById(id)}
            <ItemComponent item={_item} />
          {/each}
        {:else}
          <ItemComponent />
        {/if}
      </div>
    </div>
  {/if}
</nav>

<style lang="scss">
  @use "$scss/init" as *;

  nav {
    padding: $default-spacing;
  }

  .navbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    border-bottom: 1px solid rgb(0, 0, 0, 5%);
    padding-bottom: 1rem;

    .hamburger {
      padding: 0;
      background-color: transparent;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .auth {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.5rem;
  }

  .nav-items {
    padding-top: 1rem;
    display: none;

    &.open {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .parent, .children {
      display: flex;
      flex-direction: column;
      gap: $default-spacing;
    }

    .part-title {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 1.125rem;
      gap: 0.5rem;
      font-weight: 400;
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
