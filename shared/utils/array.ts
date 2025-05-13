/**
 * Remove duplicates from an array
 * @param array - The array to remove duplicates from
 * @returns The array with duplicates removed
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)]
}

/**
 * Remove duplicates from an array by a key
 * @param array - The array to remove duplicates from
 * @param key - The key to remove duplicates from
 * @returns The array with duplicates removed
 */
export function uniqueBy<T>(array: T[], key: keyof T): T[] {
  const uniqueArray = [...new Map(array.map(item => [item[key], item])).values()]
  return uniqueArray
}
