<script setup lang="ts">
import SideBar from '@/components/side-bar/index.vue'
</script>

<template>
  <n-layout has-sider>
    <SideBar />
    <n-layout-content>
      <router-view />
    </n-layout-content>
  </n-layout>
</template>
