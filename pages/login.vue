<template>
  <div class="max-w-2xl mx-auto py-8 flex items-center justify-center">
    <div class="bg-white/70 backdrop-blur-sm rounded-lg shadow-sm p-8 w-full">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">Connexion à la Table Ronde</h1>
      <p class="mb-4 text-gray-700">Entrez votre adresse pour recevoir un lien magique d'accès. (Pas de sortilège foireux, promis par Merlin !)</p>
      <form @submit.prevent="signInWithOtp" class="space-y-6">
        <BaseInput
          v-model="email"
          label="Adresse e-mail"
          id="email"
          type="email"
          required
          placeholder="perceval@kaamelott.fr"
        />
        <button
          type="submit"
          :disabled="loading"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-200 cursor-pointer w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <BaseLoader v-if="loading" class="mr-2" />
          <span v-if="!loading">Recevoir le lien magique</span>
          <span v-else>Envoi...</span>
        </button>
      </form>
      <div v-if="error" class="mt-4 text-red-600 text-sm">{{ error }}</div>
      <div v-if="success" class="mt-4 text-green-700 text-sm">Lien envoyé ! Vérifiez votre boîte mail (ou vos spams, on ne sait jamais avec Merlin).</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseInput from '~/components/base/BaseInput.vue'
import BaseLoader from '~/components/base/BaseLoader.vue'
const supabase = useSupabaseClient()
const email = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)
let successTimeout: ReturnType<typeof setTimeout> | null = null

const signInWithOtp = async () => {
  error.value = ''
  success.value = false
  if (successTimeout) {
    clearTimeout(successTimeout)
    successTimeout = null
  }
  loading.value = true
  const { error: supaError } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: 'http://localhost:3000/confirm',
    }
  })
  loading.value = false
  if (supaError) {
    error.value = supaError.message || 'Erreur inconnue, même Merlin ne comprend pas.'
  } else {
    success.value = true
    successTimeout = setTimeout(() => {
      success.value = false
      successTimeout = null
    }, 5000)
  }
}
</script>
