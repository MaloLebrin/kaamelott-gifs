<template>
<div class="flex gap-4 p-4 bg-white rounded-lg shadow-sm">
  <div>
    <img
      :src="comment.user?.avatar || '/characters/unknown.jpg'"
      :alt="comment.user?.name || 'Utilisateur'"
      class="w-10 h-10 rounded-full"
    >
    <div
      class="flex items-center justify-center w-10 h-10 text-sm font-medium text-white bg-primary-600 rounded-full"
    >
      {{ comment.user?.name?.charAt(0)?.toUpperCase() || '?' }}
    </div>
  </div>

  <!-- Contenu du commentaire -->
  <div class="flex-1 min-w-0">
    <div class="flex items-center gap-2">
      <span class="text-sm font-medium text-gray-900">
        {{ comment.user?.name || 'Utilisateur' }}
      </span>
      <span class="text-xs text-gray-500">
        {{ formatDate(comment.createdAt) }}
      </span>
    </div>
    <p class="mt-1 text-sm text-gray-700 whitespace-pre-wrap">
      {{ comment.content }}
    </p>
  </div>
</div>
</template>

<script setup lang="ts">
import type { CommentWithUser } from '~/types/Comments'
import { formatDate } from '~/shared/utils/date'

defineProps<{
  comment: CommentWithUser
}>()
</script> 
