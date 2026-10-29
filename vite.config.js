import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'
import { generatePhotoManifest } from './scripts/generate-photo-manifest.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function photoManifestPlugin() {
  return {
    name: 'photo-manifest-plugin',
    configureServer(server) {
      generatePhotoManifest()
      const photosDir = path.resolve(__dirname, 'public/photos')
      server.watcher.add(photosDir)
      const update = (file) => {
        if (file && file.includes('photos')) {
          generatePhotoManifest()
        }
      }
      server.watcher.on('add', update)
      server.watcher.on('unlink', update)
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    photoManifestPlugin(),
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
