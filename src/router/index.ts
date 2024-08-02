import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { basicRoutes, asyncRoutes } from './routes'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...(asyncRoutes as unknown as RouteRecordRaw[]),
    ...(basicRoutes as unknown as RouteRecordRaw[])
  ]
})

// 配置路由器
export function setupRouter(app: App<Element>) {
  app.use(router)
}
