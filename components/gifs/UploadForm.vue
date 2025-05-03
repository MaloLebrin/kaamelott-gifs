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
          :rows="3"
          placeholder="Entrez la citation du GIF"
          required
        />

        <!-- Personnages -->
        <BaseCombobox
          v-model="formData.characters"
          :items="characters"
          placeholder="Sélectionnez les personnages"
        />

        <!-- Personnages qui parlent -->
        <BaseCombobox
          v-model="formData.speakingCharacters"
          :items="characters"
          placeholder="Sélectionnez les personnages qui parlent"
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
import BaseCombobox from '~/components/base/BaseCombobox.vue';

interface Props {
  characters: string[];
}

const props = defineProps<Props>();

const file = ref<File | null>(null);
const { success, denied } = useToast();

const characters = props.characters;

const formData = ref<GifUpload>({
  quote: '',
  characters: [],
  speakingCharacters: [],
  episode: '',
  filename: '',
  slug: '',
  url: ''
});

const isFormValid = computed(() => {
  return file.value && 
         formData.value.quote && 
         formData.value.characters.length > 0 && 
         formData.value.episode;
});

const emit = defineEmits(['upload-success']);

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

  // Transformer les données pour le format attendu par le backend
  const backendData = {
    ...formData.value,
    characters: formData.value.characters.map(char => char.name).join(','),
    characters_speaking: formData.value.speakingCharacters.map(char => char.name).join(',')
  };

  uploadData.append('data', JSON.stringify(backendData));

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
        speakingCharacters: [],
        episode: '',
        filename: '',
        slug: '',
        url: ''
      };
      emit('upload-success');
    } else {
      denied('Erreur lors du téléchargement.');
    }
  } catch (error) {
    denied('Erreur lors du téléchargement.');
  }
};
</script> 
