<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import type { Gif } from '~~/shared/types'
import ShareButtons from './ShareButtons.vue'
import AppImage from '~/components/base/AppImage.vue'
import LikeButton from '~/components/base/LikeButton.vue'
import { slugify } from '~~/shared/utils/string'
import { Entities } from '~~/shared/types'

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
<TransitionRoot
  appear
  :show="isOpen"
  as="template">
  <Dialog
    as="div"
    class="relative z-50"
    @close="handleClose">
    <TransitionChild
      as="template"
      enter="transition duration-200 ease-out"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="transition duration-150 ease-in"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <div class="fixed inset-0 bg-black/20 backdrop-blur-sm" />
    </TransitionChild>

    <div class="fixed inset-0 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4">
        <TransitionChild
          as="template"
          enter="transition duration-200 ease-out"
          enter-from="transform scale-95 opacity-0"
          enter-to="transform scale-100 opacity-100"
          leave="transition duration-150 ease-in"
          leave-from="transform scale-100 opacity-100"
          leave-to="transform scale-95 opacity-0"
        >
          <DialogPanel
            class="bg-white/95 backdrop-blur-sm rounded-lg max-w-2xl w-full overflow-hidden shadow-lg relative"
          >
            <AppImage
              :src="gif.url"
              :alt="gif.quote"
              format="gif"
              class="w-full transform transition-transform duration-500 ease-out"
            />
            <div class="absolute top-0 right-0 p-2">
              <button
                type="button"
                aria-label="Fermer"
                @click="handleClose">
                <Icon
                  name="heroicons:x-mark"
                  class="w-6 h-6 text-gray-900 dark:text-gray-200"
                />
              </button>
            </div>
            <div class="p-4">
              <div class="flex space-x-2.5 items-center">
                <DialogTitle
                  as="p"
                  class="text-xl font-medium text-gray-900">
                  {{ gif.quote }}
                </DialogTitle>
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
                  <NuxtLink
                    :to="`/gifs/${gif.slug}`"
                    class="px-3 py-1.5 bg-orange-200/80 rounded-xl text-sm text-orange-700 border-[0.25px] border-orange-800/50 dark:bg-orange-800 dark:text-orange-200"
                    prefetch
                  >
                    Voir plus
                  </NuxtLink>
                </div>
              </div>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </div>
  </Dialog>
</TransitionRoot>
</template>
