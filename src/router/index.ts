import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/pricemanagement',
    name: 'pricemanagement',
    component: () => import('../components/PriceManagment.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../components/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 修正点
  routes
})

export default router