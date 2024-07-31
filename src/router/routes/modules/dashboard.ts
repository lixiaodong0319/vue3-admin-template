import type { AppRouteModule } from '@/router/types'

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: () => import('@/layout/index.vue'),
  redirect: '/dashboard/analysis',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: 'routes.dashboard.dashboard'
  },
  children: [
    {
      path: '/dashboard/analysis',
      name: 'Analysis',
      component: () => import('@/views/dashboard/analysis/index.vue'),
      meta: {
        // affix: true,
        title: 'routes.dashboard.analysis'
      }
    },
    {
      path: '/dashboard/workbench',
      name: 'Workbench',
      component: () => import('@/views/dashboard/workbench/index.vue'),
      meta: {
        title: 'routes.dashboard.workbench'
      }
    }
  ]
}

export default dashboard
