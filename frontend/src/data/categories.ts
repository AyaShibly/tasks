import type { SelectOption, TaskCategory } from '@/types'

export const defaultCategories: SelectOption<TaskCategory>[] = [
  { label: 'Study', value: 'Study' },
  { label: 'Work', value: 'Work' },
  { label: 'Personal', value: 'Personal' },
  { label: 'Health', value: 'Health' },
]
