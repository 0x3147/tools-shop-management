<script setup lang="tsx">
import Table from '@/components/table/index.vue'
import SearchForm, { FormField } from '@/components/search-form/index.vue'
import {
  freezeUser,
  queryCommonUser,
  unfreezeUser,
  upgradeUser
} from '@/services/user'
import type { TableColumn } from 'naive-ui/es/data-table/src/interface'
import { useRequest } from 'vue-hooks-plus'
import type {
  IFreezeUserParam,
  IQueryCommonUserParam
} from '@/services/user/types'
import { useDialog, useMessage } from 'naive-ui'

const message = useMessage()
const dialog = useDialog()

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
              handleRunUpgradeUser({
                postId: row.postId
              })
            }}
          >
            升级会员
          </n-button>

          {row.isFrozen ? (
            <n-button
              text
              type="warning"
              size="small"
              onClick={() =>
                handleRunUnFreeze({
                  postId: row.postId
                })
              }
            >
              解冻
            </n-button>
          ) : (
            <n-button
              text
              type="warning"
              size="small"
              onClick={() => handleRunFreeze({ postId: row.postId })}
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

const formFields: FormField[] = [
  {
    label: '用户名',
    key: 'username',
    placeholder: '请输入用户名',
    type: 'text'
  },
  { label: '邮箱', key: 'email', placeholder: '请输入邮箱', type: 'text' },
  {
    label: '是否冻结',
    key: 'isFrozen',
    placeholder: '请选择冻结状态',
    type: 'select',
    options: [
      { label: '已冻结', value: 1 },
      { label: '未冻结', value: 0 }
    ]
  }
]

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

const fetchCommonUser = async (params: IQueryCommonUserParam) => {
  return await queryCommonUser(params)
}

const handleFreezeUser = async (params: IFreezeUserParam) => {
  return await freezeUser(params)
}

const handleUnFreezeUser = async (params: IFreezeUserParam) => {
  return await unfreezeUser(params)
}

const handleUpgradeUser = async (params: IFreezeUserParam) => {
  return await upgradeUser(params)
}

const { data, loading, run } = useRequest(fetchCommonUser, {
  defaultParams: [{ currentPage: 1, pageSize: 10 }]
})

const { run: unFreezeUserRun } = useRequest(handleUnFreezeUser, {
  manual: true,
  onSuccess: () => {
    message.success('解冻用户成功!')
    run({
      currentPage: pagination.value.page,
      pageSize: pagination.value.pageSize
    })
  }
})

const { run: freezeUserRun } = useRequest(handleFreezeUser, {
  manual: true,
  onSuccess: () => {
    message.success('冻结用户成功!')
    run({
      currentPage: pagination.value.page,
      pageSize: pagination.value.pageSize
    })
  }
})

const { run: upgradeUserRun } = useRequest(handleUpgradeUser, {
  manual: true,
  onSuccess: () => {
    message.success('升级用户成功!')
    run({
      currentPage: pagination.value.page,
      pageSize: pagination.value.pageSize
    })
  }
})

const handleRunFreeze = (param: IFreezeUserParam) => {
  dialog.warning({
    title: '提示',
    content: '确定对该用户进行冻结吗？',
    positiveText: '确定',
    negativeText: '我再想想',
    onPositiveClick: () => {
      freezeUserRun(param)
    }
  })
}

const handleRunUnFreeze = (param: IFreezeUserParam) => {
  dialog.warning({
    title: '提示',
    content: '确定对该用户进行解冻吗？',
    positiveText: '确定',
    negativeText: '我再想想',
    onPositiveClick: () => {
      unFreezeUserRun(param)
    }
  })
}

const handleRunUpgradeUser = (param: IFreezeUserParam) => {
  dialog.warning({
    title: '提示',
    content: '确定将该用户升级为会员吗？',
    positiveText: '确定',
    negativeText: '我再想想',
    onPositiveClick: () => {
      upgradeUserRun(param)
    }
  })
}

const onSubmit = (formData: Record<string, any>) => {
  const params = {
    currentPage: pagination.value.page,
    pageSize: pagination.value.pageSize,
    username: formData.username,
    email: formData.email,
    isFrozen: formData.isFrozen
  }
  run(params)
}

const onReset = () => {
  run({
    currentPage: pagination.value.page,
    pageSize: pagination.value.pageSize
  })
}

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
  <SearchForm :fields="formFields" @submit="onSubmit" @reset="onReset" />
  <Table
    :data="data?.tableData"
    :loading="loading"
    :other-columns="columns"
    :pagination="pagination"
  />
</template>
