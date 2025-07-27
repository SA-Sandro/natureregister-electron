import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import electron from 'vite-plugin-electron';
import path from 'path';

const isDev = process.env.NODE_ENV === 'development';
export default defineConfig({
  root: path.resolve(__dirname, '../src'),
  plugins: [
    vue(),
    ...(isDev
      ? []
      : [
          electron({
            entry: path.resolve(__dirname, '../electron/electron-main.js'),
            vite: {
              build: {
                sourcemap: true,
                minify: false,
                outDir: 'dist-electron',
                rollupOptions: {
                  external: ['electron'],
                },
              },
            },
          }),
        ]),
  ],
  build: {
    outDir: path.resolve(__dirname, '../dist'),
    emptyOutDir: true,
  },
});
