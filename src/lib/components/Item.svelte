<script lang="ts">
  import type { Item } from "$lib/items"
  import Self from "./Item.svelte"
  import { page } from "$app/state"

  type Props = {
    item?: Item
    onClick?: (item: Item) => void
    level?: number
  }
  let { item, onClick, level = 0 }: Props = $props()

  function handleClick() {
    if (item && onClick) {
      onClick(item)
    }
  }

  const nothing = $derived(typeof item === "undefined")
  const selected = $derived(page.params.product === item?.product && page.params.serial === item?.serial)
</script>

<button
  class="item"
  class:selected
  class:nothing
  onclick={handleClick}
  style={`--padding: ${level * 1.5}rem;`}
>
  <h3>{item?.name || "Nothing"}</h3>
  <div class="details">
    <span>{item?.serial || ""}</span>
    <h4>{item?.manufacturer || ""}</h4>
  </div>
</button>
{#each item?.children || [] as child}
  <Self item={child} {onClick} level={level + 1} />
{/each}

<style lang="scss">
  @use "$scss/init" as *;
  .children {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .children-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .item {
    border: 1px solid black;
    padding: 1rem;
    user-select: none;
    background-color: #fff;
    margin-left: var(--padding);

    h3 {
      margin: 0;
      text-align: left;
      font-weight: 400;
    }

    h4 {
      color: #101010;
    }

    &.selected {
      border-color: #1441f5;
      background-color: #e6ebff;
    }

    &.none {
      border-style: dashed;
      border-color: #888888;
    }

    &.nothing {
      border-style: dashed;
      border-color: #888888;
      h3 {
        color: #888;
      }
    }
  }

  .details {
    color: #888;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
