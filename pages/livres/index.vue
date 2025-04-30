<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8 text-center">Les Livres de Kaamelott</h1>
    <Breadcrumbs :items="breadcrumbItems" />
    <LivreGrid v-if="seasons" :seasons="seasons" />
  </div>
</template>

<script setup lang="ts">
import type { Season } from '~/types/Season'
import LivreGrid from '~/components/livres/LivreGrid.vue'
import Breadcrumbs from '~/components/base/Breadcrumbs.vue'

const { data: seasons } = await useFetch<Season[]>('/api/seasons')
const { $clientPosthog } = useNuxtApp()

// Données pour les breadcrumbs
const breadcrumbItems = [
  {
    label: 'Livres',
    to: '/livres'
  }
]

const seoTitle = composeSeoTitle('Les Livres de Kaamelott - Toutes les saisons')
const seoDescription = composeSeoDescription('Découvrez l\'ensemble des livres (saisons) de la série culte Kaamelott, créée par Alexandre Astier. De la Table Ronde aux quêtes du Graal, plongez dans l\'univers médiéval-fantastique de la série.')

useSeoMeta({
  title: seoTitle,
  ogTitle: seoTitle,
  description: seoDescription,
  ogDescription: seoDescription,
  ogImage: '/fondKBg.webp',
  keywords: 'kaamelott, gifs, alexandre astier, série française, moments cultes, collection',
  author: 'Kaamelott GIFs',
  robots: 'index, follow',
  ogUrl: 'https://kaamelottgifs.fr/livres',
  ogType: 'website',
  twitterImage: '/fondKBg.webp',
  twitterCard: 'summary_large_image',
  twitterTitle: seoTitle,
  twitterDescription: seoDescription,
})

definePageMeta({
  layout: 'default'
})

onMounted(() => {
  if ($clientPosthog) {
    $clientPosthog.capture('page_view', {
      page: 'livres',
    })
  }
})
</script>
