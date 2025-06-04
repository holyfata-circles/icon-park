import { defineConfig } from 'vite'
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      'output': path.resolve(__dirname, 'output'),
    },
  },
  build: {
    lib: {
      entry: './lib/main.ts',
      name: 'Counter',
      fileName: 'counter',
    },
  },
})
