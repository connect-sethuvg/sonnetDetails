import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // GitHub Pages project site: https://connect-sethuvg.github.io/sonnetDetails/
  base: '/sonnetDetails/',
})
