import type { AppRouteRecordRaw } from '@/router/types'

// 根路由
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: '/dashboard',
  meta: {
    title: 'Root'
  }
}

// 登录
export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: 'routes.basic.login'
  }
}

// 重定向
export const ReditectRoute: AppRouteRecordRaw = {
  path: '/redirect',
  component: () => import('@/layout/index.vue'),
  name: 'Redirect',
  meta: {
    title: 'Redirect',
    hideBreadcrumb: true,
    hideMenu: true
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: 'Redirect',
      component: () => import('@/views/errorPage/Redirect.vue'),
      meta: {
        title: 'Redirect',
        hideBreadcrumb: true
      }
    }
  ]
}

// 404
export const PageNotFoundRoute: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'PageNotFound',
  component: () => import('@/layout/index.vue'),
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
    hideMenu: true
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'PageNotFound',
      component: () => import('@/views/errorPage/Exception.vue'),
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
        hideMenu: true
      }
    }
  ]
}

export const basicRoutes = [LoginRoute, RootRoute, ReditectRoute, PageNotFoundRoute]
