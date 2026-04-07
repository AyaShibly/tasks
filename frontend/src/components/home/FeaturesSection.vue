<script setup lang="ts">
import FeatureCard from '@/components/home/FeatureCard.vue'
import PageContainer from '@/components/layout/PageContainer.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'

const features = [
  {
    title: 'Smart Task Planning',
    description: 'Easily create and organize your daily tasks',
    accent: 'bg-sky-100 text-sky-700',
    stat: '01',
  },
  {
    title: 'Energy-Based Work',
    description: 'Choose tasks based on how you feel',
    accent: 'bg-emerald-100 text-emerald-700',
    stat: '02',
  },
  {
    title: 'Simple Progress Tracking',
    description: 'Stay motivated by tracking your progress',
    accent: 'bg-violet-100 text-violet-700',
    stat: '03',
  },
]
</script>

<template>
  <PageContainer>
    <section class="py-12 md:py-16">
      <SectionHeading
        eyebrow="Why It Works"
        title="Everything you need to plan your day in one simple space."
        description="Create tasks, match them to your energy, and keep moving forward with a clear plan."
      />

      <div class="mt-8 grid gap-5 md:grid-cols-3">
        <FeatureCard
          v-for="feature in features"
          :key="feature.title"
          :title="feature.title"
          :description="feature.description"
          :accent="feature.accent"
          :stat="feature.stat"
        />
      </div>
    </section>
  </PageContainer>
</template>
