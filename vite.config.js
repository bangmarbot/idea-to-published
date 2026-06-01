import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base must match the GitHub Pages project path
export default defineConfig({
  base: '/idea-to-published/',
  plugins: [react(), tailwindcss()],
})
