<script setup lang="ts">
import type { Gif } from '~/types'
import ShareButtons from './ShareButtons.vue'
import AppImage from '~/components/base/AppImage.vue'
import LikeButton from '~/components/base/LikeButton.vue'
import { slugify } from '~/shared/utils/string'
import { Entities } from '~/types'

defineProps<{
  gif: Gif
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const handleClose = () => {
  emit('close')
}
</script>

<template>
<Transition
  enter-active-class="transition duration-200 ease-out"
  enter-from-class="transform scale-95 opacity-0"
  enter-to-class="transform scale-100 opacity-100"
  leave-active-class="transition duration-150 ease-in"
  leave-from-class="transform scale-100 opacity-100"
  leave-to-class="transform scale-95 opacity-0"
>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    @click="handleClose"
  >
    <div
      class="bg-white/95 backdrop-blur-sm rounded-lg max-w-2xl w-full overflow-hidden shadow-lg relative"
      @click.stop
    >
      <AppImage
        :src="gif.url"
        :alt="gif.quote"
        format="gif"
        class="w-full transform transition-transform duration-500 ease-out"
      />
      <div class="absolute top-0 right-0 p-2">
        <button @click="handleClose">
          <Icon
            name="heroicons:x-mark"
            class="w-6 h-6 text-gray-900 dark:text-gray-200"
          />
        </button>
      </div>
      <div class="p-4">
        <div class="flex space-x-2.5 items-center">
          <p class="text-xl font-medium text-gray-900">{{ gif.quote }}</p>
          <LikeButton
            :entity-id="gif.id"
            :entity-type="Entities.GIF"
          />
        </div>
        <div class="mt-4">
          <p class="text-sm text-gray-500">Personnages présents :</p>
          <div class="flex flex-wrap gap-2 mt-2">
            <NuxtLink
              v-for="character in gif.characters"
              :key="character"
              :to="`/personnages/${slugify(character)}`"
              class="px-3 py-1 bg-gray-200/80 rounded-full text-sm text-gray-600"
              :v-posthog-capture="`click_personnage_${character}`"
              prefetch
            >
              {{ character }}
            </NuxtLink>
          </div>
        </div>
        <div class="mt-4">
          <p class="text-sm text-gray-500">Personnages qui parlent :</p>
          <div class="flex flex-wrap gap-2 mt-2">
            <NuxtLink
              v-for="character in gif.characters_speaking"
              :key="character"
              :to="`/personnages/${slugify(character)}`"
              class="px-3 py-1 bg-gray-200/80 rounded-full text-sm text-gray-700 border-[0.25px] border-gray-800/50 dark:bg-gray-800 dark:text-gray-200"
              :v-posthog-capture="`click_personnage_${character}`"
              prefetch
            >
              {{ character }}
            </NuxtLink>
          </div>
        </div>
        <div class="mt-6 border-t pt-4">
          <div class="flex items-center justify-between">
            <ShareButtons
              :gif-url="gif.url"
              :quote="gif.quote"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</Transition>
</template> 
