import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { createAuthGuard } from './guard'

// 使用 glob 导入来自动导入 module 目录下的所有路由模块
const routeModuleFiles = import.meta.glob('./module/**/*.ts', {
  eager: true
}) as Record<string, { default: RouteRecordRaw[] }>

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    redirect: '/dashboard/console'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue')
  }
]

// 自动加载所有模块路由
for (const path in routeModuleFiles) {
  const routeModule = routeModuleFiles[path].default
  routes.push(...routeModule)
}

const router = createRouter({
  history: createWebHistory(),
  routes
})

const authGuard = createAuthGuard()
router.beforeEach(authGuard)

export default router
