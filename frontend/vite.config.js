import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    // Allow the specific ngrok host:
    allowedHosts: ['4600-2401-4900-9023-9841-81fe-6319-3a7a-eec6.ngrok-free.app','0cf5-2401-4900-9023-9841-81fe-6319-3a7a-eec6.ngrok-free.app'],

    // Alternatively, to allow all hosts (use with caution):
    // allowedHosts: 'all'
  },
})
