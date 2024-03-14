import { useAuthStore } from '@/store/authStore.ts'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export function createAuthGuard() {
  return async function (
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) {
    const authStore = useAuthStore()

    if (authStore.isTokenExpired()) {
      if (to.path !== '/login') {
        next({ path: '/login' })
      } else {
        next() // 用户已经在登录页面，无需重定向
      }
    } else {
      // 用户 token 是有效的，继续路由导航
      next()
    }
  }
}
