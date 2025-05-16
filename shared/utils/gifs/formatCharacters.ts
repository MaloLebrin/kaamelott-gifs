/**
 * Convertit une liste de personnages en chaîne de caractères pour le stockage en base de données
 * @param {string | string[]} characters - La liste des personnages (chaîne séparée par des virgules ou tableau)
 * @returns {string} Les personnages formatés en chaîne (séparés par des virgules)
 * @example
 * formatCharactersToBack(['Arthur', 'Perceval']) // 'Arthur,Perceval'
 * formatCharactersToBack('Arthur,Perceval') // 'Arthur,Perceval'
 * formatCharactersToBack('') // ''
 */
export function formatCharactersToBack(characters: string | string[]): string {
  if (!characters) {
    return ''
  }

  if (Array.isArray(characters)) {
    return characters.join(',')
  }

  return characters
}

/**
 * Convertit une chaîne de personnages en tableau pour l'affichage
 * @param {string | string[]} characters - Les personnages (chaîne séparée par des virgules ou tableau)
 * @returns {string[]} Les personnages sous forme de tableau
 * @example
 * formatCharactersToFront('Arthur,Perceval') // ['Arthur', 'Perceval']
 * formatCharactersToFront(['Arthur', 'Perceval']) // ['Arthur', 'Perceval']
 * formatCharactersToFront('') // []
 */
export function formatCharactersToFront(characters: string | string[]): string[] {
  if (!characters) {
    return []
  }

  if (Array.isArray(characters)) {
    return characters
  }

  return characters.split(',')
}
