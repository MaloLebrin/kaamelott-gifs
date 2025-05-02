import { describe, expect, test } from 'vitest'
import { transformUrl } from './transformUrl'

describe('transformUrl', () => {
  test('should transform the url', () => {
    expect(transformUrl({
        fileName: '35-mirabelles-fesses.gif',
      })
    ).toBe(
      'https://kv1gbucket.s3.eu-west-3.amazonaws.com/gifs/35-mirabelles-fesses.gif'
    )

    expect(transformUrl({
      fileName: '500-ans-comme-ca-malin-change.gif',
    })).toBe('https://kv1gbucket.s3.eu-west-3.amazonaws.com/gifs/500-ans-comme-ca-malin-change.gif')
  })
})
