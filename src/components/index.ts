/* 
    用于注册components文件夹内部全部全局组件
*/
import SvgIcon from './SvgIcon/index.vue'
import type { App, Component } from 'vue'
//由于要给name附上类型，所以这里需要中括号，后面实际是{SvgIcon:SvgIcon}
const components: { [propName: string]: Component } = { SvgIcon }
export default {
  //install方法是固定的,参数app能获得实例app,里面有component方法
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
  },
}
