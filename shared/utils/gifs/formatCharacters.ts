
/**
 * Format characters to a string
 * @param characters - The characters to format
 * @returns The formatted characters
 */
export function formatCharactersToBack(characters: string | string[]): string {
  if (!characters) {
    return ''
  }

  if (Array.isArray(characters)) {
    return characters.join(',')
  }

  return characters
}

/**
 * Format characters to an array
 * @param characters - The characters to format
 * @returns The formatted characters
 */
export function formatCharactersToFront(characters: string | string[]): string[] {
  if (!characters) {
    return []
  }

  if (Array.isArray(characters)) {
    return characters
  }

  return characters.split(',')
}
