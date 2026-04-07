import type { EnergyLevel, Task, TaskCategory } from '@/types'

export type TaskFilter = 'all' | 'pending' | 'completed'

export function sortTasks(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return Number(a.completed) - Number(b.completed)
    }

    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })
}

export function filterTasks(
  tasks: Task[],
  filter: TaskFilter,
  selectedCategory: TaskCategory | 'All',
  selectedEnergy: EnergyLevel | 'All',
): Task[] {
  return tasks.filter((task) => {
    const matchesStatus =
      filter === 'all' ||
      (filter === 'completed' && task.completed) ||
      (filter === 'pending' && !task.completed)
    const matchesCategory = selectedCategory === 'All' || task.category === selectedCategory
    const matchesEnergy = selectedEnergy === 'All' || task.energy === selectedEnergy

    return matchesStatus && matchesCategory && matchesEnergy
  })
}
