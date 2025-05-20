import { formatCharactersToFront } from "~/shared/utils/gifs/formatCharacters"

/**
 * Compose les personnages de gifs en un seul tableau
 * @param objects - Les objets à composer
 * @returns Les personnages composés triés par ordre alphabétique français
 */
export function composeCharacters(
  objects: {
    characters: string | null
    characters_speaking: string | null
  }[]
) {
  // Créer un Set pour avoir des personnages uniques
  const characters = new Set<string>()
  
  objects.forEach(gif => {
    // Ajouter les personnages
    if (gif.characters) {
      formatCharactersToFront(gif.characters).forEach(character => {
        characters.add(character)
      })
    }
    
    // Ajouter les personnages qui parlent
    if (gif.characters_speaking) {
      formatCharactersToFront(gif.characters_speaking).forEach(character => {
        characters.add(character)
      })
    }
  })

  // Convertir le Set en Array et trier selon l'ordre alphabétique français
  return Array.from(characters).sort((a, b) => a.localeCompare(b, 'fr-FR'))
}
