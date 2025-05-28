<template>
<form
  v-if="user"
  class="space-y-2"
  @submit.prevent="handleSubmit">
  <label
    :for="textareaId"
    class="sr-only">
    {{ isEditing ? 'Modifier votre commentaire...' : 'Écrivez votre commentaire...' }}
  </label>
  <textarea
    :id="textareaId"
    v-model="content"
    :disabled="isSubmitting || isContentFull"
    :maxlength="1000"
    :aria-invalid="isContentFull"
    :aria-describedby="isContentFull ? 'content-error' : undefined"
    :aria-required="true"
    :aria-label="isContentFull ? 'Commentaire trop long' : (isEditing ? 'Modifier votre commentaire' : 'Écrivez votre commentaire')"
    :placeholder="isEditing ? 'Modifier votre commentaire...' : 'Écrivez votre commentaire...'"
    class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none invalid:border-red-500"
    rows="3"
  />
  <div class="flex items-center justify-between">
    <span
      class="text-xs text-gray-500"
      :class="{ 'text-red-500': isContentFull }">
      {{ content.length }} / 1000
    </span>
    <div class="flex gap-2">
      <button
        v-if="isEditing"
        type="button"
        :disabled="isSubmitting"
        class="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
        @click="handleCancel"
      >
        Annuler
      </button>
      <button
        type="submit"
        :title="isContentFull ? 'Commentaire trop long' : (isEditing ? 'Enregistrer' : 'Publier')"
        :aria-disabled="isSubmitButtonDisabled"
        :disabled="isSubmitButtonDisabled"
        class="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="isSubmitting">
          <Icon
            name="heroicons:arrow-path"
            class="w-5 h-5 animate-spin inline-block mr-2" />
          {{ isEditing ? 'Enregistrement...' : 'Publication...' }}
        </span>
        <span v-else>{{ isEditing ? 'Enregistrer' : 'Publier' }}</span>
      </button>
    </div>
  </div>
</form>
</template>

<script setup lang="ts">
import type { LikeableEntity } from '~/types/Entities'
import { useCommentForm } from '~/composables/useCommentForm'

const props = withDefaults(defineProps<{
  entityType: LikeableEntity
  entityId?: string | number
  commentId?: number
  initialContent?: string
  isEditing?: boolean
}>(), {
  isEditing: false,
  entityId: undefined,
  commentId: undefined,
  initialContent: undefined
})

const emit = defineEmits<{
  (e: 'cancel' | 'success'): void
}>()

const user = useSupabaseUser()
const textareaId = computed(() => `comment-textarea-${props.commentId || 'new'}`)

const {
  content,
  isSubmitting,
  handleSubmit,
  reset,
  isContentFull,
  isSubmitButtonDisabled
} = useCommentForm({
  entityType: props.entityType,
  entityId: props.entityId,
  commentId: props.commentId,
  initialContent: props.initialContent,
  onSuccess: () => emit('success')
})

function handleCancel() {
  reset()
  emit('cancel')
}
</script>
