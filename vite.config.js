import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.datavortex.nl',
        changeOrigin: true,
        secure: false, // Zet op true als de API HTTPS heeft met een geldig certificaat
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
    cors: {
      origin: '*', 
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }
  }
});
