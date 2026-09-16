import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// GitHub Pages SPA 404 redirect script (goes into 404.html)
// When GitHub Pages serves 404.html, this script encodes the full URL into
// sessionStorage then redirects to the base URL. The main index.html then
// reads sessionStorage and restores the URL via history.replaceState.
const spa404Script = `(function(){var b='/wedding-invitation',l=window.location,p=l.pathname.slice(b.length)||'/';sessionStorage.setItem('spa_redirect',p+l.search+l.hash);l.replace(b+'/?p=1')}())`

function spaRoutesPlugin(): Plugin {
  return {
    name: 'spa-routes-plugin',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist')
      const indexHtmlPath = path.join(distDir, 'index.html')

      if (fs.existsSync(indexHtmlPath)) {
        // 1. Generate a proper 404.html with redirect logic for GitHub Pages
        const html404 = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <title>Redirecting...</title>
  <script>${spa404Script}<\/script>
</head>
<body></body>
</html>`
        fs.writeFileSync(path.join(distDir, '404.html'), html404, 'utf-8')

        // 2. Create dist/guests/index.html for direct HTTP 200 routing
        const guestsDir = path.join(distDir, 'guests')
        if (!fs.existsSync(guestsDir)) {
          fs.mkdirSync(guestsDir, { recursive: true })
        }
        fs.copyFileSync(indexHtmlPath, path.join(guestsDir, 'index.html'))
      }
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), spaRoutesPlugin()],
  base: '/wedding-invitation/',
})
