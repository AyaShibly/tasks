<script setup lang="ts">
import { useToast } from '@/composables/useToast'

const { toasts, dismissToast } = useToast()

const toneClasses = {
  success: 'border-emerald-200 bg-white text-slate-900',
  error: 'border-rose-200 bg-white text-slate-900',
  info: 'border-sky-200 bg-white text-slate-900',
}

const badgeClasses = {
  success: 'bg-emerald-100 text-emerald-700',
  error: 'bg-rose-100 text-rose-700',
  info: 'bg-sky-100 text-sky-700',
}
</script>

<template>
  <div class="pointer-events-none fixed right-4 bottom-4 z-[70] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3">
    <transition-group
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-3 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-2 opacity-0"
      move-class="transition duration-200"
      tag="div"
      class="flex flex-col gap-3"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto rounded-3xl border p-4 shadow-[var(--shadow-card)]"
        :class="toneClasses[toast.tone ?? 'info']"
      >
        <div class="flex items-start gap-3">
          <div
            class="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-2xl text-xs font-semibold"
            :class="badgeClasses[toast.tone ?? 'info']"
          >
            {{ toast.tone === 'error' ? '!' : toast.tone === 'success' ? 'OK' : 'i' }}
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-sm font-semibold">{{ toast.title }}</p>
            <p v-if="toast.description" class="mt-1 text-sm leading-6 text-slate-500">
              {{ toast.description }}
            </p>
          </div>
          <button
            type="button"
            class="rounded-full px-2 py-1 text-xs font-medium text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            @click="dismissToast(toast.id)"
          >
            Close
          </button>
        </div>
      </div>
    </transition-group>
  </div>
</template>
