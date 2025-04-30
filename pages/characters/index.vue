<template>
  <div class="container mx-auto px-4 py-8 space-y-8">
    <h1 class="text-4xl font-bold mb-8 text-center">Les Personnages de Kaamelott</h1>
    <Breadcrumbs :items="breadcrumbItems" />
    <CharacterGrid v-if="characters" :characters="characters" />
  </div>
</template>

<script setup lang="ts">
import CharacterGrid from '~/components/characters/CharacterGrid.vue'
import Breadcrumbs from '~/components/base/Breadcrumbs.vue'

const { data: characters } = await useFetch<{
  name: string
  avatar: string
  nbGifs: number
}[]>('/api/characters')

const { $clientPosthog } = useNuxtApp()

// Données pour les breadcrumbs
const breadcrumbItems = [
  {
    label: 'Personnages',
    to: '/characters'
  }
]

const seoTitle = composeSeoTitle('Les Personnages de Kaamelott - Tous les personnages')
const seoDescription = composeSeoDescription('Découvrez l\'ensemble des personnages de la série culte Kaamelott, créée par Alexandre Astier. De la Table Ronde aux quêtes du Graal, plongez dans l\'univers médiéval-fantastique de la série.')

useSeoMeta({
  title: seoTitle,
  ogTitle: seoTitle,
  description: seoDescription,
  ogDescription: seoDescription,
  ogImage: '/fondKBg.webp',
  keywords: 'kaamelott, gifs, alexandre astier, série française, moments cultes, collection',
  author: 'Kaamelott GIFs',
  robots: 'index, follow',
  ogUrl: 'https://kaamelottgifs.fr/characters',
  ogType: 'website',
  twitterImage: '/fondKBg.webp',
  twitterCard: 'summary_large_image',
  twitterTitle: seoTitle,
  twitterDescription: seoDescription,
})

onMounted(() => {
  if ($clientPosthog) {
    $clientPosthog.capture('page_view', {
      page: 'characters',
    })
  }
})
</script>
