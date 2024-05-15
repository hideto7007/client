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
    path: '/stockpriceprediction',
    name: 'stockpriceprediction',
    component: () => import('../views/StockPricePrediction.vue')
  },
  {
    path: '/mypage/version',
    name: 'version',
    component: () => import('../views/mypage/Version.vue')
  }
]

// Jestテスト環境かどうかを判定
const isTestEnv = process.env.NODE_ENV === 'test'

// テスト環境であればモックの値を、そうでなければ `import.meta.env.BASE_URL` を使用
const historyMode = isTestEnv ? '/' : import.meta.env.BASE_URL

const router = createRouter({
  history: createWebHistory(historyMode), // 修正点
  routes
});

export default router;