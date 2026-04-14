<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import CategoryBadge from '@/components/tasks/CategoryBadge.vue'
import type { Task } from '@/types'
import { formatDate } from '@/utils/dateHelpers'

defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  toggle: [taskId: string]
  delete: [taskId: string]
}>()

const energyClasses = {
  Low: 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200',
  Medium: 'bg-yellow-100 text-yellow-700 ring-1 ring-yellow-200',
  High: 'bg-rose-100 text-rose-700 ring-1 ring-rose-200',
}

function formatTimeRange(task: Task) {
  if (!task.startTime || !task.endTime) {
    return ''
  }

  return `${task.startTime} - ${task.endTime}`
}
</script>

<template>
  <BaseCard>
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-2">
          <CategoryBadge :category="task.category" />
          <span class="rounded-full px-3 py-1 text-xs font-semibold" :class="energyClasses[task.energy]">
            {{ task.energy }} Energy
          </span>
          <span
            v-if="task.startTime && task.endTime"
            class="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700"
          >
            {{ formatTimeRange(task) }}
          </span>
          <span v-if="task.duration > 0" class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {{ task.duration }} min
          </span>
          <span class="text-xs font-medium text-slate-400">{{ formatDate(task.date) }}</span>
        </div>

        <h3
          class="mt-4 text-lg font-semibold text-slate-950 transition duration-200"
          :class="task.completed ? 'text-slate-400 line-through' : ''"
        >
          {{ task.title }}
        </h3>
      </div>

      <div class="flex items-center gap-2 self-start">
        <BaseButton variant="secondary" size="sm" @click="emit('toggle', task.id)">
          {{ task.completed ? 'Completed' : 'Complete' }}
        </BaseButton>
        <BaseButton variant="ghost" size="sm" @click="emit('delete', task.id)">Delete</BaseButton>
      </div>
    </div>
  </BaseCard>
</template>
