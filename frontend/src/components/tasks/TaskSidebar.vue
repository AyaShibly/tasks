<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'
import EnergySelector from '@/components/tasks/EnergySelector.vue'
import TaskForm from '@/components/tasks/TaskForm.vue'
import type { EnergyLevel, Task, TaskCategory } from '@/types'

defineProps<{
  open: boolean
  categories: Array<{ label: string; value: string }>
  tasks: Task[]
  quickEnergy: EnergyLevel | 'All'
  loading: boolean
}>()

const emit = defineEmits<{
  close: []
  submit: [
    payload: {
      title: string
      category: TaskCategory
      energy: EnergyLevel
      date: string
      startTime: string
      endTime: string
    },
  ]
  addCategory: [category: string]
  removeCategory: [category: string]
  'update:quickEnergy': [value: EnergyLevel | 'All']
}>()
</script>

<template>
  <div class="hidden xl:block xl:w-[380px]">
    <div class="sticky top-24 space-y-6">
      <BaseCard>
        <p class="text-sm font-medium text-slate-500">Choose your energy</p>
        <p class="mt-2 text-sm leading-6 text-slate-600">
          Focus on the tasks that fit your energy right now.
        </p>
        <div class="mt-4">
          <EnergySelector
            :model-value="quickEnergy"
            :options="['All', 'Low', 'Medium', 'High']"
            @update:model-value="emit('update:quickEnergy', $event)"
          />
        </div>
      </BaseCard>

      <TaskForm
        :categories="categories"
        :tasks="tasks"
        :loading="loading"
        @submit="emit('submit', $event)"
        @add-category="emit('addCategory', $event)"
        @remove-category="emit('removeCategory', $event)"
      />
    </div>
  </div>

  <teleport to="body">
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[55] bg-slate-950/35 backdrop-blur-sm xl:hidden"
        @click.self="emit('close')"
      >
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="-translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="translate-x-0"
          leave-to-class="-translate-x-full"
        >
          <aside
            v-if="open"
            class="h-full w-full max-w-sm overflow-y-auto border-r border-white/60 bg-[var(--color-bg)] p-4 shadow-[var(--shadow-card)]"
          >
            <div class="mb-4 flex items-center justify-between">
              <div>
                <p class="eyebrow">Task Menu</p>
                <h2 class="mt-3 text-2xl font-semibold text-slate-950">Plan your tasks</h2>
              </div>
              <button
                type="button"
                class="rounded-full px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-white hover:text-slate-900"
                @click="emit('close')"
              >
                Close
              </button>
            </div>

            <div class="space-y-4">
              <BaseCard>
                <p class="text-sm font-medium text-slate-500">Choose your energy</p>
                <div class="mt-4">
                  <EnergySelector
                    :model-value="quickEnergy"
                    :options="['All', 'Low', 'Medium', 'High']"
                    @update:model-value="emit('update:quickEnergy', $event)"
                  />
                </div>
              </BaseCard>

              <TaskForm
                :categories="categories"
                :tasks="tasks"
                :loading="loading"
                @submit="emit('submit', $event)"
                @add-category="emit('addCategory', $event)"
                @remove-category="emit('removeCategory', $event)"
              />
            </div>
          </aside>
        </transition>
      </div>
    </transition>
  </teleport>
</template>
