import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BudgetView from '@/views/BudgetView.vue'
import ProfilView from '@/views/ProfilView.vue'
import AuthView from '@/views/AuthView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/budget',
      name: 'budget',
      component: BudgetView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilView,
    },

    {
      path: '/authentification',
      name: 'authentification',
      component: AuthView,
    },
  ],
})

export default router
