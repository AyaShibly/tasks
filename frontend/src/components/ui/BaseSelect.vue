<script setup lang="ts" generic="T extends string">
import type { SelectOption } from '@/types'

defineProps<{
  modelValue: T
  label?: string
  options: SelectOption<T>[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: T]
}>()
</script>

<template>
  <label class="flex flex-col gap-2 text-sm font-medium text-slate-700">
    <span v-if="label">{{ label }}</span>
    <div class="relative">
      <select
        :value="modelValue"
        class="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
        @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value as T)"
      >
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <span class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">v</span>
    </div>
  </label>
</template>
