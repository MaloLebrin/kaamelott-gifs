<!--
@component LoginForm
@description Formulaire de connexion avec authentification par email
@prop {string} [redirectTo='http://localhost:3000/confirm'] - URL de redirection après confirmation
@event {boolean} success - Émis lorsque le lien est envoyé avec succès
@event {string} error - Émis en cas d'erreur avec le message d'erreur
-->
<template>
<form
  class="space-y-6"
  @submit.prevent="signInWithOtp"
>
  <BaseInput
    id="email"
    v-model="email"
    label="Adresse e-mail"
    type="email"
    required
    placeholder="perceval@kaamelott.fr"
  />
  <button
    type="submit"
    :disabled="loading"
    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-200 cursor-pointer w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
  >
    <BaseLoader
      v-if="loading"
      class="mr-2" />
    <span v-if="!loading">Recevoir le lien magique</span>
    <span v-else>Envoi...</span>
  </button>
</form>
<div
  v-if="error"
  class="mt-4 text-red-600 text-sm">{{ error }}</div>
<div
  v-if="success"
  class="mt-4 text-green-700 text-sm">Lien envoyé ! Vérifiez votre boîte mail (ou vos spams, on ne sait jamais avec Merlin).</div>
</template>

<script setup lang="ts">
import BaseInput from '~/components/base/BaseInput.vue'
import BaseLoader from '~/components/base/BaseLoader.vue'

interface Props {
  redirectTo?: string
}

const props = withDefaults(defineProps<Props>(), {
  redirectTo: `${process.env.NUXT_PUBLIC_SITE_URL}/confirm`
})

const emit = defineEmits<{
  (e: 'success'): void
  (e: 'error', message: string): void
}>()

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
      emailRedirectTo: props.redirectTo,
    }
  })

  loading.value = false
  if (supaError) {
    if (supaError.message === 'Signups not allowed for this instance') {
      error.value = 'Les inscriptions sont temporairement fermées. Veuillez réessayer plus tard.'
    } else {
      error.value = supaError.message || 'Erreur inconnue, même Merlin ne comprend pas.'
    }
    emit('error', error.value)
  } else {
    success.value = true
    emit('success')
    successTimeout = setTimeout(() => {
      success.value = false
      successTimeout = null
    }, 5000)
  }
}
</script> 
