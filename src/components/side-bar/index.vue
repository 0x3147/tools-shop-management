<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { MenuOption } from 'naive-ui'

const router = useRouter()
const route = useRoute()

const menuOptions = computed<MenuOption[]>(() => {
  return router.options.routes
    .filter((r) => r.meta)
    .map((r) => {
      const option: MenuOption = {
        label: r.meta!.title as string,
        key: r.name as string
      }

      if (r.children) {
        option.children = r.children
          .filter((child) => child.meta)
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
  <n-layout-sider
    bordered
    show-trigger
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :native-scrollbar="false"
    style="max-height: 320px"
  >
    <n-menu
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
      v-model:value="activeRoute"
      @update:value="handleMenuSelect"
    />
  </n-layout-sider>
</template>
