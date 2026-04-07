<script setup lang="ts">
import type { EnergyLevel } from '@/types'

defineProps<{
  modelValue: EnergyLevel | 'All'
  options: Array<EnergyLevel | 'All'>
}>()

const emit = defineEmits<{
  'update:modelValue': [value: EnergyLevel | 'All']
}>()
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="option in options"
      :key="option"
      type="button"
      class="rounded-full px-4 py-2 text-sm font-medium transition"
      :class="
        modelValue === option
          ? 'bg-slate-900 text-white shadow-[var(--shadow-soft)]'
          : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-900'
      "
      @click="emit('update:modelValue', option)"
    >
      {{
        option === 'All'
          ? 'All Energy'
          : option === 'Low'
            ? 'Low Energy'
            : option === 'Medium'
              ? 'Medium Energy'
              : 'High Energy'
      }}
    </button>
  </div>
</template>
