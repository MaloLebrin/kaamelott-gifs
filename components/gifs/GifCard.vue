<template>
  <article
    class="bg-white rounded-[55px] p-1.5 border border-gray-200 min-h-[250px] max-w-[400px]"
    @click="handleClick"
  >
    <div
      class="group relative aspect-video rounded-[50px] overflow-hidden bg-gray-900/5 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      <div class="absolute inset-0 overflow-hidden">
        <img :src="`/gifs/${gif.filename}`" :alt="gif.quote"
          class="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:-translate-y-8"
          loading="lazy" />
      </div>
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
        <div
          class="absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-500 translate-y-full group-hover:translate-y-0">
          <p class="font-medium text-lg mb-2 text-white">{{ gif.quote }}</p>
          <div class="flex flex-wrap gap-2">
            <span v-for="character in gif.characters" :key="character"
              class="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white">
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
