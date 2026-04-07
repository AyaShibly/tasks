<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import PageContainer from '@/components/layout/PageContainer.vue'
import TaskFilters from '@/components/tasks/TaskFilters.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import { useTasks } from '@/composables/useTasks'
import { useToast } from '@/composables/useToast'
import TaskList from '@/components/tasks/TaskList.vue'
import TaskSidebar from '@/components/tasks/TaskSidebar.vue'
import type { EnergyLevel, SelectOption, TaskCategory } from '@/types'
import { filterTasks, type TaskFilter } from '@/utils/taskHelpers'

const {
  tasks,
  sortedTasks,
  categoryOptions: storedCategoryOptions,
  isLoading,
  errorMessage,
  refreshTasks,
  addTask,
  addCategory,
  removeCategory,
  toggleTask,
  deleteTask,
} = useTasks()
const { showToast } = useToast()

const status = ref<TaskFilter>('all')
const selectedCategory = ref<TaskCategory | 'All'>('All')
const selectedEnergy = ref<EnergyLevel | 'All'>('All')
const quickEnergy = ref<EnergyLevel | 'All'>('All')
const drawerOpen = ref(false)
const pendingDeleteTaskId = ref<string | null>(null)
const taskFormRef = useTemplateRef<InstanceType<typeof TaskSidebar>>('taskFormRef')

const categoryOptions = computed<SelectOption<TaskCategory | 'All'>[]>(() => [
  { label: 'All categories', value: 'All' },
  ...storedCategoryOptions.value,
])

const energyOptions: SelectOption<EnergyLevel | 'All'>[] = [
  { label: 'All energy', value: 'All' },
  { label: 'Low Energy', value: 'Low' },
  { label: 'Medium Energy', value: 'Medium' },
  { label: 'High Energy', value: 'High' },
]

const filteredTasks = computed(() =>
  filterTasks(sortedTasks.value, status.value, selectedCategory.value, selectedEnergy.value).filter(
    (task) => quickEnergy.value === 'All' || task.energy === quickEnergy.value,
  ),
)
async function handleAddTask(payload: {
  title: string
  category: TaskCategory
  energy: EnergyLevel
  date: string
}) {
  try {
    await addTask(payload)
    drawerOpen.value = false
    showToast({
      title: 'Task added',
      description: 'Your task is ready for the day ahead.',
      tone: 'success',
    })
  } catch (error) {
    showToast({
      title: 'Could not add task',
      description: error instanceof Error ? error.message : 'Please try again.',
      tone: 'error',
    })
  }
}

async function handleAddCategory(category: string) {
  try {
    await addCategory(category)
    showToast({
      title: 'Category added',
      description: `"${category}" is now ready to use.`,
      tone: 'success',
    })
  } catch (error) {
    showToast({
      title: 'Could not add category',
      description: error instanceof Error ? error.message : 'Please try again.',
      tone: 'error',
    })
  }
}

async function handleRemoveCategory(category: string) {
  const removed = await removeCategory(category)

  if (!removed) {
    showToast({
      title: 'Category still in use',
      description: 'Move or delete tasks using this category first.',
      tone: 'info',
    })
    return
  }

  if (selectedCategory.value.toLowerCase() === category.toLowerCase()) {
    selectedCategory.value = 'All'
  }

  showToast({
    title: 'Category removed',
    description: `"${category}" has been removed.`,
    tone: 'success',
  })
}

async function handleToggleTask(taskId: string) {
  try {
    const task = tasks.value.find((item) => item.id === taskId)
    await toggleTask(taskId)
    showToast({
      title: task?.completed ? 'Task marked as active' : 'Task completed',
      description: task?.completed
        ? 'The task is back in your active list.'
        : 'Nice work. Your progress has been updated.',
      tone: 'success',
    })
  } catch (error) {
    showToast({
      title: 'Could not update task',
      description: error instanceof Error ? error.message : 'Please try again.',
      tone: 'error',
    })
  }
}

function requestDeleteTask(taskId: string) {
  pendingDeleteTaskId.value = taskId
}

async function confirmDeleteTask() {
  if (!pendingDeleteTaskId.value) {
    return
  }

  try {
    await deleteTask(pendingDeleteTaskId.value)
    showToast({
      title: 'Task deleted',
      description: 'The task has been removed from your list.',
      tone: 'success',
    })
  } catch (error) {
    showToast({
      title: 'Could not delete task',
      description: error instanceof Error ? error.message : 'Please try again.',
      tone: 'error',
    })
  } finally {
    pendingDeleteTaskId.value = null
  }
}

function handleStartAddTask() {
  if (window.innerWidth < 1280) {
    drawerOpen.value = true
    return
  }

  const section = document.getElementById('task-sidebar')
  section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <PageContainer>
    <section class="py-10 md:py-14">
      <div class="page-hero">
        <div>
          <p class="eyebrow">Task Planning</p>
          <h1 class="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Your Tasks
          </h1>
          <p class="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Add, organize, and complete your tasks based on your energy and schedule.
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <BaseButton class="xl:hidden" @click="drawerOpen = true">Open Planner</BaseButton>
          <BaseButton variant="secondary" @click="handleStartAddTask">Add New Task</BaseButton>
        </div>
      </div>

      <div class="flex gap-6">
        <div id="task-sidebar">
          <TaskSidebar
            ref="taskFormRef"
            :open="drawerOpen"
            :categories="storedCategoryOptions"
            :tasks="tasks"
            :quick-energy="quickEnergy"
            :loading="isLoading"
            @close="drawerOpen = false"
            @submit="handleAddTask"
            @add-category="handleAddCategory"
            @remove-category="handleRemoveCategory"
            @update:quick-energy="quickEnergy = $event"
          />
        </div>

        <div class="min-w-0 flex-1 space-y-6">
          <BaseCard class="bg-white/80">
            <div class="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p class="text-sm font-medium text-slate-500">Task filters</p>
                <p class="text-sm text-slate-500">
                  Narrow the list by status, category, or energy.
                </p>
              </div>
              <div class="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                {{ filteredTasks.length }} task{{ filteredTasks.length === 1 ? '' : 's' }}
              </div>
            </div>
            <TaskFilters
              :status="status"
              :category="selectedCategory"
              :energy="selectedEnergy"
              :category-options="categoryOptions"
              :energy-options="energyOptions"
              @update:status="status = $event"
              @update:category="selectedCategory = $event"
              @update:energy="selectedEnergy = $event"
            />
          </BaseCard>

          <TaskList
            :tasks="filteredTasks"
            :loading="isLoading"
            :error-message="errorMessage"
            @toggle="handleToggleTask"
            @delete="requestDeleteTask"
            @add="handleStartAddTask"
            @retry="refreshTasks"
          />
        </div>
      </div>

      <BaseModal
        :open="Boolean(pendingDeleteTaskId)"
        title="Delete this task?"
        description="This action removes the task from your list. You can't undo it."
        @close="pendingDeleteTaskId = null"
      >
        <div class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <BaseButton variant="secondary" @click="pendingDeleteTaskId = null">Cancel</BaseButton>
          <BaseButton @click="confirmDeleteTask">Delete Task</BaseButton>
        </div>
      </BaseModal>
    </section>
  </PageContainer>
</template>
