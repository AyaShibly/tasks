<script setup lang="ts">
import type { TaskCategory } from '@/types'

defineProps<{
  category: TaskCategory
}>()

const colorMap: Record<TaskCategory, string> = {
  Study: 'bg-violet-100 text-violet-700',
  Work: 'bg-sky-100 text-sky-700',
  Personal: 'bg-amber-100 text-amber-700',
  Health: 'bg-emerald-100 text-emerald-700',
}
</script>

<template>
  <span
    class="rounded-full px-3 py-1 text-xs font-semibold"
    :class="colorMap[category] ?? 'bg-slate-100 text-slate-700'"
  >
    {{ category }}
  </span>
</template>
