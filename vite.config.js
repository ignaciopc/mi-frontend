import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/mi-frontend/',  // Cambia "mi-repo" por el nombre real de tu repositorio en GitHub
})
