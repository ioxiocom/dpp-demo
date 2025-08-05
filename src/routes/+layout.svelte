<script lang="ts">
  import Container from "$lib/components/Container.svelte"

  import "$scss/global.scss"
  import Nav from "$lib/components/Nav.svelte"

  const { children } = $props()
</script>

<div class="nav">
  <Container>
    <Nav />
  </Container>
</div>

<main class="container">
  <section class="content-container">
    {@render children()}
  </section>
</main>

<div class="footer">
  <Container>Powered by <a href="https://ioxio.com">IOXIO</a></Container>
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

  main {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .nav {
    border-bottom: 1px solid rgb(0, 0, 0, 5%);
    background-color: rgba(0, 0, 0, 2%);
    padding: $default-spacing;
  }

  .footer {
    padding: $default-spacing;
    border-top: 1px solid rgb(0, 0, 0, 5%);
    background-color: rgba(0, 0, 0, 2%);
  }

  .content-container {
    flex-grow: 1;
    padding: $default-spacing 0 $default-spacing 0;
  }
</style>
