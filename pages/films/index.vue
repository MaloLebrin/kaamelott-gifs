<template>
<div class="container mx-auto px-4 py-8">
  <h1 class="text-4xl font-bold mb-8 text-center">Les Films de Kaamelott</h1>
  <Breadcrumbs :items="breadcrumbItems" />

  <template v-if="movies">
    <EpisodeGrid
      :episodes="movies"
      type="movie" />
  </template>

  <template v-else>
    <p>Aucun film trouvé</p>
  </template>
</div>
</template>

<script setup lang="ts">
import Breadcrumbs from '~/components/base/Breadcrumbs.vue'
import EpisodeGrid from '~/components/episodes/EpisodeGrid.vue'
import type { Episode } from '~/types/Episode'

const { data: movies } = await useFetch<Episode[]>('/api/movies')
const { $clientPosthog } = useNuxtApp()

// Données pour les breadcrumbs
const breadcrumbItems = [
  {
    label: 'Films',
    to: '/films'
  }
]

const seoTitle = composeSeoTitle('Les Films de Kaamelott - Toutes les films')
const seoDescription = composeSeoDescription('Découvrez l\'ensemble des films de la série culte Kaamelott, créée par Alexandre Astier. De la Table Ronde aux quêtes du Graal, plongez dans l\'univers médiéval-fantastique de la série.')

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

onMounted(() => {
  if ($clientPosthog) {
    $clientPosthog.capture('page_view', {
      page: 'films',
    })
  }
})
</script>
