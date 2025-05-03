
import type { MultiPartData } from "h3"

/**
 * Validation du formulaire
 * @param formData - Données du formulaire
 * @returns {Object} - Objet contenant le fichier PDF et l'ID du compte
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
