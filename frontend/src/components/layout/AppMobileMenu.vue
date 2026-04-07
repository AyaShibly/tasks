<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const { isAuthenticated, logout } = useAuth()

const links = [
  { label: 'Home', to: '/' },
  { label: 'Tasks', to: '/tasks' },
  { label: 'Report', to: '/report' },
]
</script>

<template>
  <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="translate-y-2 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-2 opacity-0"
  >
    <div v-if="isOpen" class="glass-panel mt-3 rounded-3xl p-3 md:hidden">
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-slate-950"
        @click="emit('close')"
      >
        {{ link.label }}
      </RouterLink>
      <template v-if="isAuthenticated">
        <button
          type="button"
          class="block w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-white hover:text-slate-950"
          @click="logout(); emit('close')"
        >
          Log Out
        </button>
      </template>
      <template v-else>
        <RouterLink
          to="/login"
          class="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-slate-950"
          @click="emit('close')"
        >
          Log In
        </RouterLink>
        <RouterLink
          to="/register"
          class="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-slate-950"
          @click="emit('close')"
        >
          Register
        </RouterLink>
      </template>
    </div>
  </transition>
</template>
