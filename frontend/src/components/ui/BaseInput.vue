<script setup lang="ts">
import { useTemplateRef } from 'vue'

defineProps<{
  modelValue: string
  label?: string
  placeholder?: string
  type?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputRef = useTemplateRef<HTMLInputElement>('inputRef')

function focus() {
  inputRef.value?.focus()
}

defineExpose({
  focus,
})
</script>

<template>
  <label class="flex flex-col gap-2 text-sm font-medium text-slate-700">
    <span v-if="label">{{ label }}</span>
    <input
      ref="inputRef"
      :value="modelValue"
      :placeholder="placeholder"
      :type="type ?? 'text'"
      class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </label>
</template>
