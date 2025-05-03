<template>
  <div class="bg-white/70 backdrop-blur-sm rounded-lg shadow-sm p-6">
    <form @submit.prevent="uploadFile" class="space-y-6">
      <!-- Zone de drop -->
      <FileUpload
        @file-selected="handleFileSelected"
        @file-cleared="handleFileCleared"
      />

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
import { ArrowUpTrayIcon } from '@heroicons/vue/24/outline';
import { useToast } from '~/composables/useToast';
import type { GifUpload } from '~/types/Gif';
import { slugify } from '~/shared/utils/string';
import FileUpload from './FileUpload.vue';

const file = ref<File | null>(null);
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

const handleFileSelected = (selectedFile: File) => {
  file.value = selectedFile;
  
  // Générer le nom de fichier et le slug
  const timestamp = new Date().getTime();
  const filename = `${timestamp}-${selectedFile.name}`;
  formData.value.filename = filename;
  formData.value.slug = slugify(filename);
};

const handleFileCleared = () => {
  file.value = null;
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
      file.value = null;
      formData.value = {
        quote: '',
        characters: [],
        characters_speaking: [],
        episode: '',
        filename: '',
        slug: '',
        url: ''
      };
      charactersInput.value = '';
      charactersSpeakingInput.value = '';
      emit('upload-success');
    } else {
      denied('Erreur lors du téléchargement.');
    }
  } catch (error) {
    denied('Erreur lors du téléchargement.');
  }
};
</script> 
