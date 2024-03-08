<template>
  <n-data-table
    remote
    :single-line="false"
    single-column
    :columns="columns"
    :data="data"
  />
</template>

<script setup lang="tsx">
import type { tableData } from '@/services/user/types'
import dayjs from 'dayjs'

defineProps({
  data: {
    type: Array as PropType<tableData[]>,
    default: () => []
  }
})

const columns = [
  {
    title: '用户ID',
    key: 'postId',
    width: 120
  },
  {
    title: '用户名',
    key: 'username',
    width: 120
  },
  {
    title: '邮箱',
    key: 'email',
    width: 120
  },
  {
    title: '是否冻结',
    key: 'isFrozen',
    width: 80,
    render: (rowData: tableData) => (rowData.isFrozen ? '是' : '否')
  },
  {
    title: '创建时间',
    key: 'createdTime',
    width: 120,
    render: (rowData: tableData) =>
      dayjs(rowData.createTime).format('YYYY-MM-DD HH:mm:ss')
  },
  {
    title: '操作',
    key: 'action',
    width: 120,
    render: (row: tableData) => {
      return (
        <n-space>
          <n-button
            text
            size="small"
            onClick={() => {
              console.log(row)
            }}
          >
            冻结
          </n-button>
          <n-button
            text
            size="small"
            onClick={() => {
              console.log(row)
            }}
          >
            升级为会员
          </n-button>
          <n-button
            text
            size="small"
            onClick={() => {
              console.log(row)
            }}
          >
            删除
          </n-button>
        </n-space>
      )
    }
  }
]
</script>
