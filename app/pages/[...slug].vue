<template>
<div class="h-full flex items-center justify-center px-4 relative">
  <div class="max-w-2xl w-full my-auto">
    <div class="bg-gray-50 backdrop-blur-sm rounded-[32px] overflow-hidden shadow-lg mt-10 md:mt-24 lg:mt-32">
      <div class="p-8">
        <div class="text-center mb-8">
          <h1 class="text-8xl font-bold text-gray-900 mb-4">404</h1>
          <div class="text-2xl font-medium text-gray-700">⚔️ Page Non Trouvée ⚔️</div>
        </div>

        <div class="bg-gray-50 rounded-lg p-6 mb-8">
          <p class="text-lg text-gray-700 leading-relaxed">
            "Excusez-moi ! Est-ce qu'entre deux encouragements pour débiles, il y aurait moyen de rappeler que pour
            éviter de creuser au flan il suffirait de cartographier les galeries ?"
            <span class="block text-gray-500 text-sm mt-3 italic">- Merlin</span>
          </p>
        </div>

        <div class="flex justify-center">
          <NuxtLink
            to="/"
            class="bg-gray-800 text-white px-3 py-2 rounded-lg duration-300">
            🏰 Retour à Kaamelott
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const seoTitle = composeSeoTitle('Page Non Trouvée')
const seoDescription = composeSeoDescription('Cette page est aussi introuvable que le Graal. Retournez à Kaamelott pour continuer votre quête !')

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogDescription: seoDescription,
  ogImage: '/fondKBg.webp',
  keywords: 'kaamelott, gifs, alexandre astier, série française, moments cultes, collection',
  author: 'Kaamelott GIFs',
  robots: 'index, follow',
  ogUrl: 'https://kaamelottgifs.fr/404',
  ogType: 'website',
})
</script>
