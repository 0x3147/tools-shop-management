import { useAuthStore } from '@/store/authStore.ts'
import axios, { type AxiosResponse } from 'axios'
import { createDiscreteApi } from 'naive-ui'
import type { IRes } from './types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const instance = axios.create({
  timeout: 10 * 1000,
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const { message: msg } = createDiscreteApi(['message'], {})

instance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const token = authStore.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(async (res: AxiosResponse) => {
  const resData: IRes = res.data || {}
  const { message, data, success } = resData
  if (!success) {
    msg.error(message)
    throw new Error(message)
  }
  return data as any
})

export default instance
