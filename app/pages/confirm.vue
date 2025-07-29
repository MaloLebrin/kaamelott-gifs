<template>
<div class="max-w-2xl mx-auto py-8 flex items-center justify-center">
  <div class="bg-white/70 backdrop-blur-sm rounded-lg shadow-sm p-8 w-full flex flex-col items-center">
    <h1 class="text-2xl font-bold text-gray-900 mb-4">Connexion en cours…</h1>
    <BaseLoader class="mb-4" />
    <p class="text-gray-700 text-center">Patientez, Merlin vérifie votre identité magique.<br>Vous allez être redirigé automatiquement.</p>
  </div>
</div>
</template>

<script setup lang="ts">
import BaseLoader from '~/components/base/BaseLoader.vue'

const user = useSupabaseUser()
const redirectInfo = useSupabaseCookieRedirect()

watch(user, () => {
  if (user.value) {
    const path = redirectInfo.pluck()
    return navigateTo(path || '/gifs/creer')
  }
}, { immediate: true })

useSeoMeta({
  title: 'Connexion en cours…',
  description: 'Connexion en cours…',
  ogTitle: 'Connexion en cours…',
  ogDescription: 'Connexion en cours…',
  ogImage: 'https://kaamelott-gifs.com/og-image.png'
})
</script>
