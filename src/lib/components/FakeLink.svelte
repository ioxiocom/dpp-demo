<script lang="ts">
  export let label: string
  export let href: string
  export let value: string
  export let column: boolean = false
</script>

<div class={`data ${column ? "column" : "row"}`}>
  <div class="label">
    {label}:
  </div>
  <div class="value">
    <a {href} target="_blank" rel="noreferrer">{value}</a>
  </div>
</div>

<style lang="scss">
  .data {
    display: flex;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }

    &.row {
      flex-direction: row;
      align-items: flex-start;
    }

    &.column {
      flex-direction: column;
    }
  }

  .label {
    flex: 0 0 55%;
    line-height: 150%;
    padding-right: 0.5rem;
  }

  .value {
    line-height: 150%;
    flex: 0 0 45%;
    word-break: break-word;

    a {
      color: #3cb08e;
    }

    img {
      width: 1.5rem;
      line-height: 1.5rem;
    }
  }
</style>
