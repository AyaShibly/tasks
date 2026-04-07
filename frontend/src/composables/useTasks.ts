import { computed, ref, watch } from 'vue'
import { defaultCategories } from '@/data/categories'
import type { EnergyLevel, Task, TaskCategory } from '@/types'
import { useAuth } from '@/composables/useAuth'
import { apiFetch } from '@/utils/api'
import { getTaskStats } from '@/utils/reportHelpers'
import { sortTasks } from '@/utils/taskHelpers'

const STORAGE_KEY = 'planurd.tasks'
const CATEGORY_STORAGE_KEY = 'planurd.categories'

const localTasks = ref<Task[]>(loadTasks())
const localCategories = ref<TaskCategory[]>(loadCategories())
const remoteTasks = ref<Task[]>([])
const isLoading = ref(false)
const errorMessage = ref('')

const auth = useAuth()

watch(
  localTasks,
  (value) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  },
  { deep: true },
)

watch(
  localCategories,
  (value) => {
    localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(value))
  },
  { deep: true },
)

function loadTasks(): Task[] {
  if (typeof window === 'undefined') {
    return []
  }

  const raw = localStorage.getItem(STORAGE_KEY)

  if (!raw) {
    return []
  }

  try {
    return JSON.parse(raw) as Task[]
  } catch {
    return []
  }
}

function loadCategories(): TaskCategory[] {
  if (typeof window === 'undefined') {
    return defaultCategories.map((category) => category.value)
  }

  const raw = localStorage.getItem(CATEGORY_STORAGE_KEY)

  if (!raw) {
    return defaultCategories.map((category) => category.value)
  }

  try {
    const parsed = JSON.parse(raw) as string[]
    return parsed.length > 0 ? parsed : defaultCategories.map((category) => category.value)
  } catch {
    return defaultCategories.map((category) => category.value)
  }
}

export function useTasks() {
  const tasks = computed(() =>
    auth.isAuthenticated.value ? remoteTasks.value : localTasks.value,
  )
  const categories = computed(() =>
    auth.isAuthenticated.value
      ? (auth.user.value?.categories ?? defaultCategories.map((category) => category.value))
      : localCategories.value,
  )
  const sortedTasks = computed(() => sortTasks(tasks.value))
  const stats = computed(() => getTaskStats(tasks.value))
  const categoryOptions = computed(() =>
    categories.value.map((category) => ({
      label: category,
      value: category,
    })),
  )

  watch(
    () => auth.token.value,
    async (value) => {
      isLoading.value = true
      errorMessage.value = ''
      if (value) {
        try {
          remoteTasks.value = sortTasks(await apiFetch<Task[]>('/tasks', {}, value))
        } catch (error) {
          errorMessage.value =
            error instanceof Error ? error.message : 'Unable to load your tasks.'
        } finally {
          isLoading.value = false
        }
      } else {
        remoteTasks.value = []
        isLoading.value = false
      }
    },
    { immediate: true },
  )

  async function refreshTasks() {
    if (!auth.token.value) {
      return
    }

    isLoading.value = true
    errorMessage.value = ''

    try {
      remoteTasks.value = sortTasks(await apiFetch<Task[]>('/tasks', {}, auth.token.value))
    } catch (error) {
      errorMessage.value =
        error instanceof Error ? error.message : 'Unable to load your tasks.'
    } finally {
      isLoading.value = false
    }
  }

  async function addTask(task: Omit<Task, 'id' | 'completed'>) {
    errorMessage.value = ''
    if (auth.token.value) {
      const createdTask = await apiFetch<Task>(
        '/tasks',
        {
          method: 'POST',
          body: JSON.stringify(task),
        },
        auth.token.value,
      )

      remoteTasks.value = sortTasks([...remoteTasks.value, createdTask])
      return
    }

    localTasks.value = [
      ...localTasks.value,
      {
        ...task,
        id: String(Date.now()),
        completed: false,
      },
    ]

    ensureLocalCategory(task.category)
  }

  async function toggleTask(taskId: string) {
    errorMessage.value = ''
    const task = tasks.value.find((item) => item.id === taskId)

    if (!task) {
      return
    }

    if (auth.token.value) {
      const updatedTask = await apiFetch<Task>(
        `/tasks/${taskId}`,
        {
          method: 'PATCH',
          body: JSON.stringify({ completed: !task.completed }),
        },
        auth.token.value,
      )

      remoteTasks.value = sortTasks(
        remoteTasks.value.map((item) => (item.id === taskId ? updatedTask : item)),
      )
      return
    }

    localTasks.value = localTasks.value.map((item) =>
      item.id === taskId ? { ...item, completed: !item.completed } : item,
    )
  }

  async function deleteTask(taskId: string) {
    errorMessage.value = ''
    if (auth.token.value) {
      await apiFetch<{ success: true }>(
        `/tasks/${taskId}`,
        {
          method: 'DELETE',
        },
        auth.token.value,
      )

      remoteTasks.value = remoteTasks.value.filter((task) => task.id !== taskId)
      return
    }

    localTasks.value = localTasks.value.filter((task) => task.id !== taskId)
  }

  function ensureLocalCategory(category: TaskCategory) {
    const normalizedCategory = category.trim()

    if (!normalizedCategory) {
      return
    }

    const alreadyExists = localCategories.value.some(
      (existingCategory) => existingCategory.toLowerCase() === normalizedCategory.toLowerCase(),
    )

    if (!alreadyExists) {
      localCategories.value = [...localCategories.value, normalizedCategory]
    }
  }

  async function addCategory(category: TaskCategory) {
    errorMessage.value = ''
    if (auth.token.value) {
      await auth.addCategory(category)
      return
    }

    ensureLocalCategory(category)
  }

  async function removeCategory(category: TaskCategory) {
    errorMessage.value = ''
    const normalizedCategory = category.trim().toLowerCase()

    if (!normalizedCategory) {
      return false
    }

    const isUsedByTask = tasks.value.some(
      (task) => task.category.trim().toLowerCase() === normalizedCategory,
    )

    if (isUsedByTask) {
      return false
    }

    if (auth.token.value) {
      try {
        return await auth.removeCategory(category)
      } catch {
        return false
      }
    }

    localCategories.value = localCategories.value.filter(
      (existingCategory) => existingCategory.trim().toLowerCase() !== normalizedCategory,
    )

    return true
  }

  return {
    tasks,
    categories,
    categoryOptions,
    sortedTasks,
    stats,
    isLoading,
    errorMessage,
    refreshTasks,
    addTask,
    addCategory,
    removeCategory,
    toggleTask,
    deleteTask,
  }
}
