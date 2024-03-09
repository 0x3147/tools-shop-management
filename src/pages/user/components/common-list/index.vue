<script setup lang="tsx">
import Table from '@/components/table/index.vue'
import { queryCommonUser } from '@/services/user'
import type { TableColumn } from 'naive-ui/es/data-table/src/interface'
import { useRequest } from 'vue-hooks-plus'
import type { IQueryCommonUserParam } from '@/services/user/types'

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
            type="success"
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

const selectOptions = [
  {
    label: '冻结',
    value: 1
  },
  {
    label: '未冻结',
    value: 0
  }
]

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

const formValue = ref({
  username: '',
  email: '',
  isFrozen: null
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
  <n-form inline size="large" :model="formValue">
    <n-form-item label="用户名" path="username">
      <n-input v-model:value="formValue.username" placeholder="请输入用户名" />
    </n-form-item>
    <n-form-item label="邮箱" path="email">
      <n-input v-model:value="formValue.email" placeholder="请输入邮箱" />
    </n-form-item>
    <n-form-item label="是否冻结" path="isFrozen">
      <n-select
        class="w-44"
        v-model:value="formValue.isFrozen"
        :options="selectOptions"
        placeholder="请选择冻结状态"
      />
    </n-form-item>
    <n-form-item>
      <n-button type="info" attr-type="submit"> 查询 </n-button>
    </n-form-item>
    <n-form-item>
      <n-button type="default"> 重置 </n-button>
    </n-form-item>
  </n-form>
  <Table
    :data="data?.tableData"
    :loading="loading"
    :other-columns="columns"
    :pagination="pagination"
  />
</template>
