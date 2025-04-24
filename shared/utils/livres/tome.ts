/**
 * Get the tome from the number
 * @param nb - The number of the tome
 * @returns The tome
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
