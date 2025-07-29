import { describe, test, expect } from 'vitest'
import { isStringMoreThan, isStringLessThan } from './string'

describe('String Utils', () => {
  describe('isStringMoreThan', () => {
    test('should return true if the string is more than the given length', () => {
      expect(isStringMoreThan('hello', 4)).toBe(true)
      expect(isStringMoreThan('hello', 5)).toBe(false)
    })

    test('should return false if the string is empty', () => {
      expect(isStringMoreThan('', 4)).toBe(false)
    })
  })

  describe('isStringLessThan', () => {
    test('should return true if the string is less than the given length', () => {
      expect(isStringLessThan('hello', 6)).toBe(true)
      expect(isStringLessThan('hello', 5)).toBe(false)
    })

    test('should return false if the string is empty', () => {
      expect(isStringLessThan('', 4)).toBe(false)
    })
  })
})

