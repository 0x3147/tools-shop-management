export interface IQueryCommonUserParam {
  currentPage: number
  pageSize: number
  username?: string
  email?: string
  isFrozen?: boolean
}

export interface IFreezeUserParam {
  postId: number | bigint
}

export interface tableData {
  postId: number | bigint
  username: string
  email: string
  isFrozen: boolean
  createTime: Date
}

export interface IQCommonUserRes {
  tableData: tableData[]
  total: number
  currentPage: number
  lastPage: number
}
