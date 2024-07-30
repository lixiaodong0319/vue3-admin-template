import { createApp } from 'vue'
import { setupStore } from '@/store/index'
import { setupRouter } from '@/router/index'
import { registerGlobalComponent } from '@/components/registerGlobalComponent'

import App from './App.vue'

// 导入全局样式
import '@/styles/main.scss'

function bootstrap() {
  const app = createApp(App)

  // 配置store
  setupStore(app)

  // 配置路由
  setupRouter(app)

  // 注册全局组件
  registerGlobalComponent(app)

  app.mount('#app')
}
bootstrap()
