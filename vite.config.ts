import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  server: {
    host: '0.0.0.0', // Bind to all network interfaces
    port: 5173, // Ensure the frontend runs on this port
    proxy: {
      '/send-email': {
        target: 'https://web-practice-ten.vercel.app', // Backend URL
        changeOrigin: true,
        secure: false, // Set to true if using HTTPS and a valid SSL cert
        rewrite: (path) => path.replace(/^\/send-email/, '/send-email'),
      },
    },
  },
  plugins: [tailwindcss()],
});
