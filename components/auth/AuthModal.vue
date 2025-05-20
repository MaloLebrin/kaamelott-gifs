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
              class="text-lg font-medium leading-6 text-gray-900 mb-4"
            >
              Connexion à la Table Ronde
            </DialogTitle>
            <p class="mb-4 text-gray-700">Entrez votre adresse pour recevoir un lien magique d'accès. (Pas de sortilège foireux, promis par Merlin !)</p>
            <LoginForm
              :redirect-to="uiStore.authRedirectUrl || route.fullPath"
              @success="handleSuccess"
              @error="handleError"
            />
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
import LoginForm from './LoginForm.vue'
import { useToast } from '~/composables/useToast'
import { useRoute } from 'vue-router'

const uiStore = useUiStore()
const { success: showSuccessToast, denied: showErrorToast } = useToast()
const route = useRoute()

const handleSuccess = () => {
  showSuccessToast('Lien magique envoyé ! Vérifiez votre boîte mail.')
  // On ne ferme pas la modale pour que l'utilisateur puisse voir le message de succès
}

const handleError = (errorMessage: string) => {
  showErrorToast(errorMessage)
}
</script> 
