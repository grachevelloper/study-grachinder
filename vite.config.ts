import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  resolve: {
    alias: {
      '~components': path.resolve(__dirname, './src/components'),
      '~pages': path.resolve(__dirname, './src/pages'),
      '~shared': path.resolve(__dirname, './src/shared'),
      '~locales': path.resolve(__dirname, './src/locales'),
      '~assets': path.resolve(__dirname, './src/assets')
    }
  }
})
