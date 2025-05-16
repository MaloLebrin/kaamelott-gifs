import type { MultiPartData } from "h3"

/**
 * Valide les données d'un nouveau GIF soumis via un formulaire multipart
 * @param {MultiPartData[] | undefined} formData - Les données du formulaire multipart
 * @returns {Object} Un objet contenant le fichier GIF et les métadonnées associées
 * @property {MultiPartData} gifFile - Le fichier GIF uploadé
 * @property {Object} gifData - Les métadonnées du GIF (personnages, épisode, etc.)
 * @throws {Error} Si les données du formulaire sont manquantes
 * @throws {Error} Si le fichier GIF est manquant
 * @throws {Error} Si les métadonnées du GIF sont manquantes
 * 
 * @example
 * ```ts
 * try {
 *   const { gifFile, gifData } = validateNewGif(formData)
 *   // Traiter le GIF...
 * } catch (error) {
 *   // Gérer l'erreur...
 * }
 * ```
 */
export function validateNewGif(formData: MultiPartData[] | undefined) {
  if (!formData) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No form data provided'
    })
  }

  const gifFile = formData.find(f => f.type === 'image/gif')
  const gifDataFormData = formData.find(f => f.name === 'data')

  const gifData = JSON.parse(gifDataFormData?.data?.toString() || '{}')

  if (!gifFile) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing GIF file'
    })
  }

  if (!gifData) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing GIF data'
    })
  }
  return { gifFile, gifData }
}
