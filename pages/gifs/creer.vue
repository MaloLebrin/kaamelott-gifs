<template>
<div class="max-w-2xl mx-auto py-4 min-h-screen">
  <h1 class="text-3xl font-bold text-gray-900 mb-8">Télécharger un GIF</h1>
  <UploadForm
    v-if="characters && episodes && characters.length > 0 && episodes.length > 0 && !isLoading"
    :characters="characters?.map(char => char.name) ?? []"
    :episodes="episodes ?? []"
    @upload-success="handleUploadSuccess"
  />
  <div v-else>
    <p>Chargement des personnages et des épisodes...</p>
  </div>
</div>
</template>

<script setup lang="ts">
import UploadForm from '~/components/gifs/UploadForm.vue';

definePageMeta({
  middleware: 'auth'
})

const { data: characters, pending: charactersPending } = await useFetch < {
  name: string
  avatar: string
  nbGifs: number
}[]> ('/api/characters')

const { data: episodes, pending: episodesPending } = await useFetch < {
  code: string
  title: string
}[]> ('/api/episodes')

const isLoading = computed(() => {
  return charactersPending.value || episodesPending.value
})

const handleUploadSuccess = () => {
  // Fonction vide pour le moment, à utiliser si besoin de logique post-upload
};
</script>
