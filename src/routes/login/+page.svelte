<script lang="ts">
  import { login, roleNames, type User } from "$lib/state.svelte"
  import { config } from "$lib/config"
  import { goto } from "$app/navigation"
  import { page } from "$app/state"
  import Container from "$lib/components/Container.svelte"

  let afterLogin = $derived(page.url.searchParams.get("afterLogin") || "/")

  async function doLogin(user: User) {
    login(user)
    await goto(afterLogin, { invalidateAll: true })
  }

  async function kbdLogin(evt: KeyboardEvent, user: User) {
    if (evt.code === "Enter" || evt.code === "Space") {
      await doLogin(user)
    }
  }
</script>

<Container>
  <h1>Log into Sandvik</h1>
  <p>Welcome demo@example.com, choose which of your roles you want to use.</p>
  <section>
    {#each config.users as user}
      {@const icon = roleNames[user.role].replace(" ", "_").toLowerCase() + ".png"}
      <div
        class="box"
        onclick={() => doLogin(user)}
        onkeyup={(evt) => kbdLogin(evt, user)}
        role="button"
        tabindex="0"
      >
        <img src={`/images/roles/${icon}`} />
        {roleNames[user.role]}
      </div>
    {/each}
  </section>
</Container>

<style lang="scss">
  @use "$scss/init" as *;

  section {
    display: flex;
    flex-direction: column;
    gap: $default-spacing;

    .box {
      border: 1px solid black;
      border-radius: 3px;
      padding: 1rem;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 1.5rem;

      img {
        $size: 4rem;
        width: $size;
        height: $size;
        margin-right: $default-spacing;
      }
    }
  }
</style>
