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
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
    <div
      v-for="gif in gifs"
      :key="gif.slug"
      class="bg-white/90 backdrop-blur-sm rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer hover:bg-white"
      @click="openModal(gif)"
    >
      <img
        :src="`/gifs/${gif.filename}`"
        :alt="gif.quote"
        class="w-full h-48 object-cover"
        loading="lazy"
      />
      <div class="p-4">
        <p class="text-gray-900 font-medium">{{ gif.quote }}</p>
        <div class="mt-2 flex flex-wrap gap-2">
          <span
            v-for="character in gif.characters"
            :key="character"
            class="px-2 py-1 bg-gray-100/80 rounded-full text-sm text-gray-600"
          >
            {{ character }}
          </span>
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
