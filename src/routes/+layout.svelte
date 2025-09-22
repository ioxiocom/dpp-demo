<script lang="ts">
  import Container from "$lib/components/Container.svelte"

  import "$scss/global.scss"
  import Nav from "$lib/components/Nav.svelte"

  import "@fontsource/istok-web/400.css"
  import "@fontsource/istok-web/700.css"
  import "@fontsource/poppins/400.css"
  import "@fontsource/poppins/500.css"
  import "@fontsource/poppins/600.css"
  import "@fontsource/inter/400.css"
  import "@fontsource/inter/500.css"
  import "@fontsource/inter/600.css"

  const { children } = $props()

  let isMenuOpen = $state(false)
</script>

<div class="layout-wrapper">
  <Nav bind:open={isMenuOpen} />

  {#if !isMenuOpen}
    <main class="container">
      <section class="content-container">
        {@render children()}
      </section>
    </main>
    <footer>
      <p>Powered by <a href="https://ioxio.com">IOXIO</a></p>
      <hr />
      <div class="disclaimer">
        <h6>DISCLAIMER</h6>
        <p>
          This is a demo application intended for demonstration purposes only and may include incomplete,
          simulated, or inaccurate data. Sandvik or any of the suppliers shown in the demo assume no
          responsibility or liability for any errors, omissions, or decisions made based on the information
          presented in this environment.
        </p>
      </div>
    </footer>
  {/if}
</div>

<style lang="scss">
  @use "$scss/init" as *;

  :global(html, body) {
    margin: 0;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .layout-wrapper {
    margin: 0 auto;
    max-width: 42rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  main {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  footer {
    border-top: 1px solid rgb(0, 0, 0, 5%);
    background-color: #101010;
    color: #fff;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    text-align: center;
    font-size: 0.875rem;
    padding: 0.5rem;
    display: flex;
    gap: 1rem;
    flex-direction: column;

    a {
      color: #a08c64;
    }

    hr {
      background-color: #6f6f6f;
      width: 50%;
      margin: 0 auto;
    }

    .disclaimer {
      h6 {
        font-size: 0.75rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      p {
        text-align: left;
        font-size: 0.6rem;
        font-weight: 400;
        margin-bottom: 0.5rem;
      }
    }
  }

  .content-container {
    flex-grow: 1;
    padding: 0 0 $default-spacing 0;
  }
</style>
