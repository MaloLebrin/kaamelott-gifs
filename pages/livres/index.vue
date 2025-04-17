<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8 text-center">Les Livres de Kaamelott</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NuxtLink 
        v-for="season in seasons" 
        :key="season.id"
        :to="`/livres/${season.slug}`"
        class="group"
      >
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
          <div class="p-6">
            <h2 class="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-amber-600 transition-colors">
              {{ season.title }}
            </h2>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              {{ season.airDate }}
            </p>
            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span class="mr-4">{{ season.episodesCount }} épisodes</span>
              <span>{{ season.duration }}</span>
            </div>
            <p class="text-gray-700 dark:text-gray-300 line-clamp-3">
              {{ season.resume }}
            </p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Season } from '~/types/Season'

const { data: seasons } = await useFetch<Season[]>('/api/seasons')

useSeoMeta({
  title: 'Les Livres de Kaamelott - Toutes les saisons',
  description: 'Découvrez l\'ensemble des livres (saisons) de la série culte Kaamelott, créée par Alexandre Astier. De la Table Ronde aux quêtes du Graal, plongez dans l\'univers médiéval-fantastique de la série.',
  ogTitle: 'Les Livres de Kaamelott - Toutes les saisons',
  ogDescription: 'Découvrez l\'ensemble des livres (saisons) de la série culte Kaamelott, créée par Alexandre Astier. De la Table Ronde aux quêtes du Graal, plongez dans l\'univers médiéval-fantastique de la série.',
})

definePageMeta({
  layout: 'default'
})

const { $clientPosthog } = useNuxtApp()
onMounted(() => {
  if ($clientPosthog) {
    $clientPosthog.capture('page_view', {
      page: 'livres',
    })
  }
})
</script>
