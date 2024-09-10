import { createApp } from 'vue'
import { setupStore } from '@/store/index'
import { router, setupRouter } from '@/router/index'
import { registerGlobalComponent } from '@/components/registerGlobalComponent'

import App from './App.vue'

// 导入全局样式
import '@/styles/main.scss'
// 引入icon注册脚本
import 'virtual:svg-icons-register'
import { setupRouterGrand } from '@/router/guard'

function bootstrap() {
  const app = createApp(App)

  // 配置store
  setupStore(app)

  // 配置路由
  setupRouter(app)

  // 路由守卫
  //   setupRouterGrand(router)

  // 注册全局组件
  registerGlobalComponent(app)

  app.mount('#app')
}
bootstrap()
