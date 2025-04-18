<script setup lang="ts">
import type { Gif } from '~/types'
import ShareButtons from './ShareButtons.vue'

const props = defineProps<{
  gif: Gif
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const gifUrl = computed(() => `${window.location.origin}/gifs/${props.gif.filename}`)

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
        class="bg-white/95 backdrop-blur-sm rounded-lg max-w-2xl w-full overflow-hidden shadow-lg"
        @click.stop
      >
        <img
          :src="gif.url"
          :alt="gif.quote"
          class="w-full"
        />
        <div class="p-4">
          <p class="text-xl font-medium text-gray-900">{{ gif.quote }}</p>
          <div class="mt-4">
            <p class="text-sm text-gray-500">Personnages présents :</p>
            <div class="flex flex-wrap gap-2 mt-2">
              <span
                v-for="character in gif.characters"
                :key="character"
                class="px-3 py-1 bg-gray-100/80 rounded-full text-sm text-gray-600"
              >
                {{ character }}
              </span>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-sm text-gray-500">Personnages qui parlent :</p>
            <div class="flex flex-wrap gap-2 mt-2">
              <span
                v-for="character in gif.characters_speaking"
                :key="character"
                class="px-3 py-1 bg-gray-200/80 rounded-full text-sm text-gray-700"
              >
                {{ character }}
              </span>
            </div>
          </div>
          <div class="mt-6 border-t pt-4">
            <ShareButtons
              :gif-url="gif.url"
              :quote="gif.quote"
            />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template> 
