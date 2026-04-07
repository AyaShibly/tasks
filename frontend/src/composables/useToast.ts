import { readonly, ref } from 'vue'

export interface ToastItem {
  id: number
  title: string
  description?: string
  tone?: 'success' | 'error' | 'info'
}

const toasts = ref<ToastItem[]>([])

export function useToast() {
  function showToast(toast: Omit<ToastItem, 'id'>) {
    const id = Date.now() + Math.floor(Math.random() * 1000)
    toasts.value = [...toasts.value, { id, ...toast }]

    window.setTimeout(() => {
      dismissToast(id)
    }, 2800)
  }

  function dismissToast(id: number) {
    toasts.value = toasts.value.filter((toast) => toast.id !== id)
  }

  return {
    toasts: readonly(toasts),
    showToast,
    dismissToast,
  }
}
