// @vitest-environment nuxt
import { describe, test, expect } from 'vitest'
import { getLivreFromCode } from './code'

describe('getLivreFromCode', () => {
  test('should return the livre from the code', () => {
    expect(getLivreFromCode('S01E01')).toBe('1')
  })

  test('should return null if the code is not valid', () => {
    expect(getLivreFromCode(null as unknown as string)).toBe(null)
    expect(getLivreFromCode('')).toBe(null)
    expect(getLivreFromCode(undefined as unknown as string)).toBe(null)
  })
}) 
