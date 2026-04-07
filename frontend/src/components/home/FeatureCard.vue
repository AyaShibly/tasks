<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'

defineProps<{
  title: string
  description: string
  accent: string
  stat: string
}>()
</script>

<template>
  <BaseCard class="h-full">
    <div class="flex h-full flex-col gap-5">
      <div class="flex items-center justify-between">
        <span
          class="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-semibold"
          :class="accent"
        >
          {{ stat }}
        </span>
      </div>
      <div>
        <h3 class="text-xl font-semibold text-slate-950">{{ title }}</h3>
        <p class="mt-3 text-sm leading-6 text-slate-600">{{ description }}</p>
      </div>
    </div>
  </BaseCard>
</template>
