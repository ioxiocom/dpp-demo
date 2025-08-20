<script lang="ts">
  import { login, roleNames, unauthenticated, type User } from "$lib/state.svelte"
  import { config } from "$lib/config"
  import { page } from "$app/state"
  import { goto, invalidateAll } from "$app/navigation"

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

  async function logout() {
    login(unauthenticated)
    await invalidateAll()
    await goto(page.url)
  }
</script>

<div class="login-wrapper">
  <div>
    <h1>Log into Sandvik</h1>
    <p>Welcome demo@example.com, choose which of your roles you want to use.</p>
  </div>
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
</div>
<div class="logout-wrapper">
  <p>or</p>
  <button class="btn outlined" onclick={logout}>Log out</button>
</div>

<style lang="scss">
  @use "$scss/init" as *;

  .login-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.5rem;
    padding: 3rem 1.5rem;
    background: #f8f8f8;
  }

  .box {
    width: 100%;
    border-radius: 2px;
    background: #1441f5;
    color: #fff;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1.25rem;

    img {
      $size: 4rem;
      width: $size;
      height: $size;
      margin-right: $default-spacing;
    }
  }

  .logout-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    gap: 2rem;
  }

  h1 {
    color: #101010;
    font-family: "Istok Web";
    font-size: 36px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 54px */
  }

  p {
    color: #101010;
    font-family: "Istok Web";
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 30px */
  }
</style>
