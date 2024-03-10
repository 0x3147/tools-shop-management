import dayjs from 'dayjs'
import { defineStore } from 'pinia'

export interface UserInfo {
  postId: number | bigint
  username: string
  email: string
  isAdmin: boolean
  roles: string[]
  permissions: string[]
  createTime: Date
}

export interface LoginUserVo {
  userInfo: UserInfo
  token: string
}

interface AuthState {
  loginUser: LoginUserVo | null
  tokenExpiry: number | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    loginUser: null,
    tokenExpiry: null
  }),
  actions: {
    saveLoginUser(loginUserVo: LoginUserVo) {
      this.loginUser = loginUserVo
      // 设置 token 有效期为7天
      this.tokenExpiry = dayjs().add(7, 'day').valueOf()
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
