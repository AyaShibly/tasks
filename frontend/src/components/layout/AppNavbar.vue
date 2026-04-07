<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import AppMobileMenu from '@/components/layout/AppMobileMenu.vue'
import PageContainer from '@/components/layout/PageContainer.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const route = useRoute()
const isOpen = ref(false)
const { user, isAuthenticated, logout } = useAuth()

const links = [
  { label: 'Home', to: '/' },
  { label: 'Tasks', to: '/tasks' },
  { label: 'Report', to: '/report' },
]

const welcomeName = computed(() => user.value?.name?.trim() || 'there')

function toggleMenu() {
  isOpen.value = !isOpen.value
}

function closeMenu() {
  isOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-white/60 bg-[rgba(244,247,251,0.78)] backdrop-blur-xl">
    <PageContainer>
      <div class="flex items-center justify-between py-4">
        <RouterLink to="/" class="flex items-center gap-3" @click="closeMenu">
          <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
            P
          </div>
          <div>
            <p class="text-sm font-semibold tracking-[0.24em] text-sky-700 uppercase">PLANURD</p>
            <p class="text-sm text-slate-500">Plan your day with clarity</p>
          </div>
        </RouterLink>

        <nav class="hidden items-center gap-2 rounded-full border border-white/70 bg-white/70 p-1.5 shadow-sm md:flex">
          <RouterLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="rounded-full px-4 py-2 text-sm font-medium transition"
            :class="
              route.path === link.to
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
            "
          >
            {{ link.label }}
          </RouterLink>
        </nav>
        <div class="hidden items-center gap-2 md:flex">
          <template v-if="isAuthenticated">
            <span class="text-sm text-slate-500">Welcome, {{ welcomeName }}</span>
            <BaseButton variant="secondary" size="sm" @click="logout">Log Out</BaseButton>
          </template>
          <template v-else>
            <RouterLink to="/login">
              <BaseButton variant="secondary" size="sm">Log In</BaseButton>
            </RouterLink>
            <RouterLink to="/register">
              <BaseButton size="sm">Register</BaseButton>
            </RouterLink>
          </template>
        </div>
        <button
          class="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 md:hidden"
          type="button"
          aria-label="Toggle navigation"
          @click="toggleMenu"
        >
          <span v-if="!isOpen" class="flex flex-col gap-1">
            <span class="block h-0.5 w-5 rounded-full bg-current"></span>
            <span class="block h-0.5 w-5 rounded-full bg-current"></span>
            <span class="block h-0.5 w-5 rounded-full bg-current"></span>
          </span>
          <span v-else class="relative block h-5 w-5">
            <span class="absolute top-1/2 left-0 block h-0.5 w-5 -translate-y-1/2 rotate-45 rounded-full bg-current"></span>
            <span class="absolute top-1/2 left-0 block h-0.5 w-5 -translate-y-1/2 -rotate-45 rounded-full bg-current"></span>
          </span>
        </button>
      </div>

      <AppMobileMenu :is-open="isOpen" @close="closeMenu" />
    </PageContainer>
  </header>
</template>
