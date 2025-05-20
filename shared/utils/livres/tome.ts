/**
 * Convertit un numéro de livre en son nom complet
 * @param {number} nb - Le numéro du livre (1 à 6)
 * @returns {string | null} Le nom complet du livre (ex: 'Livre I') ou null si le numéro est invalide
 * 
 * @example
 * ```ts
 * getTomeFromCode(1) // 'Livre I'
 * getTomeFromCode(3) // 'Livre III'
 * getTomeFromCode(6) // 'Livre VI'
 * getTomeFromCode(0) // null
 * ```
 */
export function getTomeFromCode(nb: number) {
  if (!nb) {
    return null
  }

  switch (nb) {
    case 1:
      return 'Livre I'
    case 2:
      return 'Livre II'
    case 3:
      return 'Livre III'
    case 4:
      return 'Livre IV'
    case 5:
      return 'Livre V'
    case 6:
      return 'Livre VI'
  }
}
