import type { App } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'

export function registerGlobalComponent(app: App) {
  // 注册所有图标
  Object.keys(Icons).forEach((key) => {
    app.component(key, Icons[key])
  })
  app.use(ElementPlus)
}
