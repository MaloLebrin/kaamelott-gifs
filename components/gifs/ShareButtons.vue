<script setup lang="ts">
import { CheckBadgeIcon } from '@heroicons/vue/24/outline';
import { useToast } from '~/composables/useToast'

const props = defineProps<{
  gifUrl: string
  quote: string
}>()

const { success, denied } = useToast()
const currentUrl = ref('')
const isLinkCopied = ref(false)

onMounted(() => {
  currentUrl.value = window.location.href
})

const shareLinks = computed(() => {
  const encodedUrl = encodeURIComponent(currentUrl.value)
  const encodedText = encodeURIComponent(props.quote)
  
  return {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`
  }
})

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(`${props.gifUrl}`)
    success('Lien copié dans le presse-papier !')
    isLinkCopied.value = true
    setTimeout(() => {
      isLinkCopied.value = false
    }, 2000)
  } catch (err) {
    denied('Erreur lors de la copie du lien')
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <h3 class="text-sm font-medium text-gray-700">Partager ce GIF</h3>
      <button
        v-if="!isLinkCopied"
        @click="copyLink"
        :v-posthog-capture="`copy_clipboard_${props.gifUrl}`"
        class="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
        Copier le lien
      </button>
      <button
        v-else
        @click="copyLink"
        class="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
      >
        <CheckBadgeIcon class="w-4 h-4 text-green-500" />
        Lien copié
      </button>
    </div>
    
    <div class="flex gap-4">
      <a
        v-for="(url, platform) in shareLinks"
        :key="platform"
        :href="url"
        :v-posthog-capture="`share_${platform}_${props.gifUrl}`"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors border-[0.25px] border-gray-800/50"
        :title="`Partager sur ${platform}`"
      >
        <Icon
          class="w-5 h-5"
          :name="`custom:${platform}`"
        />
      </a>
    </div>
  </div>
</template> 
