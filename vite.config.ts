import { defineConfig, Plugin, HtmlTagDescriptor } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ── Single source of truth ────────────────────────────────────────────────────
// Change only this if you rename the GitHub repo / deployment subfolder.
const BASE_PATH = '/wedding-invitation'
// ─────────────────────────────────────────────────────────────────────────────

// Injected into 404.html: saves the requested URL to sessionStorage then
// redirects to the SPA root so the app can restore it via history.replaceState.
const spa404Script = `(function(){var b='${BASE_PATH}',l=window.location,p=l.pathname.slice(b.length)||'/';sessionStorage.setItem('spa_redirect',p+l.search+l.hash);l.replace(b+'/?p=1')}())`

// Injected into <head> of index.html: reads sessionStorage and restores the
// original URL before React boots. Runs in both dev server and production.
const spaRestoreScript = `(function(){var r=sessionStorage.getItem('spa_redirect');if(r){sessionStorage.removeItem('spa_redirect');window.history.replaceState(null,'','${BASE_PATH}'+r);}}());`

function spaRoutesPlugin(): Plugin {
  return {
    name: 'spa-routes-plugin',

    // Inject the URL-restore script into <head> on every request (dev + build)
    transformIndexHtml: {
      order: 'pre',
      handler(): HtmlTagDescriptor[] {
        return [
          {
            tag: 'script',
            children: spaRestoreScript,
            injectTo: 'head-prepend',
          },
        ]
      },
    },

    // Post-build: generate 404.html and dist/guests/index.html
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist')
      const indexHtmlPath = path.join(distDir, 'index.html')

      if (!fs.existsSync(indexHtmlPath)) return

      // 1. 404.html — GitHub Pages fallback: redirect any unknown path to root
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

      // 2. dist/guests/index.html — serve HTTP 200 for direct /guests/ access.
      //    Rewrite relative ./  paths → absolute BASE_PATH/ so favicon and
      //    preload assets resolve correctly from the /guests/ sub-path.
      const base = `${BASE_PATH}/`
      let guestsHtml = fs.readFileSync(indexHtmlPath, 'utf-8')
      guestsHtml = guestsHtml.replace(/(href|src)="\.\//g, `$1="${base}`)
      guestsHtml = guestsHtml.replace(/imagesrcset="\.\//g, `imagesrcset="${base}`)
      const guestsDir = path.join(distDir, 'guests')
      if (!fs.existsSync(guestsDir)) fs.mkdirSync(guestsDir, { recursive: true })
      fs.writeFileSync(path.join(guestsDir, 'index.html'), guestsHtml, 'utf-8')
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), spaRoutesPlugin()],
  base: `${BASE_PATH}/`,
})
