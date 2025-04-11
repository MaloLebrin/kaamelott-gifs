<script setup lang="ts">
import type { Gif } from '~/types'
import GifModal from './GifModal.vue'

const props = defineProps<{
  gifs: Gif[]
}>()

const selectedGif = ref<Gif | null>(null)
const isModalOpen = ref(false)

const openModal = (gif: Gif) => {
  selectedGif.value = gif
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedGif.value = null
}
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
    <div
      v-for="gif in gifs"
      :key="gif.slug"
      class="group relative aspect-video rounded-3xl overflow-hidden bg-gray-900/5 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
      @click="openModal(gif)"
    >
      <img
        :src="`/gifs/${gif.filename}`"
        :alt="gif.quote"
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
          <p class="font-medium text-lg mb-2">{{ gif.quote }}</p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="character in gif.characters"
              :key="character"
              class="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm"
            >
              {{ character }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <GifModal
    v-if="selectedGif"
    :gif="selectedGif"
    :is-open="isModalOpen"
    @close="closeModal"
  />
</template>

<style scoped>
.aspect-video {
  aspect-ratio: 16 / 9;
}
</style> 
