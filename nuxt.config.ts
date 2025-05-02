import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    // Page d'accueil - Prérendue à la build avec revalidation
    '/': { 
      prerender: true,
      isr: true, // Revalidation toutes les heures
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
      }
    },
    
    // Page À propos - Prérendue
    '/about': { 
      prerender: true,
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
      }
    },
    
    '/characters/**': { 
      prerender: true,
      isr: true,
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
      }
    },
    '/characters': { 
      prerender: true,
      isr: true,
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
      }
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
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
      }
    },
    '/livres/**': { 
      prerender: true,
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
      }
    },
  },

  modules: [
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/test-utils/module',
    '@nuxtjs/seo',
    'nuxt-posthog',
    '@nuxtjs/supabase',
  ],

  supabase: {
    redirect: false,
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    serviceKey: process.env.SUPABASE_SERVICE_KEY,
  },

  app: {
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
        { name: 'keywords', content: 'Kaamelott, GIFs, répliques, citations, série TV, humour, France' },
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
  },

  site: {
    url: 'https://kaamelottgifs.fr',
    name: 'Kaamelott GIFs',
    description: 'Découvrez et partagez les meilleurs GIFs de Kaamelott. Une collection complète des moments cultes de la série.',
    image: '/fondKBg.jpg',
    twitter: '@kaamelott_gifs',
    language: 'fr'
  },

  sitemap: {
    debug: true,
    // DOC: https://nuxtseo.com/docs/sitemap/guides/filtering-urls
    exclude: [
      '/_nuxt/',
      '/confirm',
    ],
    defaults: {
      changefreq: 'daily',
      priority: 0.8,
      lastmod: new Date()
    }
  },

  image: {
    domains: ['localhost', 'kaamelottgifs.fr', 's3.eu-west-3.amazonaws.com', 'kv1gbucket.s3.eu-west-3.amazonaws.com'],
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

  vite: {
    plugins: [
      tailwindcss()
    ],
  },
  css: [
    'assets/css/main.css',
  ],

  compatibilityDate: '2025-04-11',

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://kaamelottgifs.fr'
    }
  }
})
