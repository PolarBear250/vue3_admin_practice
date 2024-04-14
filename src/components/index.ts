/* 
    用于注册components文件夹内部全部全局组件
*/
import SvgIcon from './SvgIcon/index.vue'
import type { App, Component } from 'vue'
//由于要给name附上类型，所以这里需要中括号，后面实际是{SvgIcon:SvgIcon}
const allGloablComponent: { [propName: string]: Component } = { SvgIcon }
////引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// console.log(ElementPlusIconsVue)
export default {
  //install方法是固定的,参数app能获得实例app,里面有component方法
  install(app: App) {
    //注册项目全部的全局组件
    Object.keys(allGloablComponent).forEach((key: string) => {
      app.component(key, allGloablComponent[key])
    })
    //将element-plus提供图标注册为全局组件
    // console.log(Object.entries(ElementPlusIconsVue))
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
