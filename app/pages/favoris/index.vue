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
    <div 
      v-if="user"
      class="flex flex-wrap gap-2 mb-6">
      <button
        v-for="type in entityTypes"
        :key="type.value"
        class="px-4 py-2 rounded-full transition-all duration-200"
        :class="{
          'bg-blue-500 text-white': selectedType === type.value,
          'bg-gray-100 hover:bg-gray-200 text-gray-700': selectedType !== type.value
        }"
        @click="setEntityType(type.value)"
      >
        {{ type.label }}
      </button>
    </div>
  </div>

  <!-- État de chargement -->
  <div
    v-if="isLoading"
    class="flex justify-center items-center py-12"
  >
    <Icon
      name="heroicons:arrow-path"
      class="w-8 h-8 animate-spin text-blue-500" />
  </div>

  <!-- Liste des favoris -->
  <div
    v-else-if="user && likes.length > 0"
    class="space-y-8"
  >
    <LikeItem
      v-for="like in likes"
      :key="like.id"
      :like="like"
    />

    <Pagination
      v-if="totalPages > 1"
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="setPage"
    />
  </div>

  <!-- État vide -->
  <div
    v-else-if="user"
    class="text-center py-12 bg-white rounded-lg shadow"
  >
    <p class="text-xl text-gray-600">
      {{ selectedType 
        ? 'Aucun favori de type "' + getEntityTypeLabel(selectedType) + '" trouvé'
        : 'Aucun favori trouvé' 
      }}
    </p>
  </div>

  <!-- Message pour les utilisateurs non connectés -->
  <div
    v-else
    class="text-center py-12 bg-white rounded-lg shadow"
  >
    <p class="text-xl text-gray-600 mb-4">
      Connectez-vous pour voir vos favoris
    </p>
    <button
      class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      @click="uiStore.openModal(ModalNames.AUTH_MODAL, window?.location?.href || '/')"
    >
      Se connecter
    </button>
  </div>
</div>
</template>

<script setup lang="ts">
import { Entities, type LikeableEntity } from '~~/shared/types/Entities'
import Pagination from '~/components/base/Pagination.vue'
import Breadcrumbs from '~/components/base/Breadcrumbs.vue'
import LikeItem from '~/components/likes/LikeItem.vue'
import { useLikesList } from '~/composables/useLikesList'
import { useUiStore } from '~/stores/uiStore'
import { ModalNames } from '~/stores/uiStore/state'

const { $clientPosthog } = useNuxtApp()
const user = useSupabaseUser()
const uiStore = useUiStore()

// Types d'entités pour les filtres
const entityTypes: { value: LikeableEntity | undefined, label: string }[] = [
  { value: undefined, label: 'Tous' },
  { value: Entities.GIF, label: 'GIFs' },
  { value: Entities.CHARACTER, label: 'Personnages' },
  { value: Entities.EPISODE, label: 'Épisodes' },
  { value: Entities.SEASON, label: 'Saisons' }
]

// Ouvrir la modale de connexion si l'utilisateur n'est pas connecté
onMounted(() => {
  if (!user.value) {
    uiStore.openModal(ModalNames.AUTH_MODAL, window.location.href)
  }
})

// Utiliser le composable
const {
  likes,
  currentPage,
  totalPages,
  isLoading,
  error,
  selectedType,
  setPage,
  setEntityType,
  refresh
} = useLikesList()

// Méthodes
function getEntityTypeLabel(type: LikeableEntity): string {
  return entityTypes.find(t => t.value === type)?.label || type
}

// Analytics
onMounted(() => {
  if ($clientPosthog && user.value) {
    $clientPosthog.capture('page_view', {
      page: 'favorites',
      type: selectedType.value
    })
  }
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
