/**
 * Checks if a user has admin privileges based on their role
 * @param {string | null | undefined} role - The user's role to check. Can be undefined or null
 * @returns {boolean} Returns true if the role is 'admin', false otherwise (including when role is null or undefined)
 * @example
 * // Returns true
 * isUserAdmin('admin')
 * // Returns false
 * isUserAdmin('user')
 * // Returns false
 * isUserAdmin(null)
 */
export function isUserAdmin(role?: string | null) {
  if (!role) {
    return false
  }
  return role === 'admin'
}
