<script lang="ts">
  import { page } from "$app/state"
  import { goto } from "$app/navigation"

  $effect(() => {
    if (page.status === 404) {
      goto("/")
    }
  })
</script>

<div>
  <h1>{page.status}</h1>
  <p>{page.error?.message}</p>
</div>
