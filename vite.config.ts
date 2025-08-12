import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ВАЖНО: замените 'giaterra-kp' на точное имя вашего репозитория, если он другой
export default defineConfig({
  plugins: [react()],
  base: '/giaterra-kp/',
})
