import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Crucial para Docker
    port: 5173,
    watch: {
      usePolling: true, // Asegura que el HMR funcione dentro del contenedor
    },
  }
})
