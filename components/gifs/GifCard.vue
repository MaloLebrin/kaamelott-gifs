<template>
  <article
    class="group bg-black/90 hover:bg-white rounded-[32px] p-4 transition-colors duration-300 cursor-pointer min-h-[250px] max-w-[400px]"
    @click="handleClick"
  >
    <div class="relative aspect-video rounded-2xl overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <img 
          :src="`/gifs/${gif.filename}`" 
          :alt="gif.quote"
          class="w-full h-full object-cover transform transition-transform duration-500 ease-out group-hover:-translate-y-8"
          loading="lazy" 
        />
      </div>

      <!-- Informations -->
      <div class="absolute inset-0 flex flex-col justify-end p-4">
        <!-- Titre et sous-titre -->
        <div class="space-y-1 transform transition-transform duration-500 translate-y-8 group-hover:translate-y-0">
          <h3 class="font-medium text-lg group-hover:text-gray-900 text-white transition-colors duration-300">
            {{ gif.characters[0] }}
          </h3>
          <p class="text-sm text-white/80 group-hover:text-gray-600 transition-colors duration-300">
            {{ gif.quote }}
          </p>
        </div>

        <!-- Bouton -->
        <div class="mt-4 transform transition-all duration-500 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          <div class="flex flex-wrap gap-2">
            <span
              v-for="character in gif.characters.slice(1)"
              :key="character"
              class="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
            >
              {{ character }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
import type { Gif } from '~/types'

const props = defineProps<{
  gif: Gif
}>()

const emit = defineEmits<{
  (e: 'click', gif: Gif): void
}>()

const handleClick = () => {
  emit('click', props.gif)
}
</script>

<style scoped>
.aspect-video {
  aspect-ratio: 16 / 9;
}
</style>
