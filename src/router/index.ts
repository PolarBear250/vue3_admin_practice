// history模式
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './routes'

// import { getToken } from '@/api/storage'
// // 一级路由
// import Login from '@/views/Login'
// import Register from '@/views/Register'
// import Detail from '@/views/Detail'
// import Layout from '@/views/Layout'
// // 二级路由
// import Article from '@/views/Article'
// import Collect from '@/views/Collect'
// import Like from '@/views/Like'
// import User from '@/views/User'
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoute,
  //滚动行为，让滚动条默认在顶端
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

// const whiteList = ['/login', '/register'] // 白名单列表，记录无需权限访问的所有页面

// router.beforeEach((to, from, next) => {
//   const token = getToken()
//   // 如果有token，直接放行
//   if (token) {
//     next()
//   } else {
//     // 没有token的人, 看看你要去哪
//     // (1) 访问的是无需授权的页面（白名单），也是放行
//     //     就是判断，访问的地址，是否在白名单数组中存在 includes
//     if (whiteList.includes(to.path)) {
//       next()
//     } else {
//       // (2) 否则拦截到登录
//       next('/login')
//     }
//   }
// })

export default router
