import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', '.next', 'dist'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.config.ts',
        'src/test/**',
        'src/**/__tests__/**',
        'src/types/**'
      ],
      // Thresholds set to 30% but not enforced yet
      // Will be enforced as more tests are added in future phases
      thresholds: {
        statements: 30,
        branches: 30,
        functions: 30,
        lines: 30
      }
    },
    globals: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/ui': path.resolve(__dirname, './src/components/ui'),
      '@/features': path.resolve(__dirname, './src/components/features')
    }
  }
})

