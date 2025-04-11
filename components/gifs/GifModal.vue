<script setup lang="ts">
import type { Gif } from '~/types'

const props = defineProps<{
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
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
      @click="handleClose"
    >
      <div
        class="bg-gray-800 rounded-lg max-w-2xl w-full overflow-hidden shadow-2xl"
        @click.stop
      >
        <img
          :src="`/gifs/${gif.filename}`"
          :alt="gif.quote"
          class="w-full"
        />
        <div class="p-4">
          <p class="text-xl font-medium text-gray-100">{{ gif.quote }}</p>
          <div class="mt-4">
            <p class="text-sm text-gray-400">Personnages présents :</p>
            <div class="flex flex-wrap gap-2 mt-2">
              <span
                v-for="character in gif.characters"
                :key="character"
                class="px-3 py-1 bg-gray-700 rounded-full text-sm text-amber-400"
              >
                {{ character }}
              </span>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-sm text-gray-400">Personnages qui parlent :</p>
            <div class="flex flex-wrap gap-2 mt-2">
              <span
                v-for="character in gif.characters_speaking"
                :key="character"
                class="px-3 py-1 bg-amber-900 rounded-full text-sm text-amber-300"
              >
                {{ character }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template> 
