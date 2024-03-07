<script setup lang="ts">
import SideBar from '@/components/side-bar/index.vue'
import HeadBar from '@/components/head-bar/index.vue'
</script>

<template>
  <main class="h-screen overflow-hidden">
    <n-space vertical>
      <n-layout class="w-full">
        <HeadBar />
        <n-layout has-sider>
          <SideBar />
          <section class="p-4">
            <n-layout-content>
              <router-view />
            </n-layout-content>
          </section>
        </n-layout>
      </n-layout>
    </n-space>
  </main>
</template>
