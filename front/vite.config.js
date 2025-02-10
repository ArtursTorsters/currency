import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export default defineConfig(({ mode }) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const env = loadEnv(mode, join(__dirname, '..'));

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
