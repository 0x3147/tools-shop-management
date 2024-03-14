import type {
  ILoginUserParam,
  IQueryCommonUserParam
} from '@/services/user/types'
import {
  IFreezeUserParam,
  ILoginUserRes,
  IQCommonUserRes
} from '@/services/user/types'
import { useAuthStore } from '@/store/authStore.ts'
import axios from '../index.ts'

const authStore = useAuthStore()

const permissions = authStore.loginUser?.userInfo?.permissions || []

const adminLogin = async (param: ILoginUserParam) => {
  const url = '/user/admin/login'
  const res: ILoginUserRes = await axios.post(url, param)
  return res || {}
}

const queryCommonUser = async (
  param: IQueryCommonUserParam
): Promise<IQCommonUserRes> => {
  const url = '/user-query/common'
  const finalParam = { ...param, permissions }
  const res: IQCommonUserRes = await axios.post(url, finalParam)
  return res || {}
}

const queryMember = async (
  param: IQueryCommonUserParam
): Promise<IQCommonUserRes> => {
  const url = '/user-query/member'
  const finalParam = { ...param, permissions }
  const res: IQCommonUserRes = await axios.post(url, finalParam)
  return res || {}
}

const upgradeUser = async (param: IFreezeUserParam) => {
  const url = '/user/upgrade'
  const finalParam = { ...param, permissions }
  const res: IQCommonUserRes = await axios.post(url, finalParam)
  return res || {}
}

const freezeUser = async (param: IFreezeUserParam) => {
  const url = '/user/freeze'
  const finalParam = { ...param, permissions }
  const res = await axios.post(url, finalParam)
  return res || {}
}

const unfreezeUser = async (param: IFreezeUserParam) => {
  const url = '/user/unfreeze'
  const finalParam = { ...param, permissions }
  const res = await axios.post(url, finalParam)
  return res || {}
}

export {
  adminLogin,
  freezeUser,
  queryCommonUser,
  queryMember,
  unfreezeUser,
  upgradeUser
}
