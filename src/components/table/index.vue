<script setup lang="tsx">
import type { tableData } from '@/services/user/types'
import dayjs from 'dayjs'
import { TableColumn } from 'naive-ui/es/data-table/src/interface'

const props = defineProps({
  data: {
    type: Array as PropType<tableData[]>,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  otherColumns: {
    type: Array as PropType<TableColumn[]>,
    default: () => []
  },
  pagination: {
    type: Object as PropType<any>,
    default: () => ({})
  }
})

const columns = ref<TableColumn[]>([
  {
    title: '用户ID',
    key: 'postId',
    width: 120,
    align: 'center'
  },
  {
    title: '用户名',
    key: 'username',
    width: 120,
    align: 'center'
  },
  {
    title: '邮箱',
    key: 'email',
    width: 120,
    align: 'center'
  },
  {
    title: '是否冻结',
    key: 'isFrozen',
    width: 80,
    align: 'center',
    render: (rowData: any) => (rowData.isFrozen ? '是' : '否')
  },
  {
    title: '创建时间',
    key: 'createdTime',
    width: 120,
    align: 'center',
    render: (rowData: any) =>
      dayjs(rowData.createTime).format('YYYY-MM-DD HH:mm:ss')
  }
])

const finalColumns = computed(() => {
  return columns.value.concat(props.otherColumns)
})
</script>

<template>
  <n-data-table
    remote
    :single-line="false"
    single-column
    :columns="finalColumns"
    :data="data"
    :loading="loading"
    :pagination="pagination"
  />
</template>
