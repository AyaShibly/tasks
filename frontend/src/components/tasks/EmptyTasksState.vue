<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'

const emit = defineEmits<{
  add: []
}>()
</script>

<template>
  <BaseCard class="text-center">
    <button
      type="button"
      class="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-sky-100 text-2xl font-semibold text-sky-700 transition duration-200 hover:scale-105 hover:bg-sky-200 active:scale-100"
      aria-label="Add task"
      @click="emit('add')"
    >
      +
    </button>
    <h3 class="mt-5 text-xl font-semibold text-slate-950">No tasks yet</h3>
    <p class="mt-3 text-sm leading-6 text-slate-500">
      Start by adding your first task and take control of your day.
    </p>
  </BaseCard>
</template>
