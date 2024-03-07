<script setup lang="ts">
import SideBar from '@/components/side-bar/index.vue'
</script>

<template>
  <main class="flex h-screen overflow-hidden">
    <n-layout has-sider class="flex w-full">
      <SideBar class="min-h-screen" />
      <section class="p-4">
        <n-layout-content>
          <router-view />
        </n-layout-content>
      </section>
    </n-layout>
  </main>
</template>
