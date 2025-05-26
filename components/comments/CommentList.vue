<template>
<div class="space-y-6">
  <!-- Formulaire de création -->
  <form
    v-if="user"
    class="space-y-4"
    @submit.prevent="handleSubmit">
    <div>
      <label
        for="comment"
        class="sr-only">Votre commentaire</label>
      <textarea
        id="comment"
        v-model="content"
        rows="3"
        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 px-1.5"
        placeholder="Écrivez votre commentaire..."
        :maxlength="1000"
      />
      <p class="mt-1 text-xs text-gray-500">
        {{ content.length }}/1000 caractères
      </p>
    </div>
    <div class="flex justify-end">
      <button
        type="submit"
        :disabled="isSubmitting || !content.trim()"
        class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="isSubmitting">Envoi en cours...</span>
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
      :comment="comment"
    />
  </div>
  <p
    v-else
    class="text-sm text-gray-500 text-center py-4">
    Aucun commentaire pour le moment. Soyez le premier à commenter !
  </p>
</div>
</template>

<script setup lang="ts">
import CommentItem from '~/components/comments/CommentItem.vue'
import type { CommentWithUser, CommentEntityType } from '~/types/Comments'

const props = defineProps<{
  entityType: CommentEntityType
  entityId: string | number
}>()

const user = useSupabaseUser()
const { success, denied} = useToast()

const comments = ref<CommentWithUser[]>([])
const content = ref('')
const isSubmitting = ref(false)

// Charger les commentaires
async function loadComments() {
  try {
    const { data, error } = await useFetch<CommentWithUser[]>(
      `/api/comments/${props.entityType}/${props.entityId}`
    )
    if (error.value) throw error.value
    comments.value = data.value || []
  } catch (error) {
    console.error('Erreur lors du chargement des commentaires:', error)
    denied('Impossible de charger les commentaires')
  }
}

// Créer un nouveau commentaire
async function handleSubmit() {
  if (!content.value.trim() || isSubmitting.value) return

  isSubmitting.value = true
  try {
    const commentInput = {
      content: content.value.trim(),
      ...(props.entityType === 'gif' && { gifId: Number(props.entityId) }),
      ...(props.entityType === 'character' && { characterId: Number(props.entityId) }),
      ...(props.entityType === 'episode' && { episodeCode: props.entityId }),
      ...(props.entityType === 'season' && { seasonId: Number(props.entityId) })
    }

    const { data, error } = await useFetch<CommentWithUser>('/api/comments', {
      method: 'POST',
      body: commentInput
    })

    if (error.value) throw error.value

    // Ajouter le nouveau commentaire à la liste
    comments.value = [data.value as NonNullable<CommentWithUser>, ...comments.value]
    content.value = ''
    success('Commentaire publié avec succès')
  } catch (error) {
    console.error('Erreur lors de la publication du commentaire:', error)
    denied('Impossible de publier le commentaire')
  } finally {
    isSubmitting.value = false
  }
}

// Charger les commentaires au montage du composant
onMounted(async () => {
  await loadComments()
})
</script> 
