<template>
  <article
    class="group bg-white rounded-[32px] p-1.5 transition-colors duration-300 cursor-pointer max-w-[400px]"
    @click="handleClick"
  >
    <div class="relative aspect-video rounded-[32px] overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <img 
          :src="`/gifs/${gif.filename}`" 
          :alt="gif.quote"
          class="w-full h-full object-cover transform transition-transform duration-500 ease-out group-hover:-translate-y-12"
          loading="lazy" 
        />
      </div>

      <!-- Informations -->
      <div class="absolute inset-0 grid grid-cols-2 items-end p-4">
        <!-- Titre et sous-titre -->
        <div class="space-y-1 transform transition-transform duration-500">
          <h3 class="font-medium text-lg text-white transition-colors duration-300 pb-3">
            {{ gif.characters[0] }}
          </h3>
          <p class="text-sm text-white/80 group-hover:text-gray-900 transition-colors duration-300 truncate">
            {{ gif.quote }}
          </p>
        </div>

        <!-- Bouton -->
        <div class="mt-4 transform transition-all duration-500 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 pt-2">
          <div class="flex flex-wrap justify-end gap-2">
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
