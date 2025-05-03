<template>
  <div class="max-w-2xl mx-auto py-4">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Télécharger un GIF</h1>
    <UploadForm
      @upload-success="handleUploadSuccess"
      :characters="characters?.map(char => char.name) ?? []"
      :episodes="episodes?.map(episode => episode.code) ?? []"
    />
  </div>
</template>

<script setup lang="ts">
import UploadForm from '~/components/gifs/UploadForm.vue';

const { data: characters } = await useFetch < {
  name: string
  avatar: string
  nbGifs: number
}[]> ('/api/characters')

const { data: episodes } = await useFetch < {
  code: string
  title: string
}[]> ('/api/episodes')

const handleUploadSuccess = () => {
  // Vous pouvez ajouter ici une logique supplémentaire après un upload réussi
  // Par exemple, rediriger vers la page des GIFs ou rafraîchir la liste
};
</script>
