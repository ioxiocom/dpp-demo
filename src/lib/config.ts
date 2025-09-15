import { items } from "$lib/items"
import { Role, type User } from "./state.svelte"

let defaultItem = Object.values(items)[0]

const users: User[] = [
  {
    name: "Quality Engineer",
    role: Role.QUALITY_ENGINEER,
  },
  {
    name: "Sustainability Manager",
    role: Role.SUSTAINABILITY_MANAGER,
  },
]

export const config = {
  dataspaceBaseDomain: "ioxio.io",
  dataspaceGroup: "subcontracting_fair_2025_demo",
  fakeRequestTime: 250, // msec

  users: users,

  // Requests to / will be redirected here
  defaultItem: {
    product: defaultItem.product,
    serial: defaultItem.serial,
  },
}
