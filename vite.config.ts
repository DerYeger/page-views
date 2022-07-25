/// <reference types="vitest" />
import * as path from 'path'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      include: 'src/**',
      outputDir: 'dist/types',
      staticImport: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      formats: ['es', 'umd'],
      name: 'page-views',
      fileName: (format) =>
        `page-views.${format}.${format === 'es' ? 'mjs' : 'js'}`,
    },
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'jsdom',
    coverage: {
      all: true,
      include: ['src/**/*.ts'],
      reporter: ['json', 'lcov', 'html', 'text'],
    },
  },
})
