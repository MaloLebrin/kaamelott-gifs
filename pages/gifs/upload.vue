<template>
  <div class="max-w-2xl mx-auto py-4">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Télécharger un GIF</h1>
    <UploadForm @upload-success="handleUploadSuccess" />
  </div>
</template>

<script setup>
import UploadForm from '~/components/gifs/UploadForm.vue';

const handleUploadSuccess = () => {
  // Vous pouvez ajouter ici une logique supplémentaire après un upload réussi
  // Par exemple, rediriger vers la page des GIFs ou rafraîchir la liste
};
</script>
