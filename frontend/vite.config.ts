import react from "@vitejs/plugin-react"
import { fileURLToPath } from "url"
import { defineConfig } from "vite"
import viteTsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  base: "/",
  plugins: [react(), viteTsconfigPaths()],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
