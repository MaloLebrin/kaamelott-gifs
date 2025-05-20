import { describe, test, expect } from 'vitest'
import { isUserAdmin } from './profiles'

describe('isUserAdmin', () => {
  test('should return false if role is not admin', () => {
    expect(isUserAdmin('user')).toBe(false)
  })

  test('should return true if role is admin', () => {
    expect(isUserAdmin('admin')).toBe(true)
  })

  test('should return false if role is null', () => {
    expect(isUserAdmin(null)).toBe(false)
  })

  test('should return false if role is undefined', () => {
    expect(isUserAdmin(undefined)).toBe(false)
  })
})
