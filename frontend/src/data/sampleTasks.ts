import type { Task } from '@/types'
import { getRelativeDate } from '@/utils/dateHelpers'

export const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Finish landing page moodboard',
    category: 'Work',
    energy: 'High',
    date: getRelativeDate(0),
    completed: false,
  },
  {
    id: '2',
    title: 'Review TypeScript notes for client project',
    category: 'Study',
    energy: 'Medium',
    date: getRelativeDate(1),
    completed: false,
  },
  {
    id: '3',
    title: '30-minute mobility session',
    category: 'Health',
    energy: 'Low',
    date: getRelativeDate(-1),
    completed: true,
  },
  {
    id: '4',
    title: 'Plan weekend reset routine',
    category: 'Personal',
    energy: 'Low',
    date: getRelativeDate(2),
    completed: false,
  },
]
