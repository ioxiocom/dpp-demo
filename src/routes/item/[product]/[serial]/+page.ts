import { redirect } from "@sveltejs/kit"
import type { PageLoad } from "./$types"
import { getItemByProductSerial } from "$lib/items"
import { getUser } from "$lib/state.svelte"

// Redirect if URL is invalid
export const load: PageLoad = ({ params }) => {
  try {
    // Load item from items.ts
    const item = getItemByProductSerial(params.product, params.serial)

    // Current user state is also a dependency for the page content
    const user = getUser()

    return { item, user }
  } catch (e) {
    console.error(`Couldn't find item: ${e}. Redirecting...`)
    return redirect(307, `/`)
  }
}
