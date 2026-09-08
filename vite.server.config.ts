import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  publicDir: false,
  ssr: {
    noExternal: true,
  },
  build: {
    ssr: 'server/infrastructure/server-entry.ts',
    outDir: 'server-dist',
    emptyOutDir: true,
    target: 'node22',
  },
});
