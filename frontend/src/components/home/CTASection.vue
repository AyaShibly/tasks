<script setup lang="ts">
import { RouterLink } from 'vue-router'
import PageContainer from '@/components/layout/PageContainer.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
</script>

<template>
  <PageContainer>
    <section class="py-12 md:py-16">
      <div class="overflow-hidden rounded-[2rem] bg-slate-900 px-6 py-10 text-white sm:px-10">
        <div class="max-w-3xl">
          <p class="eyebrow border-white/10 bg-white/10 text-sky-100">Start Today</p>
          <h2 class="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
            Start planning your day today
          </h2>
          <p class="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            Add your tasks, organize your time, and move through the day with more clarity.
          </p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <RouterLink to="/tasks">
              <BaseButton size="lg" variant="secondary">Go to Tasks</BaseButton>
            </RouterLink>
            <RouterLink to="/report">
              <BaseButton size="lg" variant="ghost">View Progress</BaseButton>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </PageContainer>
</template>
