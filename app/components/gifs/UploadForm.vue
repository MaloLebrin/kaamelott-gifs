<template>
<div class="bg-white/70 backdrop-blur-sm rounded-lg shadow-sm p-6">
  <form
    class="space-y-6"
    @submit.prevent="uploadFile">
    <!-- Zone de drop -->
    <FileUpload
      @file-selected="handleFileSelected"
      @file-cleared="handleFileCleared"
    />

    <!-- Champs du formulaire -->
    <div class="space-y-4">
      <!-- Citation -->
      <BaseTextarea
        id="quote"
        v-model="formData.quote"
        label="Citation"
        :rows="3"
        placeholder="ex: 'Kadoc il peut mettre 35 mirabelles dans ses fesses'"
        required
      />

      <!-- Personnages -->
      <BaseCombobox
        v-model="formData.characters"
        :items="characters.map(char => ({ id: char, name: char }))"
        placeholder="Sélectionnez les personnages"
        label="Personnages"
      />

      <!-- Personnages qui parlent -->
      <BaseCombobox
        v-model="formData.speakingCharacters"
        :items="characters.map(char => ({ id: char, name: char }))"
        placeholder="Sélectionnez les personnages qui parlent"
        label="Personnages qui parlent"
      />

      <!-- Épisode -->
      <BaseCombobox
        v-model="selectedEpisode"
        :items="episodes.map(episode => ({ id: episode.code, name: `${episode.code} - ${episode.title}` }))"
        placeholder="Sélectionnez l'épisode"
        :multiple="false"
        label="Épisode"
      />
    </div>

    <!-- Bouton de soumission -->
    <div class="flex justify-end">
      <button 
        type="submit"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-200 cursor-pointer"
        :disabled="!file || !isFormValid"
      >
        <template v-if="isLoading">
          <BaseLoader />
        </template>
        <ArrowUpTrayIcon
          v-else
          class="h-5 w-5 mr-2" />
        Télécharger
      </button>
    </div>
  </form>
</div>
</template>

<script setup lang="ts">
import { ArrowUpTrayIcon } from '@heroicons/vue/24/outline';
import { useToast } from '~/composables/useToast';
import type { GifUpload } from '~~/shared/types/Gif';
import { removeExtensionFile, slugify } from '~~/shared/utils/string';
import FileUpload from './FileUpload.vue';
import BaseTextarea from '~/components/base/BaseTextarea.vue';
import BaseCombobox from '~/components/base/BaseCombobox.vue';
import BaseLoader from '~/components/base/BaseLoader.vue';
import { transformUrl } from '~~/shared/utils/gifs/transformUrl';

interface Props {
  characters: string[];
  episodes: {
    code: string;
    title: string;
  }[];
}

const props = withDefaults(defineProps<Props>(), {
  characters: () => [],
  episodes: () => []
});

const isLoading = ref(false);
const file = ref<File | null>(null);
const { success, denied } = useToast();

const characters = props.characters;
const episodes = props.episodes ?? [];

const selectedEpisode = ref<{ id: string; name: string }[]>([]);

const formData = ref<GifUpload>({
  quote: '',
  characters: [],
  speakingCharacters: [],
  episode: null,
  filename: '',
  slug: '',
  url: ''
});

// Mettre à jour formData.episode quand selectedEpisode change
watch(selectedEpisode, newValue => {
  if (newValue.length > 0) {
    formData.value.episode = newValue[0].name
  } else {
    formData.value.episode = null;
  }
});

const isFormValid = computed(() => {
  return Boolean(file.value && 
         formData.value.quote && 
         formData.value.characters.length > 0 && 
         formData.value.episode);
});

const emit = defineEmits(['upload-success']);

const handleFileSelected = (selectedFile: File) => {
  file.value = selectedFile
  
  // Générer le nom de fichier et le slug

  const filename = `${selectedFile.name}`;
  formData.value.filename = filename
};

const handleFileCleared = () => {
  file.value = null;
  formData.value.filename = '';
  formData.value.slug = '';
};

const uploadFile = async () => {
  isLoading.value = true;
  if (!file.value || !isFormValid.value) {
    denied('Veuillez remplir tous les champs requis.');
    isLoading.value = false;
    return;
  }

  const uploadData = new FormData();
  uploadData.append('file', file.value);

  // Transformer les données pour le format attendu par le backend
  const backendData = {
    ...formData.value,
    characters: formData.value.characters.map(char => char.name).join(','),
    characters_speaking: formData.value.speakingCharacters.map(char => char.name).join(','),
    episode: formData.value.episode,
    url: transformUrl({ fileName: formData.value.filename })
  };

  uploadData.append('data', JSON.stringify(backendData));
  try {
    const response = await fetch('/api/gifs/create', {
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
        episode: null,
        filename: '',
        slug: '',
        url: ''
      };
      selectedEpisode.value = [];

      const { slug } = await response.json()
      navigateTo(`/gifs/${slug}`)
      emit('upload-success');
    } else {
      denied('Erreur lors du téléchargement.');
    }
  } catch (error) {
    console.error(error, 'error');
    denied('Erreur lors du téléchargement.');
  } finally {
    isLoading.value = false;
  }
};
</script> 
