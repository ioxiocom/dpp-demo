<script lang="ts">
  import { page } from "$app/state"
  import { type Item, itemTree } from "$lib/items"
  import { goto, invalidateAll } from "$app/navigation"
  import SandvikLogo from "$lib/assets/sandvik-logo.svg?component"
  import Hamburger from "$lib/assets/hamburger.svg?component"
  import { login, roleNames, startLogin, unauthenticated, type User } from "$lib/state.svelte"
  import ItemComponent from "./Item.svelte"

  let item: Item = $derived(page.data.item)
  let user: User = $derived(page.data.user)
  let { open = $bindable(false) } = $props()

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

  async function selectItem(item: Item) {
    await goto(`/item/${item.product}/${item.serial}/`)
    open = false
  }
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
      {#each itemTree as item}
        <ItemComponent {item} onClick={selectItem} />
      {/each}
    </div>
  {/if}
</nav>

<style lang="scss">
  @use "$scss/init" as *;

  nav {
    padding: 1rem;
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
  }
</style>
