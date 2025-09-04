import { ref } from 'vue'

export interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}

export const useToast = () => {
  const toasts = ref<Toast[]>([])
  let toastId = 0

  const addToast = (message: string, type: Toast['type']) => {
    const id = ++toastId
    toasts.value.push({ id, message, type })
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeToast(id)
    }, 5000)
  }

  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter(toast => toast.id !== id)
  }

  const success = (message: string) => {
    addToast(message, 'success')
  }

  const denied = (message: string) => {
    addToast(message, 'error')
  }

  const info = (message: string) => {
    addToast(message, 'info')
  }

  const warning = (message: string) => {
    addToast(message, 'warning')
  }

  return {
    toasts,
    addToast,
    removeToast,
    success,
    denied,
    info,
    warning
  }
}
