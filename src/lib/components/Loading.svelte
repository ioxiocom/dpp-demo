<script lang="ts">
  export let color = "#33383F"
  export let unit = "px"
  export let duration = "1s"
  export let size = "60"
  export let pause = false

  const durationUnitRegex = /[a-zA-Z]/
  const range = (size: number, startAt = 0) => [...Array(size).keys()].map((i) => i + startAt)

  let durationUnit: string = duration.match(durationUnitRegex)?.[0] ?? "s"
  let durationNum: string = duration.replace(durationUnitRegex, "")
</script>

<div class="wrapper" style="--size: {size}{unit}; --color: {color}; --duration: {duration}">
  {#each range(3, 0) as version}
    <div
      class="cube"
      class:pause-animation={pause}
      style="animation-delay: {version * (+durationNum / 10)}{durationUnit}; left: {version *
        (+size / 3 + +size / 15) +
        unit};"
    />
  {/each}
</div>

<style>
  .wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--size);
    height: calc(var(--size) / 2.5);
    gap: 0.5rem;
  }
  .cube {
    border-radius: 50%;
    width: calc(var(--size) / 5);
    height: calc(var(--size) / 5);
    background-color: var(--color);
    animation: motion var(--duration) cubic-bezier(0.895, 0.03, 0.685, 0.22) infinite;
  }
  .pause-animation {
    animation-play-state: paused;
  }
  @keyframes motion {
    0% {
      opacity: 0.7;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
