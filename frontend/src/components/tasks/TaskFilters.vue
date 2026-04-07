<script setup lang="ts">
import BaseSelect from '@/components/ui/BaseSelect.vue'
import type { EnergyLevel, SelectOption, TaskCategory } from '@/types'
import type { TaskFilter } from '@/utils/taskHelpers'

defineProps<{
  status: TaskFilter
  category: TaskCategory | 'All'
  energy: EnergyLevel | 'All'
  categoryOptions: SelectOption<TaskCategory | 'All'>[]
  energyOptions: SelectOption<EnergyLevel | 'All'>[]
}>()

const emit = defineEmits<{
  'update:status': [value: TaskFilter]
  'update:category': [value: TaskCategory | 'All']
  'update:energy': [value: EnergyLevel | 'All']
}>()

const statusOptions: SelectOption<TaskFilter>[] = [
  { label: 'All tasks', value: 'all' },
  { label: 'Pending tasks', value: 'pending' },
  { label: 'Completed tasks', value: 'completed' },
]
</script>

<template>
  <div class="grid gap-3 md:grid-cols-3">
    <BaseSelect
      :model-value="status"
      label="Status"
      :options="statusOptions"
      @update:model-value="emit('update:status', $event)"
    />
    <BaseSelect
      :model-value="category"
      label="Category"
      :options="categoryOptions"
      @update:model-value="emit('update:category', $event)"
    />
    <BaseSelect
      :model-value="energy"
      label="Energy Level"
      :options="energyOptions"
      @update:model-value="emit('update:energy', $event)"
    />
  </div>
</template>
