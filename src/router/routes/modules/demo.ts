import type { AppRouteModule } from '@/router/types'

const demo: AppRouteModule = {
  path: '/demo',
  name: 'Demo',
  component: () => import('@/layout/index.vue'),
  redirect: '/demo/table',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: 'routes.demo.table'
  },
  children: [
    {
      path: '/demo/table',
      name: 'Table',
      component: () => import('@/views/demo/table/index.vue'),
      meta: {
        // affix: true,
        title: 'routes.demo.table'
      }
    }
  ]
}

export default demo
