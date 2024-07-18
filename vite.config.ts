/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ViteYaml from '@modyfi/vite-plugin-yaml';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteYaml()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    globals: true,
    deps: {
      inline: ['@diligentcorp/atlas-theme-mui', 'clsx'], // to resolve TypeError: Unknown file extension ".css"
    },
    exclude: ['**/e2e/**', '**/node_modules/**'],
  },
});
