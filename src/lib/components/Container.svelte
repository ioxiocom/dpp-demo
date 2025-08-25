<script lang="ts">
  let { children } = $props()
</script>

<div class="container">
  {@render children()}
</div>

<style lang="scss">
  @use "$scss/init" as *;

  .container {
    margin: 0 auto;
    max-width: $max-width;
  }
</style>
