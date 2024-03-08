<script setup lang="tsx">
import Table from '@/components/table/index.vue'
import { queryCommonUser } from '@/services/user'
import { IQCommonUserRes } from '@/services/user/types'
import { TableColumn } from 'naive-ui/es/data-table/src/interface'

const commonUserResource = ref<IQCommonUserRes>({} as IQCommonUserRes)
const loading = ref(false)

onMounted(async () => {
  commonUserResource.value = await fetchCommonUser()
})

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
          <n-button
            text
            type="warning"
            size="small"
            onClick={() => {
              alert(row.postId)
            }}
          >
            冻结
          </n-button>
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

const fetchCommonUser = async () => {
  const params = {
    currentPage: 1,
    pageSize: 10
  }
  loading.value = true
  const res = await queryCommonUser(params)
  loading.value = false
  return res
}
</script>

<template>
  <Table
    :data="commonUserResource.tableData"
    :loading="loading"
    :other-columns="columns"
  />
</template>
