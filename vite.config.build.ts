import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: './src/icon.tsx',
      name: 'IconPark',
      formats: ['es', 'umd'],
      fileName: (format) => `icon-park.${format}.js`
    }
  },
  plugins: [react()],
})
