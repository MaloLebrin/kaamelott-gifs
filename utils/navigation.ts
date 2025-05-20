/**
 * Navigation items
 * @description Navigation items for the website
 * @returns {NavigationItem[]} Navigation items
 */
export const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Ajouter un GIF', href: '/gifs/creer', isAdmin: true, isAuth: true },
  { name: 'Livres', href: '/livres' },
  { name: 'Films', href: '/films' },
  { name: 'Personnages', href: '/personnages' },
  { name: 'Favoris', href: '/favoris', isAuth: true },
  { name: 'À propos', href: '/a-propos' },
]

/**
 * Get navigation items
 * @description Get navigation items based on authentication and admin status
 * @param {Object} options - Options object
 * @param {boolean} options.isAuth - Whether the user is authenticated
 * @param {boolean} options.isAdmin - Whether the user is an admin
 * @returns {NavigationItem[]} Navigation items
 */
export function getNavigationItems({
  isAuth,
  isAdmin,
}: {
  isAuth?: boolean,
  isAdmin?: boolean,
}) {
  // Filtrer les éléments qui nécessitent une authentification
  if (!isAuth) {
    return navigation.filter(item => !item.isAuth && !item.isAdmin)
  }

  if (!isAdmin) {
    return navigation.filter(item => !item.isAdmin)
  }
  
  return navigation
}
