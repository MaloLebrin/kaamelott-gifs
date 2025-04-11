// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/test-utils/module'
  ],

  app: {
    head: {
      title: 'Kaamelott GIFs',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Collection de GIFs de la série Kaamelott' },
      ],
    },
  },

  image: {
    domains: ['localhost'],
    dir: 'public',
  },

  compatibilityDate: '2025-04-11',
})
