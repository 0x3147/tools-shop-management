<script setup lang="ts">
import Table from '@/components/table/index.vue'
import { queryCommonUser } from '@/services/user'
import { IQCommonUserRes } from '@/services/user/types'

const commonUserResource = ref<IQCommonUserRes>({})

const fetchCommonUser = async () => {
  const params = {
    currentPage: 1,
    pageSize: 10
  }
  return await queryCommonUser(params)
}

onMounted(async () => {
  commonUserResource.value = await fetchCommonUser()
})
</script>

<template>
  <Table :data="commonUserResource.tableData" />
</template>
