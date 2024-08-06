import type { Router, RouteRecordRaw } from 'vue-router'
import { useUserStoreWithOut } from '@/store/modules/user'
import { PageEnum } from '@/enums/pageEnums'
import { PageNotFoundRoute } from '@/router/routes/basicRoutes'
import { ussePermissionStoreWithOut } from '@/store/modules/permission'

const whitePathList: PageEnum[] = [PageEnum.BASE_LOGIN]

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut()
  const permissionStore = ussePermissionStoreWithOut()
  router.beforeEach(async (to, from, next) => {
    if (
      from.path === '/' &&
      to.path === PageEnum.BASE_HOME &&
      userStore.getUserInfo.homePath &&
      userStore.getUserInfo.homePath !== PageEnum.BASE_HOME
    ) {
      next(userStore.getUserInfo.homePath)
      return
    }

    const token = userStore.getToken

    if (whitePathList.includes(to.path as PageEnum)) {
      if (to.path === PageEnum.BASE_LOGIN && token) {
        const isSessionTimeout = userStore.getSessionTimeout
        try {
          await userStore.afterLoginAction
          if (!isSessionTimeout) {
            next((to.query?.redirect as string) || '/')
            return
          }
        } catch {}
      }
    }

    if (!token) {
      if (to.meta.ignoreAuth) {
        next()
        return
      }

      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: PageEnum.BASE_LOGIN,
        replace: true
      }
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path
        }
      }
      next(redirectData)
      return
    }

    if (
      from.path === PageEnum.BASE_LOGIN &&
      to.name === PageNotFoundRoute.name &&
      to.fullPath !== (userStore.getUserInfo.homePath || PageEnum.BASE_HOME)
    ) {
      next(userStore.getUserInfo.homePath || PageEnum.BASE_HOME)
      return
    }

    if (userStore.getLastUpdateTime === 0) {
      try {
        await userStore.getUserInfoAction()
      } catch (err) {
        next()
        return
      }
    }

    if (permissionStore.getIsDynamicAddedRoute) {
      next()
      return
    }

    const routes = await permissionStore.buildRoutesAction()

    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw)
    })

    router.addRoute(PageNotFoundRoute.name as unknown as RouteRecordRaw)

    permissionStore.setDynamicAddedRoute(true)

    if (to.name === PageNotFoundRoute.name) {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面
      next({ path: to.fullPath, replace: true, query: to.query })
    } else {
      const redirectPath = (from.query.redirect || to.path) as string
      const redirect = decodeURIComponent(redirectPath)
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
      next(nextData)
    }
  })
}
