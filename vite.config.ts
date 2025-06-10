import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion'],
          icons: ['lucide-react']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['@revenuecat/purchases-js'],
    exclude: ['lucide-react']
  },
  server: {
    port: 3000,
    strictPort: true
  }
});