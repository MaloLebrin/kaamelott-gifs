/**
 * Formate une date en format français (jour mois année)
 * @param {string} date - La date à formater au format ISO 8601 (YYYY-MM-DD)
 * @returns {string} La date formatée en français (ex: "15 mars 2024")
 * @throws {Error} Si la date fournie n'est pas dans un format valide
 * @example
 * // Retourne "15 mars 2024"
 * formatDate("2024-03-15")
 * // Retourne "1 janvier 2024"
 * formatDate("2024-01-01")
 */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
