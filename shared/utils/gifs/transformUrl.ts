/**
 * Transforme un nom de fichier en URL S3 complète pour un GIF
 * @param {Object} params - Les paramètres de transformation
 * @param {string} params.fileName - Le nom du fichier GIF
 * @returns {string | null} L'URL S3 complète du GIF ou null si le nom de fichier est manquant
 * 
 * @example
 * ```ts
 * const url = transformUrl({ fileName: 'mon-gif.gif' })
 * // Retourne: 'https://kv1gbucket.s3.eu-west-3.amazonaws.com/gifs/mon-gif.gif'
 * ```
 */
export function transformUrl({
  fileName,
}: {
  fileName: string
}) {
  if (!fileName) {
    return null
  }

  // Return the S3 URL with the same filename
  return `https://kv1gbucket.s3.eu-west-3.amazonaws.com/gifs/${fileName}`
}
