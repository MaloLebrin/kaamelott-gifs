/**
 * convert a string to a slug
 * @param str - The string to convert
 * @returns The slugified string
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
    .replace(/ç/g, 'c')
    .replace(/\s+/g, '-')
    .replace(/'/g, '-')
    .replace(/--/g, '-')
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
