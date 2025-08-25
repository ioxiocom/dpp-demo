<script lang="ts">
  import type { Item } from "$lib/items"

  type Props = {
    item?: Item
    selected?: boolean
    onClick?: (item: Item) => void
  }
  let { item, selected, onClick }: Props = $props()

  function handleClick() {
    if (item && onClick) {
      onClick(item)
    }
  }

  const nothing = $derived(typeof item === "undefined")
</script>

<button class="item" class:selected class:nothing onclick={handleClick}>
  <h3>{item?.name || "Nothing"}</h3>
  <div class="details">
    <span>{item?.serial || ""}</span>
    <h4>{item?.manufacturer || ""}</h4>
  </div>
</button>

<style lang="scss">
  @use "$scss/init" as *;

  .item {
    border: 1px solid black;
    padding: 1rem;
    user-select: none;
    width: 100%;
    background-color: #fff;

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
