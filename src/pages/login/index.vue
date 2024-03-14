<script setup lang="ts">
import { PersonOutline, LockClosedOutline } from '@vicons/ionicons5'

const loginFormModel = ref({
  username: null,
  password: null
})

const rules = {
  username: [{ required: true, message: '用户名为必填项', trigger: 'blur' }],
  password: [{ required: true, message: '密码为必填项', trigger: 'blur' }]
}

const handleSubmit = () => {}
</script>

<template>
  <main
    class="bg-login-background flex h-screen flex-col bg-[length:100%] bg-center bg-no-repeat"
  >
    <section class="p-8 text-center">
      <div></div>
      <div class="text-3xl text-[#808695]">JUMP MANAGEMENT</div>
    </section>
    <section class="mx-auto min-w-min max-w-lg flex-1 p-8">
      <n-form
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
          <n-button type="info" @click="handleSubmit" size="large" block>
            登录
          </n-button>
        </n-form-item>
      </n-form>
    </section>
  </main>
</template>
