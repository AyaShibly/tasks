<script setup lang="ts">
import { computed, reactive, useTemplateRef } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import type { EnergyLevel, TaskCategory } from '@/types'
import { getTodayDate } from '@/utils/dateHelpers'

const props = defineProps<{
  categories: Array<{ label: string; value: string }>
  tasks: Array<{ category: string }>
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [
    payload: {
      title: string
      category: TaskCategory
      energy: EnergyLevel
      date: string
      startTime: string
      endTime: string
    },
  ]
  addCategory: [category: string]
  removeCategory: [category: string]
}>()

const form = reactive({
  title: '',
  category: 'Work' as TaskCategory,
  energy: 'Medium' as EnergyLevel,
  date: getTodayDate(),
  startTime: '09:00',
  endTime: '10:00',
})

const customCategory = computed({
  get: () => form.category,
  set: (value: string) => {
    form.category = value
  },
})

const energyOptions = [
  { label: 'Low Energy', value: 'Low' },
  { label: 'Medium Energy', value: 'Medium' },
  { label: 'High Energy', value: 'High' },
] as const

function toMinutes(time: string): number {
  const [hourString = '0', minuteString = '0'] = time.split(':')
  const hour = Number(hourString)
  const minute = Number(minuteString)
  return hour * 60 + minute
}

const calculatedDuration = computed(() => toMinutes(form.endTime) - toMinutes(form.startTime))
const hasInvalidTimeRange = computed(() => calculatedDuration.value <= 0)
const isDisabled = computed(() => form.title.trim().length < 3 || hasInvalidTimeRange.value)
const canCreateCategory = computed(() => {
  const normalized = customCategory.value.trim()

  return (
    normalized.length >= 2 &&
    !props.categories.some((category) => category.value.toLowerCase() === normalized.toLowerCase())
  )
})
const categoryUsage = computed(() =>
  props.categories.map((category) => ({
    name: category.value,
    inUse: props.tasks.some((task) => task.category.toLowerCase() === category.value.toLowerCase()),
  })),
)

const titleInputRef = useTemplateRef<InstanceType<typeof BaseInput>>('titleInputRef')

function handleSubmit() {
  if (isDisabled.value) {
    return
  }

  emit('submit', {
    title: form.title.trim(),
    category: form.category,
    energy: form.energy,
    date: form.date,
    startTime: form.startTime,
    endTime: form.endTime,
  })

  form.title = ''
  form.category = 'Work'
  form.energy = 'Medium'
  form.date = getTodayDate()
  form.startTime = '09:00'
  form.endTime = '10:00'
}

function handleAddCategory() {
  const normalized = customCategory.value.trim()

  if (!canCreateCategory.value) {
    return
  }

  emit('addCategory', normalized)
  form.category = normalized
}

function handleRemoveCategory(category: string) {
  emit('removeCategory', category)

  if (form.category.toLowerCase() === category.toLowerCase()) {
    form.category = props.categories.find((item) => item.value.toLowerCase() !== category.toLowerCase())?.value ?? ''
  }
}

function focusTaskName() {
  titleInputRef.value?.focus()
}

defineExpose({
  focusTaskName,
})
</script>

<template>
  <BaseCard>
    <div class="mb-5">
      <p class="text-sm font-semibold tracking-[0.24em] text-sky-700 uppercase">New Task</p>
      <h2 class="mt-2 text-2xl font-semibold text-slate-950">Add a task</h2>
      <p class="mt-2 text-sm leading-6 text-slate-500">
        Add a task, choose a category, and plan the best day to do it.
      </p>
    </div>

    <form class="space-y-4" @submit.prevent="handleSubmit">
      <BaseInput
        ref="titleInputRef"
        v-model="form.title"
        label="Task Name"
        placeholder="What do you need to do?"
      />
      <BaseSelect v-model="form.category" label="Category" :options="props.categories" />
      <div class="rounded-2xl bg-slate-50 p-4">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div class="flex-1">
            <BaseInput
              v-model="customCategory"
              label="Create Category"
              placeholder="Add a new category"
            />
          </div>
          <BaseButton
            variant="secondary"
            :disabled="!canCreateCategory"
            @click="handleAddCategory"
          >
            Add Category
          </BaseButton>
        </div>
        <div class="mt-4 flex flex-wrap gap-2">
          <div
            v-for="category in categoryUsage"
            :key="category.name"
            class="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            <span class="text-slate-700">{{ category.name }}</span>
            <button
              type="button"
              class="rounded-full px-2 py-0.5 text-xs font-medium transition"
              :class="
                category.inUse
                  ? 'cursor-not-allowed bg-slate-100 text-slate-400'
                  : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
              "
              :disabled="category.inUse"
              @click="handleRemoveCategory(category.name)"
            >
              Remove
            </button>
          </div>
        </div>
        <p class="mt-3 text-xs text-slate-500">
          You can only remove a category if it is not being used by any task.
        </p>
      </div>
      <BaseSelect v-model="form.energy" label="Energy Level" :options="[...energyOptions]" />
      <BaseInput v-model="form.date" label="Planned Day" type="date" />
      <div class="grid gap-4 sm:grid-cols-2">
        <BaseInput
          v-model="form.startTime"
          label="Start Time"
          type="time"
        />
        <BaseInput
          v-model="form.endTime"
          label="End Time"
          type="time"
        />
      </div>
      <p v-if="hasInvalidTimeRange" class="text-xs text-rose-600">
        End time must be later than start time.
      </p>
      <p v-else class="text-xs text-slate-500">
        Duration will be calculated automatically: {{ calculatedDuration }} minutes.
      </p>

      <BaseButton type="submit" block :disabled="isDisabled || loading">
        {{ loading ? 'Saving...' : 'Add Task' }}
      </BaseButton>
    </form>
  </BaseCard>
</template>
