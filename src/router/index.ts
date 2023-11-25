import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home.vue')
  },
  {
    path: '/pricemanagement',
    name: 'pricemanagement',
    component: () => import('../views/PriceManagment.vue')
  },
  {
    path: '/annualincomemanagement',
    name: 'annualincomemanagement',
    component: () => import('../views/AnnualIncomeManagement.vue')
  },
  {
    path: '/mypage/version',
    name: 'version',
    component: () => import('../views/mypage/Version.vue')
  }
]

// const isProduction = import.meta.env.MODE === 'production';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 修正点
  routes
});

export default router;