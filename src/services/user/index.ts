import type { IQueryCommonUserParam } from '@/services/user/types'
import { IQCommonUserRes } from '@/services/user/types'
import axios from '../index.ts'

const queryCommonUser = async (
  param: IQueryCommonUserParam
): Promise<IQCommonUserRes> => {
  const url = '/user-query/common'
  const res: IQCommonUserRes = await axios.post(url, param)
  return res || {}
}

export { queryCommonUser }
