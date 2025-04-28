// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    // Page d'accueil - Prérendue à la build avec revalidation
    '/': { 
      prerender: true,
      isr: true // Revalidation toutes les heures
    },
    
    // Page À propos - Prérendue
    '/about': { 
      prerender: true,
    },
    
    '/characters/**': { 
      prerender: true,
      isr: true
    },
    
    // Pages des GIFs - Générées à la demande avec cache
    '/gifs/**': { 
      prerender: true,
      swr: 3600, // Cache pendant 1 heure
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
      }
    },
    
    // Pages des livres - Prérendues avec revalidation quotidienne
    '/livres': { 
      prerender: true,
    },
    '/livres/**': { 
      prerender: true,
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/test-utils/module',
    '@nuxtjs/seo',
    'nuxt-posthog',
    '@nuxtjs/supabase',
    '@nuxtjs/cloudinary',
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
        { rel: 'canonical', href: 'https://kaamelottgifs.fr' }
      ],
      script: [
        {
          src: 'https://analytics.ahrefs.com/analytics.js',
          'data-key': 't7SBq6P4f3KcxRlwO/J3DQ',
          async: true
        }
      ]
    },
  },

  site: {
    url: 'https://kaamelottgifs.fr',
    name: 'Kaamelott GIFs',
    description: 'Collection de GIFs de la série Kaamelott',
    image: '/fondKBg.jpg',
  },

  sitemap: {
    // DOC: https://nuxtseo.com/docs/sitemap/guides/filtering-urls
    exclude: [
      '/_nuxt/',
      '/confirm',
    ],
  },

  image: {
    domains: ['localhost', 'res.cloudinary.com', 'kaamelottgifs.fr'],
    dir: 'public',
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/be-right/image/upload'
      // https://res.cloudinary.com/be-right/image/upload/f_auto,q_auto/v1/kaamelott-gifs/vous-vous-prenez-pour-un-enseignant
    }
  },

  icon: {
    customCollections: [
      {
        prefix: 'custom',
        dir: './assets/icons',
      },
    ],
  },

  tailwindcss: {
    cssPath: [`assets/css/tailwind.css`, { injectPosition: "first" }],
    config: {},
    viewer: true,
    exposeConfig: false,
  },

  compatibilityDate: '2025-04-11',

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://kaamelottgifs.fr'
    }
  }
})
