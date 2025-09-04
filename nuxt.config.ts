import tailwindcss from "@tailwindcss/vite"
import {
  appHead,
  iconConfig,
  imageConfig,
  routeRulesConfig,
  siteConfig,
  siteMapConfig,
} from "./config/index.config"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: routeRulesConfig,
  modules: [
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/test-utils/module',
    '@nuxtjs/seo',
    'nuxt-posthog',
    '@nuxtjs/supabase',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxtjs/sitemap'
  ],

  supabase: {
    redirect: false,
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    serviceKey: process.env.SUPABASE_SERVICE_KEY,
  },

  app: appHead,
  site: siteConfig,
  sitemap: siteMapConfig,
  image: imageConfig,
  icon: iconConfig,

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
