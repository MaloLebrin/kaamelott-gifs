// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/test-utils/module',
    '@nuxtjs/sitemap',
  ],

  app: {
    head: {
      titleTemplate: '%s - Kaamelott GIFs',
      htmlAttrs: {
        lang: 'fr'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#3b82f6' },
        { name: 'description', content: 'Collection de GIFs de la série Kaamelott' },
        { property: 'og:site_name', content: 'Kaamelott GIFs' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
  },

  site: {
    url: 'https://kaamelottgifs.com',
    name: 'Kaamelott GIFs',
    description: 'Collection de GIFs de la série Kaamelott',
    image: '/og-image.jpg',
  },

  image: {
    domains: ['localhost'],
    dir: 'public',
  },

  compatibilityDate: '2025-04-11',
})
