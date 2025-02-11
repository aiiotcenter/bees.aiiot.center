import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensures the build output goes to the correct folder
    assetsDir: 'assets', // Organizes static files
    emptyOutDir: true, // Clears old files before building
  },
  server: {
    historyApiFallback: true, // Ensures React SPA routing works
  },
});
