import type { Task, TaskCategory, TaskStats } from '@/types'
import { isUpcoming } from '@/utils/dateHelpers'

export function getMostUsedCategory(tasks: Task[]): TaskCategory | 'None' {
  if (tasks.length === 0) {
    return 'None'
  }

  const categoryCount = tasks.reduce<Record<string, number>>(
    (acc, task) => {
      acc[task.category] = (acc[task.category] ?? 0) + 1
      return acc
    },
    {},
  )

  return (Object.entries(categoryCount).sort(([, a], [, b]) => b - a)[0]?.[0] as TaskCategory) ?? 'None'
}

export function getTaskStats(tasks: Task[]): TaskStats {
  const total = tasks.length
  const completed = tasks.filter((task) => task.completed).length
  const pending = total - completed

  return {
    total,
    completed,
    pending,
    completionRate: total === 0 ? 0 : Math.round((completed / total) * 100),
    mostUsedCategory: getMostUsedCategory(tasks),
    highEnergyTasks: tasks.filter((task) => task.energy === 'High').length,
    upcomingTasks: tasks.filter((task) => !task.completed && isUpcoming(task.date)).length,
  }
}
