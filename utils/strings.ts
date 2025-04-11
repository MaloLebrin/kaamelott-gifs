/**
 * convert a string to a slug
 * @param str - The string to convert
 * @returns The slugified string
 */
export function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}
