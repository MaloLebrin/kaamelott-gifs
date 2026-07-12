/**
 * @description Site configuration
 * @returns {Object} Site configuration
 */
export const siteConfig = {
  url: 'https://kaamelottgifs.fr',
  name: 'Kaamelott GIFs',
  description: 'Découvrez et partagez les meilleurs GIFs de Kaamelott. Une collection complète des moments cultes de la série.',
  image: '/fondKBg.jpg',
  twitter: '@kaamelott_gifs',
  language: 'fr'
}

export const siteMapConfig = {
  // Le mode debug ne doit être actif qu'en développement.
  debug: process.env.NODE_ENV === 'development',
  // DOC: https://nuxtseo.com/docs/sitemap/guides/filtering-urls
  exclude: [
    '/_nuxt/',
    '/confirm',
  ],
  include: [
    '/public/**',
    '/a-propos',
    '/personnages',
    '/livres',
    '/gifs',
    '/personnages/**',
    '/livres/**',
    '/gifs/**',
  ],
  defaults: {
    changefreq: 'daily',
    priority: 0.8,
    // lastmod par défaut = date du build. Évalué une fois au chargement de
    // la config (donc identique pour toutes les URLs sans lastmod propre).
    // Les sources qui exposent une vraie date de mise à jour la surchargent.
    lastmod: new Date()
  }
}
