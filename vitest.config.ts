import { defineVitestConfig } from '@nuxt/test-utils/config'
import { fileURLToPath } from 'node:url'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        rootDir: fileURLToPath(new URL('.', import.meta.url)),
        domEnvironment: 'happy-dom',
        mock: {
          intersectionObserver: true,
          indexedDb: true
        }
      }
    },
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/.{idea,git,cache,output,temp}/**'],
    testTimeout: 10000,
    hookTimeout: 10000,
    globals: true,
    deps: {
      inline: [/@nuxt\/test-utils/]
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'dist/**',
        '**/*.d.ts',
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/*.config.ts',
        '**/types/**',
        '**/coverage/**',
        '**/.nuxt/**',
        '**/nitro.config.ts',
        '**/.output/**',
        '**/auto-imports.d.ts',
        '**/components.d.ts'
      ]
    }
  }
})
