<script lang="ts">
  import Container from "$lib/components/Container.svelte"

  import "$scss/global.scss"
  import Nav from "$lib/components/Nav.svelte"

  import "@fontsource/istok-web/400.css"
  import "@fontsource/istok-web/700.css"
  import "@fontsource/poppins/400.css"
  import "@fontsource/poppins/500.css"
  import "@fontsource/poppins/600.css"
  import "@fontsource-variable/inter"

  const { children } = $props()
</script>

<Nav />

<main class="container">
  <section class="content-container">
    {@render children()}
  </section>
</main>

<footer>
  Powered by <a href="https://ioxio.com">IOXIO</a>
</footer>

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

    a {
      color: #a08c64;
    }
  }

  .content-container {
    flex-grow: 1;
    padding: $default-spacing 0 $default-spacing 0;
  }
</style>
