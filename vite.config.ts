import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  server: {
    host: '0.0.0.0', // Bind to all network interfaces
    allowedHosts: [
      'webmailer-6q0a.onrender.com', // Add your Render host here
    ],
  },
  plugins: [
    tailwindcss(),
  ],
});