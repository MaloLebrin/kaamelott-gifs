<template>
  <div class="bg-white/90 backdrop-blur-sm rounded-lg shadow-sm p-6">
    <form @submit.prevent="uploadFile" class="space-y-6">
      <!-- Zone de drop -->
      <div 
        class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-amber-500 transition-colors duration-200"
        :class="{ 'border-amber-500 bg-amber-50': isDragging }"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop"
      >
        <div v-if="!previewUrl" class="space-y-4">
          <ArrowUpTrayIcon class="mx-auto h-12 w-12 text-gray-400" />
          <div class="text-gray-600">
            <label for="file-upload" class="relative cursor-pointer rounded-md font-medium text-amber-600 hover:text-amber-500">
              <span>Glissez-déposez un GIF ici</span>
              <input 
                id="file-upload" 
                type="file" 
                class="sr-only" 
                @change="onFileChange" 
                accept="image/gif"
              />
            </label>
            <p class="text-sm text-gray-500">ou cliquez pour sélectionner</p>
          </div>
        </div>
        
        <!-- Prévisualisation -->
        <div v-else class="relative">
          <img :src="previewUrl" alt="Aperçu du GIF" class="max-h-64 mx-auto rounded-lg" />
          <button 
            type="button"
            class="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
            @click="clearFile"
          >
            <XMarkIcon class="h-5 w-5" />
          </button>
        </div>
      </div>

      <!-- Bouton de soumission -->
      <div class="flex justify-end">
        <button 
          type="submit"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-200 cursor-pointer"
          :disabled="!file"
        >
          <ArrowUpTrayIcon class="h-5 w-5 mr-2" />
          Télécharger
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { useToast } from '~/composables/useToast';

const file = ref(null);
const previewUrl = ref(null);
const isDragging = ref(false);
const { success, denied } = useToast();

const emit = defineEmits(['upload-success']);

const onFileChange = (event) => {
  const selectedFile = event.target.files[0];
  handleFile(selectedFile);
};

const handleDrop = (event) => {
  isDragging.value = false;
  const droppedFile = event.dataTransfer.files[0];
  handleFile(droppedFile);
};

const handleFile = (selectedFile) => {
  if (!selectedFile) return;
  
  if (selectedFile.type !== 'image/gif') {
    denied('Veuillez sélectionner un fichier GIF valide.');
    return;
  }

  file.value = selectedFile;
  previewUrl.value = URL.createObjectURL(selectedFile);
};

const clearFile = () => {
  file.value = null;
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = null;
  }
};

const uploadFile = async () => {
  if (!file.value) {
    denied('Veuillez sélectionner un fichier.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file.value);

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      success('GIF téléchargé avec succès !');
      clearFile();
      emit('upload-success');
    } else {
      denied('Erreur lors du téléchargement.');
    }
  } catch (error) {
    denied('Erreur lors du téléchargement.');
  }
};
</script> 
