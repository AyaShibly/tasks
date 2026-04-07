<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'

defineProps<{
  label: string
  value: string | number
  hint: string
}>()
</script>

<template>
  <BaseCard>
    <p class="text-sm font-medium text-slate-500">{{ label }}</p>
    <p class="mt-4 text-3xl font-semibold tracking-tight text-slate-950">{{ value }}</p>
    <p class="mt-3 text-sm text-slate-500">{{ hint }}</p>
  </BaseCard>
</template>
