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
        target: 'http://167.235.241.103:8000', // your backend URL
        changeOrigin: true,
        secure: false, // because backend is HTTP, not HTTPS
        // rewrite: (path) => path.replace(/^\/api/, ''), // optional, removes '/api' prefix
      },
    },
  },
})
