<template>
  <div class="min-h-screen bg-[var(--color-bg)] text-slate-900 antialiased">
    <div class="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.16),_transparent_58%)]"></div>
    <AppNavbar />
    <main>
      <RouterView />
    </main>
    <AppFooter />
    <ToastViewport />
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import ToastViewport from '@/components/ui/ToastViewport.vue'

const { hydrate } = useAuth()

onMounted(() => {
  void hydrate()
})
</script>
