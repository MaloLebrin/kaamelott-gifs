<template>
<NuxtLayout>
  <div class="h-full flex items-center justify-center px-4 relative">
    <div class="max-w-2xl w-full my-auto">
      <div class="bg-gray-50 backdrop-blur-sm rounded-[32px] overflow-hidden shadow-lg mt-10 md:mt-24 lg:mt-32">
        <div class="p-8">
          <div class="text-center mb-8">
            <h1 class="text-8xl font-bold text-gray-900 mb-4">
              {{ statusCode }}
            </h1>
            <div class="text-2xl font-medium text-gray-700">
              ⚔️ {{ title }} ⚔️
            </div>
          </div>

          <div class="bg-gray-50 rounded-lg p-6 mb-8">
            <p class="text-lg text-gray-700 leading-relaxed">
              "{{ quote }}"
              <span class="block text-gray-500 text-sm mt-3 italic">- {{ quoteAuthor }}</span>
            </p>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              @click="handleRetry"
            >
              🔄 Réessayer
            </button>
            <NuxtLink
              to="/"
              class="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300"
              @click="handleClear"
            >
              🏰 Retour à Kaamelott
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const statusCode = computed(() => props.error?.statusCode || 500)
const isNotFound = computed(() => statusCode.value === 404)

const title = computed(() =>
  isNotFound.value ? 'Page Non Trouvée' : 'Une Erreur est Survenue'
)

// Répliques thématiques Kaamelott selon le type d'erreur.
const quote = computed(() =>
  isNotFound.value
    ? "Excusez-moi ! Est-ce qu'entre deux encouragements pour débiles, il y aurait moyen de rappeler que pour éviter de creuser au flan il suffirait de cartographier les galeries ?"
    : "C'est pas faux."
)
const quoteAuthor = computed(() => (isNotFound.value ? 'Merlin' : 'Perceval'))

useSeoMeta({
  title: computed(() => composeSeoTitle(title.value)),
  robots: 'noindex, follow'
})

const handleClear = () => clearError({ redirect: '/' })

// « Réessayer » : nettoie l'état d'erreur puis recharge la route courante.
const handleRetry = () => {
  const path = useRoute().fullPath
  clearError({ redirect: path })
}
</script>
