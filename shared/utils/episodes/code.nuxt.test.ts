// @vitest-environment nuxt
import { describe, test, expect } from 'vitest'
import { getLivreFromCode, getEpisodeId } from './code'

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

describe('getEpisodeId', () => {
  test('should return the episode id', () => {
    expect(getEpisodeId({ code: 'S01E02' })).toBe('02')
    expect(getEpisodeId({ code: 'S06E45' })).toBe('45')
  })

  test('should throw an error if the episode code is not provided', () => {
    expect(() => getEpisodeId({ code: '' })).toThrow('Episode code is required')
  })
})  
