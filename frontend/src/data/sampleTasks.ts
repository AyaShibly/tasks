import type { Task } from '@/types'
import { getRelativeDate } from '@/utils/dateHelpers'

export const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Finish landing page moodboard',
    category: 'Work',
    energy: 'High',
    date: getRelativeDate(0),
    startTime: '09:00',
    endTime: '11:00',
    duration: 120,
    completed: false,
  },
  {
    id: '2',
    title: 'Review TypeScript notes for client project',
    category: 'Study',
    energy: 'Medium',
    date: getRelativeDate(1),
    startTime: '14:00',
    endTime: '15:30',
    duration: 90,
    completed: false,
  },
  {
    id: '3',
    title: '30-minute mobility session',
    category: 'Health',
    energy: 'Low',
    date: getRelativeDate(-1),
    startTime: '07:00',
    endTime: '07:30',
    duration: 30,
    completed: true,
  },
  {
    id: '4',
    title: 'Plan weekend reset routine',
    category: 'Personal',
    energy: 'Low',
    date: getRelativeDate(2),
    startTime: '18:00',
    endTime: '19:00',
    duration: 60,
    completed: false,
  },
]
