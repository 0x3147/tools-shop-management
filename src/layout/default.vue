<script setup lang="ts">
import SideBar from '@/components/side-bar/index.vue'
import HeadBar from '@/components/head-bar/index.vue'
</script>

<template>
  <main class="h-screen overflow-hidden">
    <n-space vertical>
      <n-layout>
        <HeadBar />
        <n-layout has-sider>
          <SideBar />
          <n-layout-content embedded class="p-10">
            <router-view />
          </n-layout-content>
        </n-layout>
      </n-layout>
    </n-space>
  </main>
</template>
