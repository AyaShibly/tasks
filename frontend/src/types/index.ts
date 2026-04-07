export type EnergyLevel = 'Low' | 'Medium' | 'High'

export type TaskCategory = string

export interface AuthUser {
  id: string
  name: string
  email: string
  avatar: string | null
  categories: string[]
}

export interface Task {
  id: string
  title: string
  category: TaskCategory
  energy: EnergyLevel
  date: string
  completed: boolean
}

export interface TaskStats {
  total: number
  completed: number
  pending: number
  completionRate: number
  mostUsedCategory: string
  highEnergyTasks: number
  upcomingTasks: number
}

export interface SelectOption<T extends string> {
  label: string
  value: T
}
