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
        <BaseTextarea
          v-model="formData.quote"
          label="Citation"
          id="quote"
          rows="3"
          placeholder="Entrez la citation du GIF"
          required
        />

        <!-- Personnages -->
        <BaseInput
          v-model="charactersInput"
          label="Personnages"
          id="characters"
          placeholder="Entrez les personnages séparés par des virgules"
          required
          @input="updateCharacters"
        />

        <!-- Personnages qui parlent -->
        <BaseInput
          v-model="charactersSpeakingInput"
          label="Personnages qui parlent"
          id="characters_speaking"
          placeholder="Entrez les personnages qui parlent séparés par des virgules"
          @input="updateCharactersSpeaking"
        />

        <!-- Épisode -->
        <BaseInput
          v-model="formData.episode"
          label="Épisode"
          id="episode"
          placeholder="Entrez l'épisode"
          required
        />
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
import BaseInput from '~/components/base/BaseInput.vue';
import BaseTextarea from '~/components/base/BaseTextarea.vue';

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
