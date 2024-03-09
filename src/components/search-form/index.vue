<script setup lang="ts">
export interface FormField {
  label: string // 标签文本
  key: string // 绑定到表单模型的键
  placeholder?: string // 占位文本
  type: 'text' | 'select' // 输入控件类型
  options?: Array<{ label: string; value: string | number }> // 选项，仅对type为'select'有效
}

const props = defineProps<{
  fields: FormField[]
}>()

const emits = defineEmits(['submit', 'reset'])

const formValue = ref<Record<string, any>>({})

watchEffect(() => {
  props.fields.forEach((field) => {
    if (formValue.value[field.key] === undefined) {
      formValue.value[field.key] = field.type === 'select' ? null : ''
    }
  })
})

const handleSubmit = () => {
  emits('submit', formValue.value)
}

const handleReset = () => {
  formValue.value = {}
  emits('reset')
}
</script>

<template>
  <n-form inline size="large" @submit.prevent="handleSubmit">
    <n-form-item
      v-for="field in fields"
      :key="field.key"
      :label="field.label"
      :path="field.key"
    >
      <n-input
        v-if="field.type === 'text'"
        v-model:value="formValue[field.key]"
        :placeholder="field.placeholder"
      />
      <n-select
        class="w-44"
        v-else-if="field.type === 'select'"
        v-model:value="formValue[field.key]"
        :options="field.options"
        :placeholder="field.placeholder"
      />
      <!-- 添加其他类型的控件处理 -->
    </n-form-item>
    <n-form-item>
      <n-button type="info" @click="handleSubmit">查询</n-button>
    </n-form-item>
    <n-form-item>
      <n-button type="default" @click="handleReset">重置</n-button>
    </n-form-item>
  </n-form>
</template>
