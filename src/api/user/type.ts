//登录接口需要携带参数ts类型
export interface loginFormData {
  username: string
  password: string
}
interface dataType {
  token?: string
  message?: string
}
export interface loginResponseData {
  code: number
  data: dataType
}

interface user {
  checkUser: {
    userId: number
    avatar: string
    username: string
    password: string
    desc: string
    roles: string[]
    buttons: string[]
    routes: string[]
    token: string
  }
}
export interface userInfoReponseData {
  code: number
  data: { checkUser: user }
}
