// main.ts
import { createApp } from 'vue'
import App from './App.vue'
//因为要用到很多组件，所以就全局了(不必再各个vue下import对应的组件)
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-expect-error 编译时忽略该错误
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//svg插件需要的配置代码
import 'virtual:svg-icons-register'
//引入自定义插件对象：注册整个项目全局组件
import GlobalComponents from '@/components'
//引入模板的全局样式
import '@/styles/index.scss'
//封装好的axios
import '@/utils/request'
//引入路由
import router from '@/router'
//引入仓库
import pinia from '@/store'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})
/* //全局注册一个组件
import SvgIcon from '@/components/SvgIcon/index.vue'
app.component('SvgIcon', SvgIcon) */
//安装自定义插件,能全局使用SvgIcon
app.use(GlobalComponents)
//注册模板路由
app.use(router)
//安装仓库
app.use(pinia)

//通过import.meta.env获取环境变量
console.log(import.meta.env)

app.mount('#app')
