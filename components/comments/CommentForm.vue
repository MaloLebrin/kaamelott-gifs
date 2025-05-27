<template>
<form
  v-if="user"
  @submit.prevent="handleSubmit">
  <label
    for="content"
    class="sr-only">
    Écrivez votre commentaire...
  </label>
  <textarea
    id="content"
    v-model="content"
    :disabled="isSubmitting || isContentFull"
    :maxlength="1000"
    :aria-invalid="isContentFull"
    :aria-describedby="isContentFull ? 'content-error' : undefined"
    :aria-required="true"
    :aria-label="isContentFull ? 'Commentaire trop long' : 'Écrivez votre commentaire'"
    placeholder="Écrivez votre commentaire..."
    class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none invalid:border-red-500"
    rows="3"
  />
  <span
    class="text-xs text-gray-500"
    :class="{ 'text-red-500': isContentFull }">
    {{ content.length }} / 1000
  </span>
  <div class="flex justify-end">
    <button
      type="submit"
      :title="isContentFull ? 'Commentaire trop long' : 'Publier'"
      :aria-disabled="isSubmitButtonDisabled"
      :disabled="isSubmitButtonDisabled"
      class="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
</template>

<script lang="ts" setup>
import type { LikeableEntity } from '~/types/Entities';

const props = defineProps<{
  entityType: LikeableEntity
  entityId: string | number
}>()
const user = useSupabaseUser()

const {
  content,
  isSubmitting,
  handleSubmit,
  isContentFull,
  isLoading,
} = useCommentsList({
  entityType: props.entityType,
  entityId: props.entityId
})

const isSubmitButtonDisabled = computed(() => isSubmitting.value || !content.value.trim() || isContentFull.value || isLoading.value)
</script>
