import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/study-grachinder/',
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
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-antd': ['antd', '@ant-design/icons'],
          'vendor-query': ['@tanstack/react-query'],
        },
      },
    },
  },
})
