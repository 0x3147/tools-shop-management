<script setup lang="ts">
import { PersonOutline, LockClosedOutline } from '@vicons/ionicons5'
import { useRequest } from 'vue-hooks-plus'
import { adminLogin } from '@/services/user'
import { FormInst, useMessage } from 'naive-ui'
import { useAuthStore } from '@/store/authStore.ts'

const useStore = useAuthStore()

const message = useMessage()

const router = useRouter()

const { loading, run: loginRun } = useRequest(adminLogin, {
  manual: true,
  onSuccess: (res) => {
    useStore.saveLoginUser(res)
    message.success('登录成功!')
    router.replace('/')
  }
})

const formRef = ref<FormInst | null>(null)

const loginFormModel = ref({
  username: null,
  password: null
})

const rules = {
  username: [{ required: true, message: '用户名为必填项', trigger: 'blur' }],
  password: [{ required: true, message: '密码为必填项', trigger: 'blur' }]
}

const handleSubmit = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      const { username, password } = loginFormModel.value

      const params = {
        username,
        password,
        permissions: ['have_all_permissions']
      }
      loginRun(params)
    } else {
      message.error('请填写必填信息!')
    }
  })
}
</script>

<template>
  <main
    class="flex h-screen flex-col bg-login-background bg-[length:100%] bg-center bg-no-repeat"
  >
    <section class="p-8 text-center">
      <div></div>
      <div class="text-3xl text-[#808695]">JUMP MANAGEMENT</div>
    </section>
    <section class="mx-auto min-w-min max-w-lg flex-1 p-8">
      <n-form
        ref="formRef"
        label-placement="left"
        size="large"
        :model="loginFormModel"
        :rules="rules"
      >
        <n-form-item path="username">
          <n-input
            placeholder="请输入用户名"
            v-model:value="loginFormModel.username"
          >
            <template #prefix>
              <n-icon size="18" color="#808695">
                <PersonOutline />
              </n-icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="password">
          <n-input
            placeholder="请输入密码"
            type="password"
            v-model:value="loginFormModel.password"
            showPasswordOn="click"
          >
            <template #prefix>
              <n-icon size="18" color="#808695">
                <LockClosedOutline />
              </n-icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item>
          <n-button
            type="info"
            @click="handleSubmit"
            size="large"
            :loading="loading"
            block
          >
            登录
          </n-button>
        </n-form-item>
      </n-form>
    </section>
  </main>
</template>
