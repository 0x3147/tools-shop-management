<script setup lang="ts">
import Table from '@/components/table/index.vue'
import { queryAdmin } from '@/services/user'
import { useRequest } from 'vue-hooks-plus'
import type { IQueryCommonUserParam } from '@/services/user/types'

const pagination = ref({
  page: 1,
  pageCount: 1,
  itemCount: 10,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 30, 50, 100],
  onChange: (page: number) => {
    pagination.value.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.value.pageSize = pageSize
    pagination.value.page = 1
  }
})

const fetchAdmin = async (param: IQueryCommonUserParam) => {
  return await queryAdmin(param)
}

const { run, data, loading } = useRequest(fetchAdmin, {
  defaultParams: [{ currentPage: 1, pageSize: 10 }]
})

watch(data, (newValue) => {
  if (newValue !== undefined) {
    pagination.value.page = newValue.currentPage
    pagination.value.pageCount = newValue.lastPage
    pagination.value.itemCount = newValue.total
  }
})

watch(
  () => pagination.value.page,
  (newData) => {
    if (newData !== undefined) {
      run({ currentPage: newData, pageSize: pagination.value.pageSize })
    }
  }
)

watch(
  () => pagination.value.pageSize,
  (newData) => {
    if (newData !== undefined) {
      run({ currentPage: pagination.value.page, pageSize: newData })
    }
  }
)
</script>

<template>
  <Table :data="data?.tableData" :loading="loading" :pagination="pagination" />
</template>
