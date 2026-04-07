<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useTasks } from '@/composables/useTasks'
import PageContainer from '@/components/layout/PageContainer.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { formatDate, getTodayDate, isUpcoming } from '@/utils/dateHelpers'

const { sortedTasks, stats, categories } = useTasks()
const { isAuthenticated } = useAuth()

const todayDate = getTodayDate()

const flowTasks = computed(() => sortedTasks.value.filter((task) => !task.completed).slice(0, 2))
const todayCount = computed(
  () => sortedTasks.value.filter((task) => !task.completed && task.date === todayDate).length,
)
const progressLabel = computed(() => {
  if (stats.value.total === 0) {
    return 'Ready to start'
  }

  return `${stats.value.completionRate}% complete`
})
const categoryCount = computed(() => categories.value.length)

function getTaskBadge(taskDate: string) {
  if (taskDate === todayDate) {
    return {
      label: 'Today',
      classes: 'bg-sky-100 text-sky-700',
    }
  }

  if (isUpcoming(taskDate)) {
    return {
      label: 'Upcoming',
      classes: 'bg-violet-100 text-violet-700',
    }
  }

  return {
    label: formatDate(taskDate),
    classes: 'bg-slate-100 text-slate-600',
  }
}
</script>

<template>
  <PageContainer>
    <section class="grid gap-10 py-14 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div>
        <p class="eyebrow">Daily Focus System</p>
        <h1 class="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
          Plan your day with clarity and energy
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Organize your tasks, match them with your energy, and stay productive without
          feeling overwhelmed.
        </p>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <RouterLink :to="isAuthenticated ? '/tasks' : '/register'">
            <BaseButton size="lg">Get Started</BaseButton>
          </RouterLink>
          <RouterLink :to="isAuthenticated ? '/tasks' : '/login'">
            <BaseButton variant="secondary" size="lg">View Tasks</BaseButton>
          </RouterLink>
        </div>
        <div class="mt-8 flex flex-wrap gap-6 text-sm text-slate-500">
          <p v-if="isAuthenticated">
            <span class="font-semibold text-slate-900">{{ categoryCount }}</span> categories
          </p>
          <p v-else>
            <span class="font-semibold text-slate-900">Simple</span> planning
          </p>
          <p><span class="font-semibold text-slate-900">3 energy</span> levels</p>
          <p><span class="font-semibold text-slate-900">Daily</span> productivity</p>
        </div>
      </div>

      <div class="glass-panel relative overflow-hidden rounded-[2rem] p-5 sm:p-6">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(20,184,166,0.16),_transparent_32%)]"></div>
        <div class="relative rounded-[1.5rem] border border-white/80 bg-white p-5 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-500">Today's Flow</p>
              <p v-if="isAuthenticated" class="mt-1 text-2xl font-semibold text-slate-950">{{ todayCount }} tasks due today</p>
              <p v-else class="mt-1 text-2xl font-semibold text-slate-950">Log in to see your plan</p>
            </div>
            <div
              class="rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-600"
              v-if="isAuthenticated"
            >
              {{ progressLabel }}
            </div>
          </div>

          <div class="mt-6 space-y-3">
            <div
              v-for="task in flowTasks"
              :key="task.id"
              class="rounded-2xl border border-slate-100 bg-slate-50 p-4"
            >
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="font-medium text-slate-900">{{ task.title }}</p>
                  <p class="mt-1 text-sm text-slate-500">{{ task.category }} / {{ task.energy }} energy</p>
                </div>
                <span
                  class="rounded-full px-3 py-1 text-xs font-semibold"
                  :class="getTaskBadge(task.date).classes"
                >
                  {{ getTaskBadge(task.date).label }}
                </span>
              </div>
            </div>
            <div
              v-if="isAuthenticated && flowTasks.length === 0"
              class="rounded-2xl border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-500"
            >
              No tasks yet. Add your first task and start planning your day.
            </div>
            <div
              v-if="!isAuthenticated"
              class="rounded-2xl border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-500"
            >
              Create an account or log in to view your tasks, categories, and daily progress.
            </div>
          </div>

          <div v-if="isAuthenticated" class="mt-6 grid gap-3 sm:grid-cols-3">
            <div class="rounded-2xl bg-slate-900 p-4 text-white">
              <p class="text-sm text-white/70">Completed</p>
              <p class="mt-2 text-2xl font-semibold">{{ stats.completed }}</p>
            </div>
            <div class="rounded-2xl bg-sky-50 p-4">
              <p class="text-sm text-slate-500">Upcoming</p>
              <p class="mt-2 text-2xl font-semibold text-slate-950">{{ stats.upcomingTasks }}</p>
            </div>
            <div class="rounded-2xl bg-emerald-50 p-4">
              <p class="text-sm text-slate-500">Total tasks</p>
              <p class="mt-2 text-2xl font-semibold text-slate-950">{{ stats.total }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </PageContainer>
</template>
