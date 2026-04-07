<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import PageContainer from '@/components/layout/PageContainer.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { login } = useAuth()

const form = reactive({
  email: '',
  password: '',
})

const errorMessage = ref('')
const loading = ref(false)

async function handleSubmit() {
  loading.value = true
  errorMessage.value = ''

  try {
    await login(form)
    await router.push('/tasks')
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Unable to sign in.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <PageContainer>
    <section class="mx-auto max-w-md py-14">
      <BaseCard>
        <p class="eyebrow">Welcome Back</p>
        <h1 class="mt-4 text-3xl font-semibold text-slate-950">Log in to PLANURD</h1>
        <p class="mt-3 text-sm leading-6 text-slate-500">
          Save your tasks, keep your categories, and continue your plan from anywhere.
        </p>

        <form class="mt-6 space-y-4" @submit.prevent="handleSubmit">
          <BaseInput v-model="form.email" label="Email" type="email" placeholder="you@example.com" />
          <BaseInput v-model="form.password" label="Password" type="password" placeholder="Enter your password" />

          <p v-if="errorMessage" class="text-sm text-rose-600">{{ errorMessage }}</p>

          <BaseButton type="submit" block :disabled="loading">
            {{ loading ? 'Logging in...' : 'Log In' }}
          </BaseButton>
        </form>

        <p class="mt-4 text-sm text-slate-500">
          New here?
          <RouterLink class="font-medium text-sky-700" to="/register">Create an account</RouterLink>
        </p>
      </BaseCard>
    </section>
  </PageContainer>
</template>
