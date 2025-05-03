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
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-200 cursor-pointer w-full justify-center"
        >
          Recevoir le lien magique
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseInput from '~/components/base/BaseInput.vue'
const supabase = useSupabaseClient()
const email = ref('')

const signInWithOtp = async () => {
  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: 'http://localhost:3000/confirm',
    }
  })
  if (error) console.log(error)
}
</script>
