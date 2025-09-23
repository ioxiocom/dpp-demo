<script lang="ts">
  const { children, size = "small" }: { children: string; size: "small" | "large" } = $props()
</script>

<div class="badge" class:large={size === "large"} class:small={size === "small"}>
  {@render children()}
</div>

<style lang="scss">
  .badge {
    display: inline-block;
    background-color: #e6ebff;
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    text-transform: uppercase;
    vertical-align: middle;

    &.large {
      font-size: 1rem;
    }

    &.small {
      font-size: 0.75rem;
      padding: 0.125rem 0.25rem;
    }
  }
</style>
