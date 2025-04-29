/**
 * Check if a string is more than a given length
 * @param str - The string to check
 * @param length - The length to compare against
 * @returns true if the string is more than the given length, false otherwise
 */
export function isStringMoreThan(str: string, length: number) {
  if (!str) return false
  return str.length > length
}

/**
 * Check if a string is less than a given length
 * @param str - The string to check
 * @param length - The length to compare against
 * @returns true if the string is less than the given length, false otherwise
 */
export function isStringLessThan(str: string, length: number) {
  if (!str) return false
  return str.length < length
}
