import { Layout } from '@/router/constant'
import { renderIcon } from '@/utils'
import { UserOutlined } from '@vicons/antd'
import { type RouteRecordRaw } from 'vue-router'

const usersRoutes: RouteRecordRaw[] = [
  {
    path: '/users',
    name: 'Users',
    redirect: '/users/common-user',
    meta: {
      title: '用户管理',
      icon: renderIcon(UserOutlined)
    },
    component: Layout,
    children: [
      {
        path: 'common',
        name: 'common',
        meta: { title: '普通用户列表' },
        component: () => import('@/pages/user/components/common-list/index.vue')
      },
      {
        path: 'member',
        name: 'member',
        meta: { title: '会员列表' },
        component: () => import('@/pages/user/components/member-list/index.vue')
      },
      {
        path: 'admin',
        name: 'admin',
        meta: { title: '管理员列表' },
        component: () => import('@/pages/user/components/admin-list/index.vue')
      }
    ]
  }
]

export default usersRoutes
