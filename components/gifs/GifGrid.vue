<script setup lang="ts">
import type { Gif } from '~/types'
import GifModal from './GifModal.vue'
import GifCard from './GifCard.vue'
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
  <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    <GifCard
      v-for="gif in gifs"
      :key="gif.slug"
      :gif="gif"
      @click="openModal(gif)"
    />
  </section>

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
