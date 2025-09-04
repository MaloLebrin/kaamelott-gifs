import { describe, test, expect } from 'vitest'
import { getNavigationItems } from './navigation'

describe('getNavigationItems', () => {
  test('should return all items if user is authenticated and is admin', () => {
    const items = getNavigationItems({ isAuth: true, isAdmin: true })
    expect(items).toStrictEqual(navigation)
  })

  test('should return all items if user is authenticated and is not admin', () => {
    const items = getNavigationItems({ isAuth: true, isAdmin: false })
    expect(items).toStrictEqual([
      { name: 'Accueil', href: '/' },
      { name: 'Livres', href: '/livres' },
      { name: 'Films', href: '/films' },
      { name: 'Personnages', href: '/personnages' },
      { name: 'Favoris', href: '/favoris', isAuth: true },
      { name: 'À propos', href: '/a-propos' },
    ])
  })

  test('should return all items if user is not authenticated and is not admin', () => {
    const expectedItems = [
      { name: 'Accueil', href: '/' },
      { name: 'Livres', href: '/livres' },
      { name: 'Films', href: '/films' },
      { name: 'Personnages', href: '/personnages' },
      { name: 'Favoris', href: '/favoris', isAuth: true },
      { name: 'À propos', href: '/a-propos' },
    ]
    expect(getNavigationItems({ isAuth: false, isAdmin: false })).toStrictEqual(expectedItems)
    expect(getNavigationItems({ isAuth: false, isAdmin: true })).toStrictEqual(expectedItems)
  })
})
