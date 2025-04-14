<script setup lang="ts">
const { $clientPosthog } = useNuxtApp()
// Meta tags optimisés
useSeoMeta({
  title: 'À propos - Kaamelott GIFs | Collection de GIFs de la série Kaamelott',
  ogTitle: 'À propos - Kaamelott GIFs | Collection de GIFs de la série Kaamelott',
  description: 'Découvrez l\'histoire du projet Kaamelott GIFs, une collection de GIFs issus de la série culte Kaamelott. Créé par des fans pour des fans.',
  ogDescription: 'Découvrez l\'histoire du projet Kaamelott GIFs, une collection de GIFs issus de la série culte Kaamelott. Créé par des fans pour des fans.',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image',
  keywords: 'kaamelott, gifs, alexandre astier, série française, moments cultes, collection',
  author: 'Kaamelott GIFs',
  robots: 'index, follow'
})

// Structured Data détaillés
useHead({
  title: 'À propos - Kaamelott GIFs',
  meta: [
    { name: 'description', content: 'Découvrez l\'histoire du projet Kaamelott GIFs, une collection de GIFs issus de la série culte Kaamelott.' },
    { name: 'keywords', content: 'kaamelott, gifs, alexandre astier, série française, moments cultes, collection' },
    { name: 'author', content: 'Kaamelott GIFs' },
    { name: 'robots', content: 'index, follow' }
  ]
})

onMounted(() => {
  if ($clientPosthog) {
    $clientPosthog.capture('page_view', {
      page: 'about'
    })
  }
})
</script>

<template>
  <main class="flex-1">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">À propos de Kaamelott GIFs</h1>
      
      <div class="prose prose-lg max-w-none">
        <p>
          Kaamelott GIFs est un projet passionné dédié à la célèbre série française Kaamelott. 
          Notre mission est de rassembler et partager les meilleurs moments de la série sous forme de GIFs.
        </p>

        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Notre histoire</h2>
        <p>
          Créé par des fans pour des fans, ce projet est né de l'amour pour la série et de la volonté 
          de partager ces moments cultes avec le plus grand nombre.
        </p>

        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Les GIFs</h2>
        <p>
          Tous les GIFs présents sur ce site sont issus de la série Kaamelott, créée par Alexandre Astier.
          Nous nous efforçons de maintenir une collection de haute qualité, tout en respectant les droits d'auteur.
        </p>

        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Crédits</h2>
        <ul>
          <li>Création originale : Alexandre Astier</li>
          <li>Production : M6 / CALT</li>
          <li>Musique : Alexandre Astier</li>
        </ul>

        <div class="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 class="text-xl font-bold text-gray-900 mb-4">Mentions légales</h3>
          <p class="text-sm text-gray-600">
            Ce site est un projet non officiel et à but non lucratif. Tous les droits de la série Kaamelott 
            appartiennent à leurs propriétaires respectifs. Les GIFs sont utilisés dans le cadre du fair use 
            pour des fins éducatives et de divertissement.
          </p>
        </div>
      </div>
    </div>
  </main>
</template> 
