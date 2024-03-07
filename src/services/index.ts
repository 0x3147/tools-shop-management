import axios, { type AxiosResponse } from 'axios'
import type { IRes } from './types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const instance = axios.create({
  timeout: 10 * 1000,
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

instance.interceptors.request.use(
  (config) => {
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
    throw new Error(message)
  }
  return data as any
})

export default instance
