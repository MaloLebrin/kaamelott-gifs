import { ref } from 'vue'

export const useToast = () => {
  const toast = ref<{
    message: string
    type: 'success' | 'error'
    show: boolean
  } | null>(null)

  const showToast = (message: string, type: 'success' | 'error') => {
    toast.value = {
      message,
      type,
      show: true
    }

    setTimeout(() => {
      toast.value = null
    }, 3000)
  }

  const success = (message: string) => showToast(message, 'success')
  const error = (message: string) => showToast(message, 'error')

  return {
    toast,
    success,
    error
  }
} 
