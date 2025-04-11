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
  <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    <article
      v-for="gif in gifs"
      :key="gif.slug"
      class="bg-white rounded-[55px] p-1.5 border border-gray-200"
      @click="openModal(gif)"
    >
      <div class="group relative aspect-video rounded-[50px] overflow-hidden bg-gray-900/5 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer min-h-[250px] max-w-400px]">
        <div class="absolute inset-0 overflow-hidden">
          <img
            :src="`/gifs/${gif.filename}`"
            :alt="gif.quote"
            class="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:-translate-y-8"
            loading="lazy"
          />
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div class="absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-500 translate-y-full group-hover:translate-y-0">
            <p class="font-medium text-lg mb-2 text-white">{{ gif.quote }}</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="character in gif.characters"
                :key="character"
                class="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white"
              >
                {{ character }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
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
