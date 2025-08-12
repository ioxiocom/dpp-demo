import { redirect } from "@sveltejs/kit"
import type { PageLoad } from "./$types"
import { config } from "$lib/config"

// Redirect all requests to / to default item view

export const load: PageLoad = ({ params }) => {
  const item = config.defaultItem
  return redirect(307, `/item/${item.product}/${item.serial}/`)
}
