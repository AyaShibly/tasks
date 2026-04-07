import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import ReportPage from '@/pages/ReportPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import TasksPage from '@/pages/TasksPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { title: 'PLANURD | Plan your day' },
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TasksPage,
      meta: { title: 'PLANURD | Your Tasks', requiresAuth: true },
    },
    {
      path: '/report',
      name: 'report',
      component: ReportPage,
      meta: { title: 'PLANURD | Productivity Overview', requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: { title: 'PLANURD | Login' },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
      meta: { title: 'PLANURD | Register' },
    },
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

router.beforeEach(async (to) => {
  const auth = useAuth()
  await auth.hydrate()

  if (to.meta.requiresAuth && !auth.isAuthenticated.value) {
    return { name: 'login' }
  }

  if (
    auth.isAuthenticated.value &&
    (to.name === 'login' || to.name === 'register')
  ) {
    return { name: 'tasks' }
  }

  return true
})

router.afterEach((to) => {
  document.title = String(to.meta.title ?? 'PLANURD')
})

export default router
