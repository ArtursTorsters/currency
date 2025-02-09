/* eslint-disable no-undef */
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const PORT = env.VITE_SERVER_PORT;
  console.log('PORT:', PORT);

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/rates': {
          target: `http://localhost:${PORT}`,
          changeOrigin: true
        }
      }
    }
  }
});
