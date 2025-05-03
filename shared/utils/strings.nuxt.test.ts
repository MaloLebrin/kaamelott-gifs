// @vitest-environment nuxt
import { describe, test, expect } from 'vitest'
import { removeExtensionFile, slugify } from './string'

describe('slugify', () => {
  test('should handle empty or null input', () => {
    expect(slugify('')).toBe('')
    expect(slugify(null as unknown as string)).toBe('')
    expect(slugify(undefined as unknown as string)).toBe('')
  })

  test('should handle whitespace', () => {
    expect(slugify('  hello  world  ')).toBe('hello-world')
    expect(slugify('\thello\tworld\n')).toBe('hello-world')
  })

  test('should convert string to lowercase', () => {
    expect(slugify('HELLO')).toBe('hello')
  })

  test('should replace spaces with hyphens', () => {
    expect(slugify('hello world')).toBe('hello-world')
  })

  test('should replace accented characters', () => {
    expect(slugify('éèêëàáâäåìíîïòóôõöøùúûüýÿñç')).toBe('eeeeaaaaaiiiioooooouuuuyync')
  })

  test('should replace ç with c', () => {
    expect(slugify('ççç')).toBe('ccc')
  })

  test('should handle multiple spaces', () => {
    expect(slugify('hello   world')).toBe('hello-world')
  })

  test('should handle apostrophes', () => {
    expect(slugify("l'apostrophe")).toBe('l-apostrophe')
  })

  test('should handle multiple hyphens', () => {
    expect(slugify('hello--world')).toBe('hello-world')
  })

  test('should handle æ character', () => {
    expect(slugify('Cæsar Imperator')).toBe('cæsar-imperator')
  })

  test('should handle complex strings', () => {
    expect(slugify("L'Étranger d'André Gide")).toBe('l-etranger-d-andre-gide')
  })

  test('should remove all punctuation', () => {
    expect(slugify('hello!')).toBe('hello')
    expect(slugify('hello?')).toBe('hello')
    expect(slugify('hello...')).toBe('hello')
    expect(slugify('hello, world!')).toBe('hello-world')
    expect(slugify('hello; world')).toBe('hello-world')
    expect(slugify('hello: world')).toBe('hello-world')
    expect(slugify('hello (world)')).toBe('hello-world')
    expect(slugify('hello [world]')).toBe('hello-world')
    expect(slugify('hello {world}')).toBe('hello-world')
    expect(slugify('hello "world"')).toBe('hello-world')
    expect(slugify('hello \'world\'')).toBe('hello-world')
    expect(slugify('hello & world')).toBe('hello-world')
    expect(slugify('hello @ world')).toBe('hello-world')
    expect(slugify('hello # world')).toBe('hello-world')
    expect(slugify('hello $ world')).toBe('hello-world')
    expect(slugify('hello % world')).toBe('hello-world')
    expect(slugify('hello ^ world')).toBe('hello-world')
    expect(slugify('hello * world')).toBe('hello-world')
    expect(slugify('hello + world')).toBe('hello-world')
    expect(slugify('hello = world')).toBe('hello-world')
    expect(slugify('hello | world')).toBe('hello-world')
    expect(slugify('hello \\ world')).toBe('hello-world')
    expect(slugify('hello / world')).toBe('hello-world')
    expect(slugify('hello < world')).toBe('hello-world')
    expect(slugify('hello > world')).toBe('hello-world')
  })

  test('should handle multiple spaces and hyphens', () => {
    expect(slugify('hello   world')).toBe('hello-world')
    expect(slugify('hello---world')).toBe('hello-world')
  })

  test('should handle mixed punctuation and spaces', () => {
    expect(slugify('hello, world! how are you?')).toBe('hello-world-how-are-you')
    expect(slugify('hello (world) [test] {example}')).toBe('hello-world-test-example')
  })

  test('should handle ç character', () => {
    expect(slugify('Pardon mais, si vous fêtez pas ça, je ne sais pas ce que vous fêterez ! ')).toBe('pardon-mais-si-vous-fetez-pas-ca-je-ne-sais-pas-ce-que-vous-feterez')
  })

  test('should handle numbers', () => {
    expect(slugify('hello123')).toBe('hello123')
    expect(slugify('123hello')).toBe('123hello')
    expect(slugify('hello 123 world')).toBe('hello-123-world')
  })

  test('should handle special characters in the middle of words', () => {
    expect(slugify('hello@world')).toBe('helloworld')
    expect(slugify('hello.world')).toBe('helloworld')
    expect(slugify('hello_world')).toBe('helloworld')
  })
})

describe('removeExtensionFile', () => {
  test('should remove the extension of a file', () => {
    expect(removeExtensionFile('test.gif')).toBe('test')
  })
  
  test('should return an empty string if the file has no extension', () => {
    expect(removeExtensionFile('test')).toBe('test')
  })
  
  test('should return an empty string if the file is null', () => {
    expect(removeExtensionFile(null as unknown as string)).toBe('')
  })
})  
