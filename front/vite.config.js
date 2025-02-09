import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from '@vitejs/plugin-react'

// config
// load port from  .env  ?

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/rates': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
})
