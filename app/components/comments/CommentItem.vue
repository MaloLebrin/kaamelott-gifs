<template>
<div class="flex gap-4 p-4 bg-white rounded-lg shadow-sm">
  <div>
    <img
      :src="'/characters/unknown.jpg'"
      :alt="comment.profile?.username || 'Utilisateur'"
      class="w-10 h-10 rounded-full"
    >
    <div
      class="flex items-center justify-center w-10 h-10 text-sm font-medium text-white bg-primary-600 rounded-full"
    >
      {{ comment.profile?.username?.charAt(0)?.toUpperCase() || '?' }}
    </div>
  </div>

  <!-- Contenu du commentaire -->
  <div class="flex-1 min-w-0">
    <div class="flex items-center gap-2">
      <span class="text-sm font-medium text-gray-900">
        {{ comment.profile?.username || 'Utilisateur' }}
      </span>
      <span class="text-xs text-gray-500">
        {{ formatDate(comment.createdAt) }}
      </span>
    </div>
    <CommentForm
      v-if="isEditing"
      :comment-id="comment.id"
      :initial-content="comment.content"
      :entity-type="getEntityType(comment) as LikeableEntity"
      is-editing
      @cancel="cancelEdit"
      @success="handleUpdateSuccess"
    />
    <p
      v-else
      class="mt-1 text-sm text-gray-700 whitespace-pre-wrap">
      {{ comment.content }}
    </p>
  </div>

  <div
    v-if="isUserComment && !isEditing"
    class="flex gap-x-2 self-start">
    <button
      aria-label="Modifier le commentaire"
      title="Modifier le commentaire"
      class="cursor-pointer"
      @click="startEdit"
    >
      <Icon
        name="heroicons:pencil"
        class="text-gray-500" />
    </button>
    <button
      aria-label="Supprimer le commentaire"
      title="Supprimer le commentaire"
      class="cursor-pointer"
      @click="handleDeleteComment"
    >
      <Icon
        name="heroicons:trash"
        class="text-red-800" />
    </button>
  </div>
</div>
</template>

<script setup lang="ts">
import type { CommentWithUser } from '~~/shared/types/Comments'
import { formatDate } from '~~/shared/utils/date'
import CommentForm from './CommentForm.vue'
import { getEntityType } from '~~/shared/utils/likes/likeableEntities';
import type { LikeableEntity } from '~~/shared/types/Entities';

const props = withDefaults(defineProps<{
  comment: CommentWithUser
  isUserComment: boolean
}>(), {
  isUserComment: false
})

const emit = defineEmits<{
  (e: 'delete-comment' | 'update-comment'): void
}>()

const isEditing = ref(false)

function startEdit() {
  isEditing.value = true
}

function cancelEdit() {
  isEditing.value = false
}

function handleUpdateSuccess() {
  isEditing.value = false
  emit('update-comment')
}

async function handleDeleteComment() {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
    return
  }

  try {
    await $fetch(`/api/comments/${props.comment.id}`, {
      method: 'DELETE'
    })
    emit('delete-comment')
  } catch (error) {
    console.error('Erreur lors de la suppression du commentaire:', error)
  }
}
</script> 
