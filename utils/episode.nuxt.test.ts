import { describe, expect, test } from 'vitest'
import { getEpisodeId } from './episode'

describe('getEpisodeId', () => {
  test('should return the episode id', () => {
    expect(getEpisodeId({ code: 'S01E02' })).toBe('02')
    expect(getEpisodeId({ code: 'S06E45' })).toBe('45')
  })

  test('should throw an error if the episode code is not provided', () => {
    expect(() => getEpisodeId({ code: '' })).toThrow('Episode code is required')
  })
})  
