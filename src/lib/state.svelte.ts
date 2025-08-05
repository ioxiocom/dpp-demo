import { goto } from "$app/navigation"
import { page } from "$app/state"

export enum Role {
  QUALITY_ENGINEER = 1,
  SUSTAINABILITY_MANAGER,
}

export const roleNames: { [role: Role]: string } = {}
roleNames[Role.QUALITY_ENGINEER] = "Quality Engineer"
roleNames[Role.SUSTAINABILITY_MANAGER] = "Sustainability Manager"

export type User = {
  name: string
  role?: Role
}

export const unauthenticated = {
  name: "Unauthenticated",
  role: undefined,
}

let user: User = $state(unauthenticated)

export function login(_user: User) {
  user = _user
}

export function getUser(): User {
  return user
}

export async function startLogin() {
  await goto("/login?afterLogin=" + encodeURIComponent(page.url.pathname))
}
