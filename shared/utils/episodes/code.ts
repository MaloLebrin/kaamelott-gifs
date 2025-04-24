/**
 * Get the livre from the code
 * @param code - The code of the episode
 * @returns The livre of the episode
 */
export function getLivreFromCode(code: string) {
  if (!code) {
    return null
  }

  const [livre, _episode] = code.split('E')

  return livre.replace('S0', '')
}
