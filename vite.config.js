import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // This will forward any request starting with /api to your backend
      '/api': {
        target: 'https://a778157def32.ngrok-free.app', // your backend URL
        changeOrigin: true,
        secure: false, // because backend is HTTP, not HTTPS
        // rewrite: (path) => path.replace(/^\/api/, ''), // optional, removes '/api' prefix
      },
    },
  },
})
