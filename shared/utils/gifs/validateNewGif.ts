 
import type { MultiPartData } from "h3"

/**
 * Valide les données d'un nouveau GIF soumis via un formulaire multipart.
 * Vérifie la présence du fichier GIF et des métadonnées associées.
 * 
 * @param {MultiPartData[] | undefined} formData - Les données du formulaire multipart
 * @returns {{ gifFile: MultiPartData, gifData: any }} Un objet contenant le fichier GIF et les métadonnées associées
 * @throws {Error} Si les données du formulaire sont manquantes (400)
 * @throws {Error} Si le fichier GIF est manquant (400)
 * @throws {Error} Si les métadonnées du GIF sont manquantes (400)
 * 
 * @example
 * ```ts
 * // Dans un handler d'API
 * const { gifFile, gifData } = validateNewGif(event.node.req.body)
 * // gifFile contient le fichier GIF
 * // gifData contient les métadonnées (personnages, épisode, etc.)
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
