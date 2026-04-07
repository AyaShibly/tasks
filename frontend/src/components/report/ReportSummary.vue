<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'
import type { TaskStats } from '@/types'

defineProps<{
  stats: TaskStats
}>()
</script>

<template>
  <BaseCard>
    <p class="text-sm font-semibold tracking-[0.24em] text-sky-700 uppercase">Summary</p>
    <h2 class="mt-3 text-2xl font-semibold text-slate-950">Weekly Summary</h2>
    <p class="mt-4 text-sm leading-7 text-slate-600">
      You completed <span class="font-semibold text-slate-900">{{ stats.completed }}</span> tasks this week.
      Keep going and stay consistent.
    </p>
  </BaseCard>
</template>
