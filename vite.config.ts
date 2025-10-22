import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permite conexiones externas
    port: 5173,
    strictPort: false,
    // Permite hosts de ngrok y otros túneles
    allowedHosts: [
      '.ngrok-free.dev',
      '.ngrok.io',
      '.ngrok.app',
      '.loca.lt',
      'localhost',
      '127.0.0.1'
    ],
    // Configuración para HMR (Hot Module Replacement) con túneles
    hmr: {
      clientPort: 443, // Puerto HTTPS estándar
      protocol: 'wss'  // WebSocket seguro
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: false
  }
})