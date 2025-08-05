<script lang="ts">
  let { request, response } = $props()
  let { hello } = $derived(response)
</script>

<p>Hello, {hello}</p>
