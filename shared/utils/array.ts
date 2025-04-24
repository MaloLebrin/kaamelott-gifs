/**
 * Remove duplicates from an array
 * @param array - The array to remove duplicates from
 * @returns The array with duplicates removed
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)]
}

// export function uniqueBy<T>(array: T[], key: keyof T): T[] {
//   return [...new Set(array.map(item => item[key]))]
// }
