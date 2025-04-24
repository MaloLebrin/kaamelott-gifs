import { describe, test, expect } from 'vitest'
import { getTomeFromCode } from './tome'

describe('getTomeFromCode', () => {
  test('should return the tome from the number', () => {
    expect(getTomeFromCode(1)).toBe('Livre I')
    expect(getTomeFromCode(2)).toBe('Livre II')
    expect(getTomeFromCode(3)).toBe('Livre III')
    expect(getTomeFromCode(4)).toBe('Livre IV')
    expect(getTomeFromCode(5)).toBe('Livre V')
    expect(getTomeFromCode(6)).toBe('Livre VI')
  })

  test('should return null if the number is not valid', () => {
    expect(getTomeFromCode(null as unknown as number)).toBe(null)
    expect(getTomeFromCode(undefined as unknown as number)).toBe(null)
  })
})
