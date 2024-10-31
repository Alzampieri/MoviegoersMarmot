import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({resolve: {
  alias: {
    '@assets': path.resolve(__dirname, './src/assets'),
    '@api': path.resolve(__dirname, './src/api'),
    '@components': path.resolve(__dirname, './src/components'),
    '@features': path.resolve(__dirname, './src/features'),
    "@less/*": path.resolve(__dirname, './src/less'),
    "@configs/*": path.resolve(__dirname, './src/configs'),
    "@types/*": path.resolve(__dirname, './src/types'),
  },
},
  plugins: [react()],
})
