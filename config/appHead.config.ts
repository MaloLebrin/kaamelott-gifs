/**
 * @description AppHead configuration
 * @returns {Object} AppHead configuration
 */
export const appHead = {
  head: {
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'Découvrez et partagez les meilleurs GIFs de Kaamelott. Une collection complète des moments cultes de la série.' },
      { name: 'theme-color', content: '#ffffff' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Kaamelott GIFs' },
      { name: 'keywords', content: 'Kaamelott, GIFs, répliques, citations, série TV, humour, alexandre astier, perceval, kaamelott-gifs, karadoc' },
      { property: 'og:site_name', content: 'Kaamelott GIFs' },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'fr_FR' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@kaamelott_gifs' },
      { name: 'twitter:creator', content: '@kaamelott_gifs' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'canonical', href: 'https://kaamelottgifs.fr' },
      { rel: 'alternate', hreflang: 'fr', href: 'https://kaamelottgifs.fr' },
      { rel: 'alternate', hreflang: 'x-default', href: 'https://kaamelottgifs.fr' }
    ],
    script: [
      {
        src: 'https://analytics.ahrefs.com/analytics.js',
        'data-key': 't7SBq6P4f3KcxRlwO/J3DQ',
        async: true
      }
    ]
  },
}
