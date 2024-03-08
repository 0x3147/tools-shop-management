<script setup lang="tsx">
import Table from '@/components/table/index.vue'
import { queryCommonUser } from '@/services/user'
import type { TableColumn } from 'naive-ui/es/data-table/src/interface'
import { useRequest } from 'vue-hooks-plus'
import type { IQueryCommonUserParam } from '@/services/user/types'

const fetchCommonUser = async (params: IQueryCommonUserParam) => {
  return await queryCommonUser(params)
}

const { data, loading, run } = useRequest(fetchCommonUser, {
  defaultParams: [{ currentPage: 1, pageSize: 10 }]
})

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

const columns: TableColumn[] = [
  {
    title: '操作',
    key: 'action',
    width: 120,
    align: 'center',
    render: (row: any) => {
      return (
        <n-space>
          <n-button
            text
            type="info"
            size="small"
            onClick={() => {
              console.log(row)
            }}
          >
            升级会员
          </n-button>

          {row.isFrozen ? (
            <n-button
              text
              type="warning"
              size="small"
              onClick={() => {
                alert('解冻')
              }}
            >
              解冻
            </n-button>
          ) : (
            <n-button
              text
              type="warning"
              size="small"
              onClick={() => {
                alert('冻结')
              }}
            >
              冻结
            </n-button>
          )}

          <n-button
            text
            type="error"
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

<template>
  <Table
    :data="data?.tableData"
    :loading="loading"
    :other-columns="columns"
    :pagination="pagination"
  />
</template>
