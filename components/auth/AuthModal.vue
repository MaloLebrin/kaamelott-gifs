<template>
<TransitionRoot
  appear
  :show="uiStore.isModalOpen(ModalNames.AUTH_MODAL)"
  as="template">
  <Dialog
    as="div"
    class="relative z-10"
    @close="uiStore.closeModal()">
    <TransitionChild
      as="template"
      enter="duration-300 ease-out"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="duration-200 ease-in"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <div class="fixed inset-0 bg-black/25" />
    </TransitionChild>

    <div class="fixed inset-0 overflow-y-auto">
      <div
        class="flex min-h-full items-center justify-center p-4 text-center"
      >
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <DialogPanel
            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
          >
            <DialogTitle
              as="h3"
              class="text-lg font-medium leading-6 text-gray-900"
            >
              {{ isSignUp ? 'Inscription' : 'Connexion' }}
            </DialogTitle>
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
                  <BaseInput
                    id="email"
                    v-model="email"
                    label="Adresse e-mail"
                    type="email"
                    required
                    placeholder="perceval@kaamelott.fr"
                  />
                </div>

                <div class="flex flex-col gap-3">
                  <button
                    type="submit"
                    :disabled="isLoading"
                    class="flex items-center justify-center gap-2 rounded-lg bg-amber-600 hover:bg-amber-700 px-4 py-2 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Icon
                      v-if="isLoading"
                      name="ph:spinner-gap"
                      class="animate-spin text-xl" />
                    <span>{{ isSignUp ? 'Créer un compte' : 'Se connecter' }}</span>
                  </button>

                  <button
                    type="button"
                    class="text-sm text-gray-600 hover:text-gray-900 hover:underline cursor-pointer"
                    @click="isSignUp = !isSignUp"
                  >
                    {{ isSignUp ? 'Déjà un compte ? Se connecter' : 'Pas de compte ? S\'inscrire' }}
                  </button>
                </div>
              </form>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </div>
  </Dialog>
</TransitionRoot>
</template>

<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { useUiStore } from '~/stores/uiStore'
import { ModalNames } from '~/stores/uiStore/state'
import { useSupabaseClient } from '#imports'

const uiStore = useUiStore() // Store pour gérer l'état de l'UI (modales, loading, etc.)
const client = useSupabaseClient() // Client Supabase pour l'authentification

// État local du composant
const email = ref('') // Email saisi par l'utilisateur
const password = ref('') // Mot de passe saisi par l'utilisateur
const error = ref<string | null>(null) // Message d'erreur à afficher
const isLoading = ref(false) // État de chargement pendant les requêtes
const isSignUp = ref(false) // Mode inscription (true) ou connexion (false)

/**
 * Gère la soumission du formulaire (connexion ou inscription)
 * Cette fonction est appelée lorsque l'utilisateur clique sur le bouton de soumission
 */
const handleSubmit = async () => {
  // Réinitialisation des états
  error.value = null
  isLoading.value = true

  try {
    if (isSignUp.value) {
      // Mode inscription
      const { error: signUpError } = await client.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
          // URL de redirection après confirmation de l'email
          // Utilise l'URL de redirection stockée dans le store ou l'URL courante
          emailRedirectTo: uiStore.authRedirectUrl || window.location.href
        }
      })

      if (signUpError) throw signUpError

      // Succès de l'inscription
      // Affiche un message de confirmation et réinitialise le formulaire
      error.value = 'Un email de confirmation vous a été envoyé.'
      email.value = ''
      password.value = ''
    } else {
      // Mode connexion
      const { error: signInError } = await client.auth.signInWithPassword({
        email: email.value,
        password: password.value
      })

      if (signInError) throw signInError

      // Succès de la connexion
      // Ferme la modale pour laisser l'utilisateur accéder à l'application
      uiStore.closeModal()
    }
  } catch (e) {
    // Gestion des erreurs
    // Affiche le message d'erreur de Supabase ou un message par défaut
    error.value = e instanceof Error ? e.message : 'Une erreur est survenue'
  } finally {
    // Réinitialisation de l'état de chargement dans tous les cas
    isLoading.value = false
  }
}
</script> 
