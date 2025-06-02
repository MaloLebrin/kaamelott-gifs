/**
 * @description Route rules configuration
 * @returns {Object} Route rules configuration
 */
export const routeRulesConfig ={
  // Page d'accueil - Prérendue à la build avec revalidation
  '/': { 
    prerender: true,
    isr: true, // Revalidation toutes les heures
    headers: {
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
    }
  },
  
  // Page À propos - Prérendue
  '/a-propos': { 
    prerender: true,
    headers: {
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
    }
  },

  '/characters/**': { 
    redirect: '/personnages/**'
  },
  '/characters': { 
    redirect: '/personnages'
  },
  
  '/personnages/**': { 
    prerender: true,
    isr: true,
    headers: {
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
    }
  },
  '/personnages': { 
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

  '/gifs': { 
    redirect: '/'
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
}
