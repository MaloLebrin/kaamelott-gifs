<template>
<div class="container mx-auto px-4 py-8">
  <Breadcrumbs
    :items="[
      {
        label: 'Favoris',
        to: '/favorites'
      }
    ]" />
  
  <div class="mb-8">
    <h1 class="text-4xl font-bold mb-4">Mes Favoris</h1>
    
    <!-- Filtres -->
    <div class="flex flex-wrap gap-2 mb-6">
      <button
        v-for="type in entityTypes"
        :key="type.value"
        class="px-4 py-2 rounded-full transition-all duration-200"
        :class="{
          'bg-blue-500 text-white': selectedType === type.value,
          'bg-gray-100 hover:bg-gray-200 text-gray-700': selectedType !== type.value
        }"
        @click="handleTypeChange(type.value)"
      >
        {{ type.label }}
      </button>
    </div>
  </div>

  <!-- Grille de favoris -->
  <div
    v-if="favorites && favorites.length > 0"
    class="space-y-8">
    <LikeItem
      v-for="like in favorites"
      :key="like.id"
      :like="like as unknown as LikeWithRelation"
    />


    <!-- Pagination -->
    <Pagination
      v-if="totalPages > 1"
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="handlePageChange"
    />
  </div>

  <!-- Message si aucun favori -->
  <div
    v-else
    class="text-center py-12 bg-white rounded-lg shadow"
  >
    <p class="text-xl text-gray-600">
      {{ selectedType 
        ? 'Aucun favori de type "' + getEntityTypeLabel(selectedType) + '" trouvé'
        : 'Aucun favori trouvé' 
      }}
    </p>
  </div>
</div>
</template>

<script setup lang="ts">
import { Entities } from '~/types'
import Pagination from '~/components/base/Pagination.vue'
import Breadcrumbs from '~/components/base/Breadcrumbs.vue'
import LikeItem from '~/components/likes/LikeItem.vue'
import type { LikeWithRelation } from '~/types/Like'

const route = useRoute()
const { $clientPosthog, $router } = useNuxtApp()

// Types d'entités pour les filtres
const entityTypes = [
  { value: undefined, label: 'Tous' },
  { value: Entities.GIF, label: 'GIFs' },
  { value: Entities.CHARACTER, label: 'Personnages' },
  { value: Entities.EPISODE, label: 'Épisodes' },
  { value: Entities.SEASON, label: 'Saisons' }
]

// États
const selectedType = ref<Entities | undefined>(route.query.type as Entities || undefined)
const currentPage = ref(Number(route.query.page) || 1)

// Charger les favoris
const { data: favoritesData } = await useFetch('/api/likes', {
  query: computed(() => ({
    type: selectedType.value,
    page: currentPage.value,
    itemsPerPage: 21
  }))
})

// Watcher pour les changements d'URL
watch(
  () => route.query,
  newQuery => {
    // Mettre à jour le type sélectionné
    const newType = newQuery.type as Entities | undefined
    if (newType !== selectedType.value) {
      selectedType.value = newType
    }

    // Mettre à jour la page
    const newPage = Number(newQuery.page) || 1
    if (newPage !== currentPage.value) {
      currentPage.value = newPage
    }
  },
  { immediate: true }
)

// Computed properties
const favorites = computed(() => favoritesData.value?.favorites || [])
const totalPages = computed(() => favoritesData.value?.totalPages || 0)

// Méthodes
function handleTypeChange(type: Entities | undefined) {
  // Mettre à jour l'URL sans recharger la page
  $router.push({
    query: {
      ...route.query,
      type: type || undefined,
      page: '1' // Réinitialiser la page à 1 lors du changement de type
    }
  })
}

function handlePageChange(page: number) {
  // Mettre à jour l'URL sans recharger la page
  $router.push({
    query: {
      ...route.query,
      page: page.toString()
    }
  })
}

function getEntityTypeLabel(type: Entities): string {
  return entityTypes.find(t => t.value === type)?.label || type
}

// Analytics
onMounted(() => {
  if ($clientPosthog) {
    $clientPosthog.capture('page_view', {
      page: 'favorites',
      type: selectedType.value
    })
  }
})

definePageMeta({
  middleware: ['auth'],
  isAuth: true
})

useSeoMeta({
  title: 'Mes Favoris',
  ogTitle: 'Mes Favoris',
  description: 'Consultez tous vos favoris de Kaamelott : GIFs, personnages, épisodes et saisons',
  ogDescription: 'Consultez tous vos favoris de Kaamelott : GIFs, personnages, épisodes et saisons',
  ogImage: '/fondKBg.webp',
  keywords: 'kaamelott, gifs, favoris, collection, moments cultes',
  author: 'Kaamelott GIFs',
  robots: 'index, follow',
  ogUrl: 'https://kaamelottgifs.fr/favorites',
  ogType: 'website',
  twitterImage: '/fondKBg.webp',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Mes Favoris',
  twitterDescription: 'Consultez tous vos favoris de Kaamelott : GIFs, personnages, épisodes et saisons',
})
</script> 
