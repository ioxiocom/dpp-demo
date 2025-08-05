import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"
import svg from "@poppanator/sveltekit-svg"

export default defineConfig({
  plugins: [sveltekit(), svg()],
  test: {
    projects: [
      {
        extends: "./vite.config.ts",
        test: {
          name: "server",
          environment: "node",
          include: ["src/**/*.{test,spec}.{js,ts}"],
          exclude: ["src/**/*.svelte.{test,spec}.{js,ts}"],
        },
      },
    ],
  },
})
