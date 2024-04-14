//创建用户相关的小仓库
import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import type { loginFormData, loginResponseData } from '@/api/user/type'
import type { UserState } from '@/store/modules/types/type'
//引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
import { constantRoute } from '@/router/routes'

//创建用户小仓库
const useUserStore = defineStore('User', {
  //小仓库存储数据地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      menuRoutes: constantRoute, //仓库存储生成菜单需要数组(路由)
    }
  },
  //异步|逻辑的地方
  actions: {
    async userLogin(data: loginFormData) {
      //登录请求
      const result: loginResponseData = await reqLogin(data)
      console.log(result)
      //登录请求：成功200->token
      if (result.code === 200) {
        //没有这一步登录后F12中的User小仓库在pinia中会不见了
        //this指向一个Proxy对象(User仓库？),所以不能用箭头函数
        this.token = result.data.token as string
        //本地存储token
        SET_TOKEN(result.data as string)
        //async默认返回的是undefined的状态为fulfilled的Promise
        return 'ok'
      } else {
        //登录请求：失败201->登录失败错误的信息(正常来说登录失败应该是4xx)
        throw new Error(result.data.message)
        // 内部会调用Promise.reject() 返回一个promise 对象，等价于下面语句
        // return Promise.reject(new Error(result.data.message))
      }
    },
  },
  getters: {},
})
//对外暴露获取小仓库方法
export default useUserStore
