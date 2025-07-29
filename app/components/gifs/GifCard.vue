<template>
<article
  class="group rounded-[32px] transition-colors duration-300 cursor-pointer max-w-[400px]"
  :v-posthog-capture="`click_gif_${gif.slug}`"
  @click="handleClick">
  <div class="relative aspect-video rounded-[32px] overflow-hidden">
    <div class="absolute inset-0 overflow-hidden">
      <AppImage
        :src="gif.url"
        :alt="gif.quote"
        format="gif"
        class="w-full h-full object-cover transform transition-transform duration-500 ease-out" />
    </div>

    <!-- Informations -->
    <div class="absolute inset-0 grid grid-cols-2 items-end px-3 py-6">
      <!-- Titre et sous-titre -->
      <div class="space-y-1 transform transition-transform duration-500">
        <h3 class="font-medium text-lg text-white transition-colors duration-300 pb-3">
          {{ gif.characters[0] }}
        </h3>
      </div>

      <!-- Bouton -->
      <div
        class="mt-4 transform transition-all duration-500 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 pt-2">
        <div class="flex flex-wrap justify-end gap-2">
          <BaseTag
            v-for="character in gif.characters"
            :key="character"
            :label="character" />
        </div>
      </div>
    </div>
  </div>
</article>
</template>

<script lang="ts" setup>
import type { Gif } from '~~/shared/types'
import AppImage from '~/components/base/AppImage.vue'

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
