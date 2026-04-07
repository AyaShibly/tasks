<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import PageContainer from '@/components/layout/PageContainer.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { register } = useAuth()

const form = reactive({
  name: '',
  email: '',
  password: '',
})

const errorMessage = ref('')
const loading = ref(false)

async function handleSubmit() {
  loading.value = true
  errorMessage.value = ''

  try {
    await register(form)
    await router.push('/tasks')
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Unable to create your account.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <PageContainer>
    <section class="mx-auto max-w-md py-14">
      <BaseCard>
        <p class="eyebrow">Get Started</p>
        <h1 class="mt-4 text-3xl font-semibold text-slate-950">Create your account</h1>
        <p class="mt-3 text-sm leading-6 text-slate-500">
          Start saving your tasks, categories, and daily progress in one place.
        </p>

        <form class="mt-6 space-y-4" @submit.prevent="handleSubmit">
          <BaseInput v-model="form.name" label="Name" placeholder="Your name" />
          <BaseInput v-model="form.email" label="Email" type="email" placeholder="you@example.com" />
          <BaseInput v-model="form.password" label="Password" type="password" placeholder="Create a password" />

          <p v-if="errorMessage" class="text-sm text-rose-600">{{ errorMessage }}</p>

          <BaseButton type="submit" block :disabled="loading">
            {{ loading ? 'Creating account...' : 'Register' }}
          </BaseButton>
        </form>

        <p class="mt-4 text-sm text-slate-500">
          Already have an account?
          <RouterLink class="font-medium text-sky-700" to="/login">Log in</RouterLink>
        </p>
      </BaseCard>
    </section>
  </PageContainer>
</template>
