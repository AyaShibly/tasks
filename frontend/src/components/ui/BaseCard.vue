<script setup lang="ts">
withDefaults(
  defineProps<{
    padded?: boolean
  }>(),
  {
    padded: true,
  },
)
</script>

<template>
  <div
    class="glass-panel rounded-[var(--radius-xl)] transition duration-200 ease-out hover:shadow-[0_24px_60px_-30px_rgba(15,23,42,0.28)]"
    :class="padded ? 'p-5 sm:p-6' : ''"
  >
    <slot />
  </div>
</template>
