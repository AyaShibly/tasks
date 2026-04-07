<script setup lang="ts">
import PageContainer from '@/components/layout/PageContainer.vue'
import ProductivityHighlights from '@/components/report/ProductivityHighlights.vue'
import ReportSummary from '@/components/report/ReportSummary.vue'
import StatCard from '@/components/report/StatCard.vue'
import { useTasks } from '@/composables/useTasks'

const { stats } = useTasks()
</script>

<template>
  <PageContainer>
    <section class="py-10 md:py-14">
      <div class="page-hero">
        <div>
          <p class="eyebrow">Progress</p>
          <h1 class="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Your Productivity Overview
          </h1>
          <p class="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            A simple summary of your progress and activity.
          </p>
        </div>
      </div>

      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Tasks" :value="stats.total" hint="All the tasks in your plan." />
        <StatCard label="Completed Tasks" :value="stats.completed" hint="Tasks you have already finished." />
        <StatCard label="Pending Tasks" :value="stats.pending" hint="Tasks still waiting for your time." />
        <StatCard label="Top Category" :value="stats.mostUsedCategory" hint="The category you use most often." />
      </div>

      <div class="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <ReportSummary :stats="stats" />
        <ProductivityHighlights :stats="stats" />
      </div>
    </section>
  </PageContainer>
</template>
