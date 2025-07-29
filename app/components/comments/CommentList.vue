<template>
<div class="space-y-4">
  <!-- Formulaire de commentaire -->
  <CommentForm
    :entity-type="entityType"
    :entity-id="entityId"
    @success="loadComments"
  />

  <!-- Liste des commentaires -->
  <div
    class="space-y-4">
    <CommentItemServer
      v-if="isLoading"
    />
    <CommentItem
      v-for="comment in comments"
      v-else
      :key="comment.id"
      :is-user-comment="comment.userId === user?.id"
      :comment="comment"
      @delete-comment="loadComments"
      @update-comment="loadComments"
    />
  </div>

  <!-- État vide -->
  <div
    v-if="comments.length === 0 && !isLoading"
    class="text-center py-8 backdrop-blur-lg rounded-lg p-4 bg-white/90 dark:bg-gray-800">
    <p class="text-gray-500 dark:text-gray-400">
      Aucun commentaire pour le moment
    </p>
  </div>

  <!-- Message pour les utilisateurs non connectés -->
  <div
    v-if="!user"
    class="text-center py-8 backdrop-blur-lg rounded-lg p-4 bg-white/90 dark:bg-gray-800">
    <p class="text-gray-500 dark:text-gray-400 mb-4">
      Connectez-vous pour commenter
    </p>
    <button
      class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      @click="uiStore.openModal(ModalNames.AUTH_MODAL, requestURL?.toString())"
    >
      Se connecter
    </button>
  </div>
</div>
</template>

<script setup lang="ts">
import type { LikeableEntity } from '~~/shared/types/Entities'
import CommentItem from './CommentItem.vue'
import CommentItemServer from './CommentItemServer.server.vue'
import CommentForm from './CommentForm.vue'
import { useCommentsList } from '~/composables/useCommentsList'
import { useUiStore } from '~/stores/uiStore'
import { ModalNames } from '~/stores/uiStore/state'

const props = defineProps<{
  entityType: LikeableEntity
  entityId: string | number
}>()

const uiStore = useUiStore()
const user = useSupabaseUser()
const requestURL = useRequestURL()

const {
  comments,
  isLoading,
  loadComments,
} = useCommentsList({
  entityType: props.entityType,
  entityId: props.entityId
})
</script> 
