import { describe, it, expect } from 'vitest'
import { z } from 'zod'
import { createAction, createObjectAction } from '../action-utils'

describe('createObjectAction', () => {
  it('returns success for valid data', async () => {
    const schema = z.object({
      name: z.string().min(1),
      age: z.number()
    })

    const action = createObjectAction(schema, async (data) => {
      return { userId: '123', ...data }
    })

    const result = await action({ name: 'John', age: 30 })

    expect(result).toEqual({
      success: true,
      data: { userId: '123', name: 'John', age: 30 }
    })
  })

  it('returns error for invalid data', async () => {
    const schema = z.object({
      name: z.string().min(3)
    })

    const action = createObjectAction(schema, async (data) => {
      return data
    })

    const result = await action({ name: 'AB' })  // Too short

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('name')
    }
  })

  it('handles handler errors', async () => {
    const schema = z.object({ id: z.string() })

    const action = createObjectAction(schema, async () => {
      throw new Error('Database error')
    })

    const result = await action({ id: '123' })

    expect(result).toEqual({
      success: false,
      error: 'Database error'
    })
  })

  it('handles validation errors with detailed messages', async () => {
    const schema = z.object({
      email: z.string().email(),
      age: z.number().min(18)
    })

    const action = createObjectAction(schema, async (data) => {
      return data
    })

    const result = await action({ email: 'invalid', age: 15 })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toBeTruthy()
    }
  })

  it('handles unknown errors', async () => {
    const schema = z.object({ id: z.string() })

    const action = createObjectAction(schema, async () => {
      throw 'Unknown error'  // eslint-disable-line @typescript-eslint/only-throw-error
    })

    const result = await action({ id: '123' })

    expect(result).toEqual({
      success: false,
      error: 'An unexpected error occurred'
    })
  })
})

describe('createAction', () => {
  it('extracts and validates FormData', async () => {
    const schema = z.object({
      name: z.string(),
      email: z.string().email()
    })

    const action = createAction(schema, async (data) => {
      return { saved: true, ...data }
    })

    const formData = new FormData()
    formData.append('name', 'John')
    formData.append('email', 'john@example.com')

    const result = await action(formData)

    expect(result).toEqual({
      success: true,
      data: { saved: true, name: 'John', email: 'john@example.com' }
    })
  })

  it('handles multiple values for same key', async () => {
    const schema = z.object({
      tags: z.array(z.string())
    })

    const action = createAction(schema, async (data) => {
      return data
    })

    const formData = new FormData()
    formData.append('tags', 'tag1')
    formData.append('tags', 'tag2')

    const result = await action(formData)

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.tags).toEqual(['tag1', 'tag2'])
    }
  })

  it('handles validation errors from FormData', async () => {
    const schema = z.object({
      email: z.string().email()
    })

    const action = createAction(schema, async (data) => {
      return data
    })

    const formData = new FormData()
    formData.append('email', 'invalid-email')

    const result = await action(formData)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('email')
    }
  })

  it('handles handler errors from FormData actions', async () => {
    const schema = z.object({ id: z.string() })

    const action = createAction(schema, async () => {
      throw new Error('Processing failed')
    })

    const formData = new FormData()
    formData.append('id', '123')

    const result = await action(formData)

    expect(result).toEqual({
      success: false,
      error: 'Processing failed'
    })
  })
})

