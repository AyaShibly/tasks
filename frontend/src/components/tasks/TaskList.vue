<script setup lang="ts">
import { computed } from 'vue'
import EmptyTasksState from '@/components/tasks/EmptyTasksState.vue'
import TaskCard from '@/components/tasks/TaskCard.vue'
import type { Task } from '@/types'
import { getTodayDate } from '@/utils/dateHelpers'

const props = defineProps<{
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

const today = getTodayDate()
const todayTasks = computed(() => props.tasks.filter((task) => task.date === today))
const otherDaysTasks = computed(() => props.tasks.filter((task) => task.date !== today))
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
    <div
      v-else-if="tasks.length > 0"
      class="space-y-6"
    >
      <section v-if="todayTasks.length > 0" class="space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Today's Tasks</h3>
          <span class="text-xs font-medium text-slate-500">{{ todayTasks.length }}</span>
        </div>
        <transition-group
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
            v-for="task in todayTasks"
            :key="task.id"
            :task="task"
            @toggle="emit('toggle', $event)"
            @delete="emit('delete', $event)"
          />
        </transition-group>
      </section>

      <section v-if="otherDaysTasks.length > 0" class="space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">Other Days</h3>
          <span class="text-xs font-medium text-slate-500">{{ otherDaysTasks.length }}</span>
        </div>
        <transition-group
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
            v-for="task in otherDaysTasks"
            :key="task.id"
            :task="task"
            @toggle="emit('toggle', $event)"
            @delete="emit('delete', $event)"
          />
        </transition-group>
      </section>
    </div>
    <EmptyTasksState v-else @add="emit('add')" />
  </div>
</template>
