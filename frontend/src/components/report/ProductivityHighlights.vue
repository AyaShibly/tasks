<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'
import type { TaskStats } from '@/types'

defineProps<{
  stats: TaskStats
}>()

const getTone = (count: number) => (count > 0 ? 'text-slate-950' : 'text-slate-400')
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <BaseCard>
      <p class="text-sm font-medium text-slate-500">Upcoming Tasks</p>
      <p class="mt-3 text-lg leading-7" :class="getTone(stats.upcomingTasks)">
        {{ stats.upcomingTasks }} tasks are still planned for the days ahead.
      </p>
    </BaseCard>

    <BaseCard>
      <p class="text-sm font-medium text-slate-500">High Energy Tasks</p>
      <p class="mt-3 text-lg leading-7" :class="getTone(stats.highEnergyTasks)">
        {{ stats.highEnergyTasks }} tasks need your strongest energy.
      </p>
    </BaseCard>
  </div>
</template>
