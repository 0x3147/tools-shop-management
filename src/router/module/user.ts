import { Layout } from '@/router/constant'
import { type RouteRecordRaw } from 'vue-router'

const usersRoutes: RouteRecordRaw[] = [
  {
    path: '/users',
    name: 'Users',
    redirect: '/users/common-user',
    meta: {
      title: '用户管理',
      icon: ''
    },
    component: Layout,
    children: [
      {
        path: 'common-user',
        name: 'common-user',
        meta: { title: '普通用户列表' },
        component: () =>
          import('@/pages/user/components/common-user-list/index.vue')
      },
      {
        path: 'vip-user',
        name: 'vip-user',
        meta: { title: '会员列表' },
        component: () =>
          import('@/pages/user/components/vip-user-list/index.vue')
      },
      {
        path: 'admin-user',
        name: 'admin-user',
        meta: { title: '管理员列表' },
        component: () => import('@/pages/user/components/admin-list/index.vue')
      }
    ]
  }
]

export default usersRoutes
