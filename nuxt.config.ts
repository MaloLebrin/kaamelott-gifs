// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    '/': { prerender: true },
    '/characters/**': { swr: true },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/test-utils/module',
    '@nuxtjs/seo',
    'nuxt-posthog',
    '@nuxtjs/supabase'
  ],

  supabase: {
    redirect: false,
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    serviceKey: process.env.SUPABASE_SERVICE_KEY,
  },

  app: {
    head: {
      titleTemplate: '%s - Kaamelott GIFs',
      htmlAttrs: {
        lang: 'fr'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Collection de GIFs de la série Kaamelott' },
        { name: 'theme-color', content: '#ffffff' },
        { property: 'og:site_name', content: 'Kaamelott GIFs' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@kaamelott_gifs' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://kaamelott-gifs.com' }
      ]
    },
  },

  site: {
    url: 'https://kaamelottgifs.com',
    name: 'Kaamelott GIFs',
    description: 'Collection de GIFs de la série Kaamelott',
    image: '/fondKBg.jpg',
  },

  image: {
    domains: ['localhost'],
    dir: 'public',
  },

  icon: {
    customCollections: [
      {
        prefix: 'custom',
        dir: './assets/icons',
      },
    ],
  },

  compatibilityDate: '2025-04-11',

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://kaamelott-gifs.com'
    }
  }
})
