import { describe, test, expect } from 'vitest'
import { formatEpisode } from './formatEpisode'

describe('formatEpisode', () => {
  test('should format episode', () => {
    expect(formatEpisode('kv1 - Kaamelott premier volet')).toEqual('kv1')

    expect(formatEpisode('S01E01 - Le livre de la jungle')).toEqual('S01E01')
  })

  test('should return null when episode is null', () => {
    expect(formatEpisode(null as unknown as string)).toBeNull()
  })

  test('should return null when episode is undefined', () => {
    expect(formatEpisode(undefined as unknown as string)).toBeNull()
  })

  test('should return null when episode is empty', () => {
    expect(formatEpisode('')).toBeNull()
  })

  test('should return null when episode is empty', () => {
    expect(formatEpisode('')).toBeNull()
  })
})
