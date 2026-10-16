import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' sorgt dafür, dass die Seite auch unter https://<user>.github.io/<repo>/ funktioniert.
export default defineConfig({
  base: './',
  plugins: [react()],
});
