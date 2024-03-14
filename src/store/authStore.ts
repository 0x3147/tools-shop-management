import type { ILoginUserRes } from '@/services/user/types'
import dayjs from 'dayjs'
import { defineStore } from 'pinia'

interface AuthState {
  loginUser: ILoginUserRes | null
  tokenExpiry: number | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    loginUser: null,
    tokenExpiry: null
  }),
  actions: {
    saveLoginUser(loginUserVo: ILoginUserRes) {
      this.loginUser = loginUserVo
      // 设置 token 有效期为7天
      this.tokenExpiry = dayjs().add(7, 'day').valueOf()
    },

    getToken() {
      return this.loginUser?.token
    },

    isTokenExpired(): boolean {
      if (!this.tokenExpiry) return true
      const now = dayjs().valueOf()
      return now > this.tokenExpiry
    },

    clearLoginUser() {
      this.loginUser = null
      this.tokenExpiry = null
    }
  },
  persist: {
    key: 'auth',
    storage: localStorage
  }
})
