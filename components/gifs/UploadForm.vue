<template>
  <div class="bg-white/70 backdrop-blur-sm rounded-lg shadow-sm p-6">
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

      <!-- Champs du formulaire -->
      <div class="space-y-4">
        <!-- Citation -->
        <div>
          <label for="quote" class="block text-sm font-medium text-gray-700">Citation</label>
          <textarea
            id="quote"
            v-model="formData.quote"
            rows="3"
            class="mt-1 block w-full px-1.5 py-0.5  rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            placeholder="Entrez la citation du GIF"
            required
          />
        </div>

        <!-- Personnages -->
        <div>
          <label for="characters" class="block text-sm font-medium text-gray-700">Personnages</label>
          <input
            id="characters"
            v-model="charactersInput"
            type="text"
            class="mt-1 block w-full px-1.5 py-0.5 rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            placeholder="Entrez les personnages séparés par des virgules"
            @input="updateCharacters"
            required
          />
        </div>

        <!-- Personnages qui parlent -->
        <div>
          <label for="characters_speaking" class="block text-sm font-medium text-gray-700">Personnages qui parlent</label>
          <input
            id="characters_speaking"
            v-model="charactersSpeakingInput"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 px-1.5 py-0.5"
            placeholder="Entrez les personnages qui parlent séparés par des virgules"
            @input="updateCharactersSpeaking"
          />
        </div>

        <!-- Épisode -->
        <div>
          <label for="episode" class="block text-sm font-medium text-gray-700">Épisode</label>
          <input
            id="episode"
            v-model="formData.episode"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 px-1.5 py-0.5"
            placeholder="Entrez l'épisode"
            required
          />
        </div>
      </div>

      <!-- Bouton de soumission -->
      <div class="flex justify-end">
        <button 
          type="submit"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-200 cursor-pointer"
          :disabled="!file || !isFormValid"
        >
          <ArrowUpTrayIcon class="h-5 w-5 mr-2" />
          Télécharger
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { useToast } from '~/composables/useToast';
import type { GifUpload } from '~/types/Gif';
import { slugify } from '~/shared/utils/string';

const file = ref<File | null>(null);
const previewUrl = ref<string | null>(null);
const isDragging = ref(false);
const { success, denied } = useToast();

const charactersInput = ref('');
const charactersSpeakingInput = ref('');

const formData = ref<Partial<GifUpload>>({
  quote: '',
  characters: [],
  characters_speaking: [],
  episode: '',
  filename: '',
  slug: '',
  url: ''
});

const isFormValid = computed(() => {
  return file.value && 
         formData.value.quote && 
         (formData.value.characters?.length ?? 0) > 0 && 
         formData.value.episode;
});

const emit = defineEmits(['upload-success']);

const updateCharacters = () => {
  formData.value.characters = charactersInput.value
    .split(',')
    .map(char => char.trim())
    .filter(char => char.length > 0);
};

const updateCharactersSpeaking = () => {
  formData.value.characters_speaking = charactersSpeakingInput.value
    .split(',')
    .map(char => char.trim())
    .filter(char => char.length > 0);
};

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
  
  // Générer le nom de fichier et le slug
  const timestamp = new Date().getTime();
  const filename = `${timestamp}-${selectedFile.name}`;
  formData.value.filename = filename;
  formData.value.slug = slugify(filename);
};

const clearFile = () => {
  file.value = null;
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = null;
  }
  formData.value.filename = '';
  formData.value.slug = '';
};

const uploadFile = async () => {
  if (!file.value || !isFormValid.value) {
    denied('Veuillez remplir tous les champs requis.');
    return;
  }

  const uploadData = new FormData();
  uploadData.append('file', file.value);
  uploadData.append('data', JSON.stringify(formData.value));

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: uploadData,
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
