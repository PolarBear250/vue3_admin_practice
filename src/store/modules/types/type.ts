import type { RouteRecordRaw } from 'vue-router'
//定义小仓库数据state类型
export interface UserState {
  token: string | null
  // menuRoutes: [] 数组里面是路由对象的类型,可以用vue-router自带
  menuRoutes: RouteRecordRaw[]
}
