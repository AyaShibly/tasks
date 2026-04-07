<script setup lang="ts">
import EmptyTasksState from '@/components/tasks/EmptyTasksState.vue'
import TaskCard from '@/components/tasks/TaskCard.vue'
import type { Task } from '@/types'

defineProps<{
  tasks: Task[]
  loading?: boolean
  errorMessage?: string
}>()

const emit = defineEmits<{
  toggle: [taskId: string]
  delete: [taskId: string]
  add: []
  retry: []
}>()
</script>

<template>
  <div>
    <div
      v-if="loading"
      class="grid gap-4"
    >
      <div
        v-for="item in 3"
        :key="item"
        class="glass-panel animate-pulse rounded-[var(--radius-xl)] p-6"
      >
        <div class="h-4 w-28 rounded-full bg-slate-200"></div>
        <div class="mt-4 h-6 w-2/3 rounded-full bg-slate-200"></div>
        <div class="mt-5 h-10 w-40 rounded-2xl bg-slate-200"></div>
      </div>
    </div>
    <div
      v-else-if="errorMessage"
      class="glass-panel rounded-[var(--radius-xl)] p-6"
    >
      <p class="text-sm font-semibold uppercase tracking-[0.24em] text-rose-600">Something went wrong</p>
      <h3 class="mt-3 text-2xl font-semibold text-slate-950">We couldn't load your tasks</h3>
      <p class="mt-3 text-sm leading-6 text-slate-500">{{ errorMessage }}</p>
      <button
        type="button"
        class="mt-5 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        @click="emit('retry')"
      >
        Try Again
      </button>
    </div>
    <transition-group
      v-else-if="tasks.length > 0"
      tag="div"
      class="space-y-4"
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-3 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="translate-x-3 opacity-0"
      move-class="transition duration-200"
    >
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle="emit('toggle', $event)"
        @delete="emit('delete', $event)"
      />
    </transition-group>
    <EmptyTasksState v-else @add="emit('add')" />
  </div>
</template>
