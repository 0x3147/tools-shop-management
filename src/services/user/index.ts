import type { IQueryCommonUserParam } from '@/services/user/types'
import { IFreezeUserParam, IQCommonUserRes } from '@/services/user/types'
import axios from '../index.ts'

const queryCommonUser = async (
  param: IQueryCommonUserParam
): Promise<IQCommonUserRes> => {
  const url = '/user-query/common'
  const res: IQCommonUserRes = await axios.post(url, param)
  return res || {}
}

const freezeUser = async (param: IFreezeUserParam) => {
  const url = '/user/freeze'
  const res = await axios.post(url, param)
  return res || {}
}

const unfreezeUser = async (param: IFreezeUserParam) => {
  const url = '/user/unfreeze'
  const res = await axios.post(url, param)
  return res || {}
}

export { freezeUser, queryCommonUser, unfreezeUser }
