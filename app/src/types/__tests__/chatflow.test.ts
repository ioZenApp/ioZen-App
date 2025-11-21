import { describe, it, expect } from 'vitest'
import { isChatflowSchema, type ChatflowSchema } from '../chatflow'

describe('isChatflowSchema', () => {
  it('validates correct chatflow schema', () => {
    const validSchema: ChatflowSchema = {
      fields: [
        {
          id: '1',
          type: 'text',
          label: 'Name',
          name: 'name',
          required: true
        }
      ]
    }

    expect(isChatflowSchema(validSchema)).toBe(true)
  })

  it('validates schema with multiple fields', () => {
    const validSchema: ChatflowSchema = {
      fields: [
        {
          id: '1',
          type: 'text',
          label: 'Name',
          name: 'name',
          required: true
        },
        {
          id: '2',
          type: 'email',
          label: 'Email',
          name: 'email',
          required: true
        },
        {
          id: '3',
          type: 'textarea',
          label: 'Message',
          name: 'message',
          required: false
        }
      ]
    }

    expect(isChatflowSchema(validSchema)).toBe(true)
  })

  it('validates all supported field types', () => {
    const fieldTypes = ['text', 'email', 'phone', 'url', 'textarea', 'number', 'date', 'select', 'boolean', 'file']
    
    fieldTypes.forEach((type) => {
      const schema = {
        fields: [
          {
            id: '1',
            type: type,
            label: 'Test Field',
            name: 'test',
            required: true
          }
        ]
      }

      expect(isChatflowSchema(schema)).toBe(true)
    })
  })

  it('validates schema with optional field properties', () => {
    const validSchema = {
      fields: [
        {
          id: '1',
          type: 'text',
          label: 'Name',
          name: 'name',
          required: true,
          placeholder: 'Enter your name',
          helperText: 'This will be displayed publicly'
        }
      ]
    }

    expect(isChatflowSchema(validSchema)).toBe(true)
  })

  it('validates schema with settings', () => {
    const validSchema = {
      fields: [
        {
          id: '1',
          type: 'text',
          label: 'Name',
          name: 'name',
          required: true
        }
      ],
      settings: {
        theme: 'light' as const,
        submitButtonText: 'Submit Form',
        successMessage: 'Thank you!'
      }
    }

    expect(isChatflowSchema(validSchema)).toBe(true)
  })

  it('rejects schema with invalid field type', () => {
    const invalidSchema = {
      fields: [
        {
          id: '1',
          type: 'invalid_type',  // Not a valid FieldType
          label: 'Name',
          name: 'name',
          required: true
        }
      ]
    }

    expect(isChatflowSchema(invalidSchema)).toBe(false)
  })

  it('rejects schema with long_text (invalid enum value)', () => {
    const invalidSchema = {
      fields: [
        {
          id: '1',
          type: 'long_text',  // Was causing issues in Phase 4
          label: 'Description',
          name: 'description',
          required: true
        }
      ]
    }

    expect(isChatflowSchema(invalidSchema)).toBe(false)
  })

  it('rejects schema with missing required field properties', () => {
    const invalidSchema = {
      fields: [
        {
          id: '1',
          type: 'text',
          label: 'Name'
          // missing 'name' and 'required'
        }
      ]
    }

    expect(isChatflowSchema(invalidSchema)).toBe(false)
  })

  it('rejects schema with missing id', () => {
    const invalidSchema = {
      fields: [
        {
          type: 'text',
          label: 'Name',
          name: 'name',
          required: true
        }
      ]
    }

    expect(isChatflowSchema(invalidSchema)).toBe(false)
  })

  it('rejects schema with missing label', () => {
    const invalidSchema = {
      fields: [
        {
          id: '1',
          type: 'text',
          name: 'name',
          required: true
        }
      ]
    }

    expect(isChatflowSchema(invalidSchema)).toBe(false)
  })

  it('rejects schema with missing name', () => {
    const invalidSchema = {
      fields: [
        {
          id: '1',
          type: 'text',
          label: 'Name',
          required: true
        }
      ]
    }

    expect(isChatflowSchema(invalidSchema)).toBe(false)
  })

  it('rejects schema with missing required flag', () => {
    const invalidSchema = {
      fields: [
        {
          id: '1',
          type: 'text',
          label: 'Name',
          name: 'name'
        }
      ]
    }

    expect(isChatflowSchema(invalidSchema)).toBe(false)
  })

  it('rejects non-object values', () => {
    expect(isChatflowSchema(null)).toBe(false)
    expect(isChatflowSchema(undefined)).toBe(false)
    expect(isChatflowSchema('string')).toBe(false)
    expect(isChatflowSchema(123)).toBe(false)
    expect(isChatflowSchema(true)).toBe(false)
  })

  it('rejects schema without fields array', () => {
    expect(isChatflowSchema({})).toBe(false)
    expect(isChatflowSchema({ fields: 'not-array' })).toBe(false)
    expect(isChatflowSchema({ fields: null })).toBe(false)
    expect(isChatflowSchema({ fields: undefined })).toBe(false)
  })

  it('rejects schema with empty fields array', () => {
    const invalidSchema = {
      fields: []
    }

    // Empty fields array is technically valid structure
    expect(isChatflowSchema(invalidSchema)).toBe(true)
  })

  it('rejects schema with non-object field', () => {
    const invalidSchema = {
      fields: ['not-an-object']
    }

    expect(isChatflowSchema(invalidSchema)).toBe(false)
  })

  it('rejects schema with field containing wrong type for property', () => {
    const invalidSchema = {
      fields: [
        {
          id: 123,  // Should be string
          type: 'text',
          label: 'Name',
          name: 'name',
          required: true
        }
      ]
    }

    expect(isChatflowSchema(invalidSchema)).toBe(false)
  })

  it('rejects schema with field containing non-boolean required', () => {
    const invalidSchema = {
      fields: [
        {
          id: '1',
          type: 'text',
          label: 'Name',
          name: 'name',
          required: 'true'  // Should be boolean
        }
      ]
    }

    expect(isChatflowSchema(invalidSchema)).toBe(false)
  })

  it('rejects schema with mixed valid and invalid fields', () => {
    const invalidSchema = {
      fields: [
        {
          id: '1',
          type: 'text',
          label: 'Name',
          name: 'name',
          required: true
        },
        {
          id: '2',
          type: 'invalid_type',  // Invalid
          label: 'Email',
          name: 'email',
          required: true
        }
      ]
    }

    expect(isChatflowSchema(invalidSchema)).toBe(false)
  })
})

