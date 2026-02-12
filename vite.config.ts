import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Daftarkan alias di sini
    },
  },
  server: {
    port: 5172, // Ubah ke port yang kamu inginkan
    strictPort: true, // Opsional: jika true, Vite akan error jika port 3000 sudah dipakai
  },
});
