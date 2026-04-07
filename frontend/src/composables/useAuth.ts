import { computed, ref, watch } from 'vue'
import type { AuthUser } from '@/types'
import { apiFetch } from '@/utils/api'

const TOKEN_KEY = 'planurd.auth.token'
const USER_KEY = 'planurd.auth.user'

const token = ref<string | null>(readToken())
const user = ref<AuthUser | null>(readUser())
const authReady = ref(false)

watch(token, (value) => {
  if (typeof window === 'undefined') {
    return
  }

  if (value) {
    localStorage.setItem(TOKEN_KEY, value)
  } else {
    localStorage.removeItem(TOKEN_KEY)
  }
})

watch(
  user,
  (value) => {
    if (typeof window === 'undefined') {
      return
    }

    if (value) {
      localStorage.setItem(USER_KEY, JSON.stringify(value))
    } else {
      localStorage.removeItem(USER_KEY)
    }
  },
  { deep: true },
)

function readToken() {
  if (typeof window === 'undefined') {
    return null
  }

  return localStorage.getItem(TOKEN_KEY)
}

function readUser() {
  if (typeof window === 'undefined') {
    return null
  }

  const raw = localStorage.getItem(USER_KEY)

  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

export function useAuth() {
  const isAuthenticated = computed(() => Boolean(token.value && user.value))

  async function hydrate() {
    if (authReady.value) {
      return
    }

    authReady.value = true

    if (!token.value) {
      return
    }

    try {
      user.value = await apiFetch<AuthUser>('/auth/me', {}, token.value)
    } catch {
      logout()
    }
  }

  async function register(payload: { name: string; email: string; password: string }) {
    const data = await apiFetch<{ accessToken: string; user: AuthUser }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    })

    token.value = data.accessToken
    user.value = data.user
    return data.user
  }

  async function login(payload: { email: string; password: string }) {
    const data = await apiFetch<{ accessToken: string; user: AuthUser }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    })

    token.value = data.accessToken
    user.value = data.user
    return data.user
  }

  async function addCategory(category: string) {
    if (!token.value) {
      return null
    }

    user.value = await apiFetch<AuthUser>(
      '/auth/categories',
      {
        method: 'POST',
        body: JSON.stringify({ category }),
      },
      token.value,
    )

    return user.value
  }

  async function removeCategory(category: string) {
    if (!token.value) {
      return false
    }

    user.value = await apiFetch<AuthUser>(
      `/auth/categories/${encodeURIComponent(category)}`,
      {
        method: 'DELETE',
      },
      token.value,
    )

    return true
  }

  function logout() {
    token.value = null
    user.value = null
  }

  return {
    token,
    user,
    isAuthenticated,
    authReady,
    hydrate,
    register,
    login,
    addCategory,
    removeCategory,
    logout,
  }
}
