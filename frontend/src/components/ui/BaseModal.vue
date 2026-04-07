<script setup lang="ts">
defineProps<{
  open: boolean
  title: string
  description?: string
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <teleport to="body">
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[60] bg-slate-950/35 px-4 py-8 backdrop-blur-sm"
        @click.self="emit('close')"
      >
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="translate-y-4 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="translate-y-4 opacity-0"
        >
          <div
            v-if="open"
            class="mx-auto mt-12 w-full max-w-lg rounded-[2rem] border border-white/70 bg-white p-6 shadow-[var(--shadow-card)]"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <h2 class="text-2xl font-semibold text-slate-950">{{ title }}</h2>
                <p v-if="description" class="mt-3 text-sm leading-6 text-slate-500">
                  {{ description }}
                </p>
              </div>
              <button
                type="button"
                class="rounded-full px-2 py-1 text-sm font-medium text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                @click="emit('close')"
              >
                Close
              </button>
            </div>

            <div class="mt-6">
              <slot />
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>
