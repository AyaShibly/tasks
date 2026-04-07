<script setup lang="ts">
import PageContainer from '@/components/layout/PageContainer.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
</script>

<template>
  <PageContainer>
    <section class="py-12 md:py-16">
      <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeading
          eyebrow="Interface Preview"
          title="A clean workspace for planning tasks and tracking progress."
          description="See your tasks, organize your day, and stay on top of what matters most."
        />

        <div class="glass-panel overflow-hidden rounded-[2rem] p-4 sm:p-6">
          <div class="grid gap-4 lg:grid-cols-[0.72fr_1fr]">
            <div class="rounded-[1.5rem] bg-slate-900 p-5 text-white">
              <p class="text-sm text-white/70">Add Task</p>
              <div class="mt-4 space-y-3">
                <div class="h-11 rounded-2xl bg-white/10"></div>
                <div class="grid grid-cols-2 gap-3">
                  <div class="h-11 rounded-2xl bg-white/10"></div>
                  <div class="h-11 rounded-2xl bg-white/10"></div>
                </div>
                <div class="h-11 rounded-2xl bg-sky-400"></div>
              </div>
            </div>

            <div class="rounded-[1.5rem] border border-white/80 bg-white p-5">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-slate-500">Your Tasks</p>
                  <p class="mt-1 text-xl font-semibold text-slate-950">Today and upcoming</p>
                </div>
                <div class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  planned
                </div>
              </div>

              <div class="mt-5 space-y-3">
                <div class="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div class="flex items-center justify-between">
                    <p class="font-medium text-slate-900">Finish morning priority task</p>
                    <span class="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">High Energy</span>
                  </div>
                </div>
                <div class="rounded-2xl border border-slate-100 bg-white p-4">
                  <div class="flex items-center justify-between">
                    <p class="font-medium text-slate-900">Plan your afternoon tasks</p>
                    <span class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Low Energy</span>
                  </div>
                </div>
                <div class="rounded-2xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">
                  Clear actions and simple views help you stay focused without feeling overwhelmed.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </PageContainer>
</template>
