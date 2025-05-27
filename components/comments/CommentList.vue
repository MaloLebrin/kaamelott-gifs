<template>
<div class="space-y-4">
  <!-- Formulaire de commentaire -->
  <form
    v-if="user"
    class="space-y-4"
    @submit.prevent="handleSubmit">
    <textarea
      v-model="content"
      :disabled="isSubmitting"
      placeholder="Écrivez votre commentaire..."
      class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
      rows="3"
      required
    />
    <div class="flex justify-end">
      <button
        type="submit"
        :disabled="isSubmitting || !content.trim()"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="isSubmitting">
          <Icon
            name="heroicons:arrow-path"
            class="w-5 h-5 animate-spin inline-block mr-2" />
          Publication...
        </span>
        <span v-else>Publier</span>
      </button>
    </div>
  </form>

  <!-- Liste des commentaires -->
  <div
    v-if="comments.length > 0"
    class="space-y-4">
    <CommentItem
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment" />
  </div>

  <!-- État vide -->
  <div
    v-else-if="user"
    class="text-center py-8 backdrop-blur-lg rounded-lg p-4 bg-white/90 dark:bg-gray-800">
    <p class="text-gray-500 dark:text-gray-400">
      Aucun commentaire pour le moment
    </p>
  </div>

  <!-- Message pour les utilisateurs non connectés -->
  <div
    v-else
    class="text-center py-8 backdrop-blur-lg rounded-lg p-4 bg-white/90 dark:bg-gray-800">
    <p class="text-gray-500 dark:text-gray-400 mb-4">
      Connectez-vous pour commenter
    </p>
    <button
      class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      @click="uiStore.openModal(ModalNames.AUTH_MODAL, requestURL.toString())"
    >
      Se connecter
    </button>
  </div>
</div>
</template>

<script setup lang="ts">
import type { LikeableEntity } from '~/types/Entities'
import CommentItem from './CommentItem.vue'
import { useCommentsList } from '~/composables/useCommentsList'
import { useUiStore } from '~/stores/uiStore'
import { ModalNames } from '~/stores/uiStore/state'

const props = defineProps<{
  entityType: LikeableEntity
  entityId: string | number
}>()

const user = useSupabaseUser()
const uiStore = useUiStore()
const requestURL = useRequestURL()

const {
  comments,
  content,
  isSubmitting,
  handleSubmit
} = useCommentsList({
  entityType: props.entityType,
  entityId: props.entityId
})
</script> 
