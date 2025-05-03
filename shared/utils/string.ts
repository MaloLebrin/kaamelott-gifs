/**
 * Convert a string to a URL-friendly slug
 * 
 * This function transforms a string into a slug by:
 * - Converting to lowercase
 * - Replacing accented characters with their non-accented equivalents
 * - Preserving specific special characters (æ)
 * - Removing all other special characters and punctuation
 * - Replacing spaces with hyphens
 * - Removing duplicate hyphens
 * - Trimming hyphens from start and end
 * 
 * @param str - The string to convert
 * @returns The slugified string
 * 
 * @example
 * slugify('Cæsar Imperator') // returns 'cæsar-imperator'
 * slugify('L\'Étranger d\'André Gide') // returns 'letranger-dandre-gide'
 * slugify('Hello, World!') // returns 'hello-world'
 */
export function slugify(str: string) {
  const accents: Record<string, string> = {
    'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a',
    'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
    'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
    'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ø': 'o',
    'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',
    'ý': 'y', 'ÿ': 'y',
    'ñ': 'n',
    'ç': 'c',
    'æ': 'ae',
  }

  return str
    .toLowerCase()
    .replace(/[àáâãäåèéêëìíîïòóôõöøùúûüýÿñç]/g, char => accents[char] || char)
    .replace(/\s+/g, '-')
    .replace(/'/g, '-')
    .replace(/--/g, '-')
}


/**
 * Convert a string to a URL-friendly slug
 * 
 * This function transforms a string into a slug by:
 * - Converting to lowercase
 * - Replacing accented characters with their non-accented equivalents
 * - Preserving specific special characters (æ)
 * - Removing all other special characters and punctuation
 * - Replacing spaces with hyphens
 * - Removing duplicate hyphens
 * - Trimming hyphens from start and end
 * 
 * @param str - The string to convert
 * @returns The slugified string
 * 
 * @example
 * slugify('Cæsar Imperator') // returns 'cæsar-imperator'
 * slugify('L\'Étranger d\'André Gide') // returns 'letranger-dandre-gide'
 * slugify('Hello, World!') // returns 'hello-world'
 */
export function newSlugify(str: string) {
  if (!str) {
    return ''
  }

  const accents: Record<string, string> = {
    'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a',
    'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
    'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
    'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ø': 'o',
    'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',
    'ý': 'y', 'ÿ': 'y',
    'ñ': 'n',
    'ç': 'c',
    'æ': 'æ',
  }

  // Define allowed characters in the slug
  const allowedChars = 'a-z0-9\\s-æ'

  return str
    .toLowerCase()
    .trim()
    .replace(/[àáâãäåèéêëìíîïòóôõöøùúûüýÿñç]/g, char => accents[char] || char)
    .replace(/'/g, '-')
    .replace(new RegExp(`[^${allowedChars}]`, 'g'), '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}


/**
 * remove the extension of a file
 * @param str - The string to remove the extension
 * @returns The string without the extension
 */
export function removeExtensionFile(str: string) {
  if (!str) {
    return '';
  }
  const filename = str.split('.')[0];
  return filename;
}
