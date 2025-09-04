<template>
<div class="max-w-2xl mx-auto py-4 min-h-screen">
  <h1 class="text-3xl font-bold text-gray-900 mb-8">Télécharger un GIF</h1>
  <Breadcrumbs :items="[{ label: 'Ajouter un GIF', to: '/gifs/creer' }]"/>
  
  <!-- Contenu pour utilisateurs connectés -->
  <UploadForm
    v-if="user && characters && episodes && characters.length > 0 && episodes.length > 0 && !isLoading"
    :characters="characters?.map(char => char.name) ?? []"
    :episodes="episodes ?? []"
  />
  
  <!-- État de chargement -->
  <div
    v-else-if="user && isLoading"
    class="text-center py-8">
    <p class="text-gray-600">Chargement des personnages et des épisodes...</p>
  </div>
  
  <!-- Message pour les utilisateurs non connectés -->
  <div
    v-else-if="!user"
    class="text-center py-12 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
    <div class="max-w-md mx-auto">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Connexion Requise</h2>
      <p class="text-gray-700 mb-6">
        Pour ajouter un GIF à la collection de Kaamelott, vous devez être connecté à la Table Ronde.
      </p>
      <button
        class="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
        @click="openAuthModal"
      >
        Se connecter
      </button>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import Breadcrumbs from '~/components/base/Breadcrumbs.vue';
import UploadForm from '~/components/gifs/UploadForm.vue';
import { useUiStore } from '~/stores/uiStore';
import { ModalNames } from '~/stores/uiStore/state';

const user = useSupabaseUser()
const uiStore = useUiStore()

// Ouvrir la modale de connexion si l'utilisateur n'est pas connecté
onMounted(() => {
  if (!user.value) {
    uiStore.openModal(ModalNames.AUTH_MODAL, window.location.href)
  }
})

// Fonction pour ouvrir la modale de connexion
const openAuthModal = () => {
  uiStore.openModal(ModalNames.AUTH_MODAL, window.location.href)
}

// Charger les données seulement si l'utilisateur est connecté
const { data: characters, pending: charactersPending } = await useFetch<{
  name: string
  avatar: string
  nbGifs: number
}[]>('/api/characters', {
  server: false,
  lazy: true
})

const { data: episodes, pending: episodesPending } = await useFetch<{
  code: string
  title: string
}[]>('/api/episodes', {
  server: false,
  lazy: true
})

const isLoading = computed(() => {
  return charactersPending.value || episodesPending.value
})

useSeoMeta({
  title: 'Ajouter un GIF',
  description: 'Ajoutez un GIF de Kaamelott',
  ogTitle: 'Ajouter un GIF',
  ogDescription: 'Ajoutez un GIF de Kaamelott',
  ogImage: 'https://kaamelott-gifs.com/og-image.png',
  twitterTitle: 'Ajouter un GIF',
  twitterDescription: 'Ajoutez un GIF de Kaamelott',
  twitterImage: 'https://kaamelott-gifs.com/og-image.png',
  twitterCard: 'summary_large_image',
  twitterSite: '@kaamelott_gifs',
  twitterCreator: '@kaamelott_gifs',
  keywords: 'Kaamelott, GIF, créer, ajouter, télécharger, personnages, épisodes, livres, répliques, kaamelott-gifs, alexandre astier'
})
</script>
