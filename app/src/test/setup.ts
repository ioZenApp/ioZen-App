/// <reference types="vitest/globals" />
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Cleanup after each test
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn()
  }),
  usePathname: () => '/test-path',
  useSearchParams: () => new URLSearchParams()
}))

// Mock Supabase client (returns no-op functions)
vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      getUser: vi.fn(() => Promise.resolve({ data: { user: null }, error: null })),
      getSession: vi.fn(() => Promise.resolve({ data: { session: null }, error: null }))
    }
  })
}))

// Mock Prisma with interface-compliant responses
vi.mock('@/lib/db', () => ({
  default: {
    profile: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn()
    },
    workspace: {
      findUnique: vi.fn(),
      findMany: vi.fn()
    },
    workspaceMember: {
      findUnique: vi.fn()
    },
    chatflow: {
      create: vi.fn(),
      findMany: vi.fn(),
      findFirst: vi.fn(),
      update: vi.fn()
    },
    chatflowSubmission: {
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn()
    }
  }
}))

