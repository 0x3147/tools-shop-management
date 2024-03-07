// module/users.ts
import { type RouteRecordRaw } from 'vue-router'

const usersRoutes: RouteRecordRaw[] = [
  {
    path: '/users',
    name: 'Users',
    meta: {
      title: '用户管理',
      icon: ''
    },
    component: () => import('@/layout/default.vue'),
    children: []
  }
  // ...其他模块路由
]

export default usersRoutes
