import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { routes } from './src/routes.js'

function staticRouteDocuments() {
  let outDir
  let isBuild = false
  return {
    name: 'rcgsc-static-route-documents',
    configResolved(config) {
      isBuild = config.command === 'build'
      outDir = path.resolve(config.root, config.build.outDir)
    },
    transformIndexHtml: {
      order: 'post',
      handler(html, context) {
        if (!context.server) return html
        return html.replace('src="./src/main.jsx"', `src="${context.server.config.base}src/main.jsx"`)
      },
    },
    async closeBundle() {
      if (!isBuild) return
      const template = await readFile(path.join(outDir, 'index.html'), 'utf8')
      for (const page of routes.filter((item) => item.path !== '/')) {
        const html = template
          .replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`)
          .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${page.description}" />`)
        const filePath = path.join(outDir, page.path.slice(1), 'index.html')
        await mkdir(path.dirname(filePath), { recursive: true })
        await writeFile(filePath, html)
      }
      const notFound = template
        .replace(/<title>[^<]*<\/title>/, '<title>Page not found — RCGSC</title>')
        .replace(/<meta name="description" content="[^"]*"\s*\/?>/, '<meta name="description" content="The requested RCGSC page could not be found." />')
      await writeFile(path.join(outDir, '404.html'), notFound)
    },
  }
}

export default defineConfig({
  base: '/RCGSC/',
  plugins: [react(), staticRouteDocuments()],
})
