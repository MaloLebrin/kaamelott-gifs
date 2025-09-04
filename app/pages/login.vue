<template>
<div class="max-w-2xl mx-auto py-8 flex items-center justify-center">
  <div class="bg-white/70 backdrop-blur-sm rounded-lg shadow-sm p-8 w-full">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Connexion à la Table Ronde</h1>
    <p class="mb-4 text-gray-700">Entrez votre adresse pour recevoir un lien magique d'accès. (Pas de sortilège foireux, promis par Merlin !)</p>
    <LoginForm />
  </div>
</div>
</template>

<script setup lang="ts">
import LoginForm from '~/components/auth/LoginForm.vue';

useSeoMeta({
  title: 'Connexion à la Table Ronde',
  description: 'Connexion à la Table Ronde',
  ogTitle: 'Connexion à la Table Ronde',
  ogDescription: 'Connexion à la Table Ronde',
  ogImage: 'https://kaamelott-gifs.com/og-image.png',
  keywords: 'kaamelott, gifs, alexandre astier, série française, moments cultes, collection',
  author: 'Kaamelott GIFs',
  robots: 'index, follow',
  ogUrl: 'https://kaamelottgifs.fr/login',
  ogType: 'website',
  twitterTitle: 'Connexion à la Table Ronde',
  twitterDescription: 'Connexion à la Table Ronde',
  twitterImage: 'https://kaamelott-gifs.com/og-image.png',
  twitterCard: 'summary_large_image',
  twitterSite: '@kaamelott_gifs',
  twitterCreator: '@kaamelott_gifs',
})
</script>
