import { describe, test, expect } from 'vitest'
import { getOptimizedImageUrl } from './cloudinary'

describe('getOptimizedImageUrl', () => {
  test('should return null when url is empty', () => {
    expect(getOptimizedImageUrl('')).toBeNull()
    expect(getOptimizedImageUrl(null as unknown as string)).toBeNull()
    expect(getOptimizedImageUrl(undefined as unknown as string)).toBeNull()
  })

  test('should add optimization parameters to the url', () => {
    const inputUrl = 'https://res.cloudinary.com/be-right/image/upload/v1744725680/kaamelott-gifs/vous-vous-prenez-pour-un-enseignant.gif'
    const expectedUrl = 'https://res.cloudinary.com/be-right/image/upload/f_auto,q_auto/v1/kaamelott-gifs/vous-vous-prenez-pour-un-enseignant'
    
    expect(getOptimizedImageUrl(inputUrl)).toBe(expectedUrl)
  })

  test('should handle urls with existing parameters', () => {
    const inputUrl = 'https://res.cloudinary.com/be-right/image/upload/v1744725680/kaamelott-gifs/vous-vous-prenez-pour-un-enseignant.gif'
    const expectedUrl = 'https://res.cloudinary.com/be-right/image/upload/f_auto,q_auto/v1/kaamelott-gifs/vous-vous-prenez-pour-un-enseignant'
    
    expect(getOptimizedImageUrl(inputUrl)).toBe(expectedUrl)
  })

  test('should handle urls with different cloudinary subdomains', () => {
    const inputUrl = 'https://res.cloudinary.com/be-right/image/upload/v1744725680/kaamelott-gifs/vous-vous-prenez-pour-un-enseignant.gif'
    const expectedUrl = 'https://res.cloudinary.com/be-right/image/upload/f_auto,q_auto/v1/kaamelott-gifs/vous-vous-prenez-pour-un-enseignant'
    
    expect(getOptimizedImageUrl(inputUrl)).toBe(expectedUrl)
  })
}) 
