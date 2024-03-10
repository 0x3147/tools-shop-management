interface IUserInfo {
  postId: number | bigint
  username: string
  email: string
  isAdmin: boolean
  roles: string[]
  permissions: string[]
  createTime: Date
}

export interface ILoginUserRes {
  userInfo: IUserInfo
  token: string
}

export interface ILoginUserParam {
  username: string
  password: string
}

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
