import { Layout } from '@/router/constant'
import { type RouteRecordRaw } from 'vue-router'

const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    redirect: '/dashboard/console',
    meta: {
      title: 'Dashboard',
      icon: ''
    },
    component: Layout,
    children: [
      {
        path: 'console',
        name: 'console',
        meta: { title: '主控台' },
        component: () => import('@/pages/dashboard/console/index.vue')
      },
      {
        path: 'workplace',
        name: 'workplace',
        meta: { title: '工作台' },
        component: () => import('@/pages/dashboard/workplace/index.vue')
      }
    ]
  }
]

export default dashboardRoutes
