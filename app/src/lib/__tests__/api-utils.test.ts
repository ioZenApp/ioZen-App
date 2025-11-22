import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'
import { z } from 'zod'
import { createApiHandler } from '../api-utils'

describe('createApiHandler', () => {
  it('returns success response for valid handler', async () => {
    const handler = createApiHandler(async () => {
      return { message: 'Success' }
    })

    const req = new NextRequest('http://localhost:3000/api/test')
    const response = await handler(req)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual({
      success: true,
      data: { message: 'Success' }
    })
  })

  it('handles Zod validation errors', async () => {
    const schema = z.object({ name: z.string().min(1) })
    
    const handler = createApiHandler(async (req) => {
      const body = await req.json()
      schema.parse(body)  // Will throw for invalid data
      return { success: true }
    })

    const req = new NextRequest('http://localhost:3000/api/test', {
      method: 'POST',
      body: JSON.stringify({ name: '' })  // Invalid: empty string
    })

    const response = await handler(req)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Validation failed')
  })

  it('handles application errors', async () => {
    const handler = createApiHandler(async () => {
      throw new Error('Something went wrong')
    })

    const req = new NextRequest('http://localhost:3000/api/test')
    const response = await handler(req)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data).toEqual({
      success: false,
      error: 'Something went wrong'
    })
  })

  it('handles unknown errors', async () => {
    const handler = createApiHandler(async () => {
      throw 'Unknown error'   
    })

    const req = new NextRequest('http://localhost:3000/api/test')
    const response = await handler(req)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data).toEqual({
      success: false,
      error: 'Internal server error'
    })
  })

  it('wraps data in success response automatically', async () => {
    const handler = createApiHandler(async () => {
      return { chatflowId: '123', name: 'Test' }
    })

    const req = new NextRequest('http://localhost:3000/api/test')
    const response = await handler(req)
    const data = await response.json()

    expect(data).toEqual({
      success: true,
      data: { chatflowId: '123', name: 'Test' }
    })
  })

  it('passes request context to handler', async () => {
    const handler = createApiHandler(async (req, context) => {
      const params = await context?.params
      return { id: params?.id }
    })

    const req = new NextRequest('http://localhost:3000/api/test/123')
    const response = await handler(req, {
      params: Promise.resolve({ id: '123' })
    })
    const data = await response.json()

    expect(data.data).toEqual({ id: '123' })
  })
})

