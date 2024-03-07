<script setup lang="ts">
import { MenuOption } from 'naive-ui'

const router = useRouter()
const route = useRoute()

// 动态生成菜单选项
const menuOptions = computed<MenuOption[]>(() => {
  return router.options.routes
    .filter((route) => route.meta && route.meta.showInMenu)
    .map((route) => {
      const option: MenuOption = {
        label: route.meta!.title as string,
        key: route.name as string,
        icon: route.meta!.icon as any
      }

      if (route.children) {
        option.children = route.children
          .filter((child) => child.meta && child.meta.showInMenu)
          .map((child) => ({
            label: child.meta!.title as string,
            key: child.name as string
          }))
      }

      return option
    })
})

const activeRoute = ref(route.name)

const handleMenuSelect = (key: string) => {
  router.push({ name: key })
}
</script>

<template>
  <n-layout has-sider>
    <n-layout-sider width="200px">
      <n-menu
        :options="menuOptions"
        v-model:value="activeRoute"
        @update:value="handleMenuSelect"
      />
    </n-layout-sider>
    <n-layout-content>
      <router-view />
    </n-layout-content>
  </n-layout>
</template>
