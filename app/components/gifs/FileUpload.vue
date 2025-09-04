<template>
<div 
  class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-amber-500 transition-colors duration-200"
  :class="{ 'border-amber-500 bg-amber-50': isDragging }"
  @dragover.prevent="isDragging = true"
  @dragleave.prevent="isDragging = false"
  @drop.prevent="handleDrop"
>
  <div
    v-if="!previewUrl"
    class="space-y-4">
    <ArrowUpTrayIcon class="mx-auto h-12 w-12 text-gray-400" />
    <div class="text-gray-600">
      <label
        for="file-upload"
        class="relative cursor-pointer rounded-md font-medium text-amber-600 hover:text-amber-500">
        <span>Glissez-déposez un GIF ici</span>
        <input 
          id="file-upload" 
          type="file" 
          class="sr-only" 
          accept="image/gif" 
          @change="onFileChange"
        >
      </label>
      <p class="text-sm text-gray-500">ou cliquez pour sélectionner</p>
    </div>
  </div>
    
  <!-- Prévisualisation -->
  <div
    v-else
    class="relative">
    <img
      :src="previewUrl"
      alt="Aperçu du GIF"
      class="max-h-64 mx-auto rounded-lg" >
    <button 
      type="button"
      class="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
      @click="clearFile"
    >
      <XMarkIcon class="h-5 w-5" />
    </button>
  </div>
</div>
</template>

<script setup lang="ts">
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { useToast } from '~/composables/useToast';

const emit = defineEmits<{
  (e: 'file-selected', file: File): void;
  (e: 'file-cleared'): void;
}>();

const file = ref<File | null>(null);
const previewUrl = ref<string | null>(null);
const isDragging = ref(false);
const { denied } = useToast();

const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files?.length) {
    handleFile(input.files[0]);
  }
};

const handleDrop = (event: DragEvent) => {
  isDragging.value = false;
  if (event.dataTransfer?.files.length) {
    handleFile(event.dataTransfer.files[0]);
  }
};

const handleFile = (selectedFile: File) => {
  if (!selectedFile) return;
  
  if (selectedFile.type !== 'image/gif') {
    denied('Veuillez sélectionner un fichier GIF valide.');
    return;
  }

  file.value = selectedFile;
  previewUrl.value = URL.createObjectURL(selectedFile);
  emit('file-selected', selectedFile);
};

const clearFile = () => {
  file.value = null;
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = null;
  }
  emit('file-cleared');
};
</script> 
