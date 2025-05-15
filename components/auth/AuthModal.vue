<template>
<Modal
  :is-open="uiStore.isModalOpen(ModalNames.AUTH_MODAL)"
  title="Connexion"
  @close="uiStore.closeModal()"
>
  <div class="flex flex-col gap-4">
    <div
      v-if="error"
      class="rounded-lg bg-red-50 p-3 text-sm text-red-600">
      {{ error }}
    </div>

    <form
      class="flex flex-col gap-4"
      @submit.prevent="handleSubmit">
      <div class="flex flex-col gap-2">
        <label
          for="email"
          class="text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          class="rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="votre@email.com"
        >
      </div>

      <div class="flex flex-col gap-2">
        <label
          for="password"
          class="text-sm font-medium text-gray-700">Mot de passe</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          minlength="6"
          class="rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="••••••••"
        >
      </div>

      <div class="flex flex-col gap-3">
        <button
          type="submit"
          :disabled="isLoading"
          class="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon
            v-if="isLoading"
            name="ph:spinner-gap"
            class="animate-spin text-xl" />
          <span>{{ isSignUp ? 'Créer un compte' : 'Se connecter' }}</span>
        </button>

        <button
          type="button"
          class="text-sm text-gray-600 hover:text-gray-900"
          @click="isSignUp = !isSignUp"
        >
          {{ isSignUp ? 'Déjà un compte ? Se connecter' : 'Pas de compte ? S\'inscrire' }}
        </button>
      </div>
    </form>
  </div>
</Modal>
</template>

<script setup lang="ts">
import { useUiStore } from '~/stores/uiStore'
import { ModalNames } from '~/stores/uiStore/state'
import { useSupabaseClient } from '#imports'

const uiStore = useUiStore()
const client = useSupabaseClient()

const email = ref('')
const password = ref('')
const error = ref<string | null>(null)
const isLoading = ref(false)
const isSignUp = ref(false)

const handleSubmit = async () => {
  error.value = null
  isLoading.value = true

  try {
    if (isSignUp.value) {
      const { error: signUpError } = await client.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
          emailRedirectTo: uiStore.authRedirectUrl || window.location.href
        }
      })

      if (signUpError) throw signUpError

      // Afficher un message de confirmation
      error.value = 'Un email de confirmation vous a été envoyé.'
      email.value = ''
      password.value = ''
    } else {
      const { error: signInError } = await client.auth.signInWithPassword({
        email: email.value,
        password: password.value
      })

      if (signInError) throw signInError

      // Fermer la modale après une connexion réussie
      uiStore.closeModal()
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Une erreur est survenue'
  } finally {
    isLoading.value = false
  }
}
</script> 
