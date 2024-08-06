import type { AppRouteRecordRaw, Menu } from '@/router/types'

import { defineStore } from 'pinia'
import { store } from '@/store'
import { useUserStore } from './user'
import { useAppStoreWithOut } from './app'
import { toRaw } from 'vue'
import { PageEnum } from '@/enums/pageEnums'
import { PermissionModeEnum } from '@/enums/appEnum'
import { filter } from '@/utils/helper/treeHelper'
import { asyncRoutes } from '@/router/routes'
import { transformObjToRoute, flatMultiLevelRoutes } from '@/router/helper/routeHelper'
import { transformRouteToMenu } from '@/router/helper/menuHelper'
import { getPermCode } from '@/api/user'
import { getMenuList } from '@/api/menu'
import { PageNotFoundRoute } from '@/router/routes/basicRoutes'
import projectSetting from '@/settings/projectSetting'

interface PermissionState {
  permCodeList: string[] | number[]
  isDynamicAddedRoute: boolean
  lastBuildMenuTime: number
  backMenuList: Menu[]
  frontMenuList: Menu[]
}

export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionState => ({
    // 权限代码列表
    permCodeList: [],
    // 路由是否动态添加
    isDynamicAddedRoute: false,
    // 触发菜单更新
    lastBuildMenuTime: 0,
    // 后台菜单列表
    backMenuList: [],
    // 菜单列表
    frontMenuList: []
  }),
  getters: {
    getPermCodeList(): string[] | number[] {
      return this.permCodeList
    },
    getBackMenuList(): Menu[] {
      return this.backMenuList
    },
    getFrontMenuList(): Menu[] {
      return this.frontMenuList
    },
    getLastBuildMenuTime(): number {
      return this.lastBuildMenuTime
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute
    }
  },
  actions: {
    setPermCodeList(codeList: string[]) {
      this.permCodeList = codeList
    },
    setFrontMenuList(list: Menu[]) {
      this.frontMenuList = list
    },
    setBackMenuList(list: Menu[]) {
      this.backMenuList = list
      list?.length > 0 && this.setLastBuildMenuTime()
    },
    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime()
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },
    async changePermissionCode() {
      const codeList = await getPermCode()
      this.setPermCodeList(codeList)
    },
    async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
      const userStore = useUserStore()
      const appStore = useAppStoreWithOut()

      let routes: AppRouteRecordRaw[] = []
      const roleList = toRaw(userStore.getRoleList) || []
      const { permissionMode = projectSetting.permissionMode } = appStore.getProjectConfig

      // 路由过滤器 在 函数filter作为回调传入遍历使用
      const routeFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route
        // 抽出角色
        const { roles } = (meta || {}) as any
        if (!roles) return true
        // 进行角色权限判断
        return roleList.some((role) => roles.includes(role))
      }

      const routeRemoveIgnoreFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route
        // ignoreRoute 为true 则路由仅用于菜单生成，不会在实际的路由表中出现
        const { ignoreRoute } = meta || {}
        // arr.filter 返回 true 表示该元素通过测试
        return !ignoreRoute
      }

      const patchHomeAffix = (routes: AppRouteRecordRaw[]) => {
        if (!routes || routes.length === 0) return
        let homePath: string = userStore.getUserInfo.homePath || PageEnum.BASE_HOME

        function patcher(routes: AppRouteRecordRaw[], parentPath = '') {
          if (parentPath) parentPath = parentPath + '/'
          routes.forEach((route: AppRouteRecordRaw) => {
            const { path, children, redirect } = route
            const currentPath = path.startsWith('/') ? path : parentPath + path
            if (currentPath === homePath) {
              if (redirect) {
                homePath = route.redirect! as string
              } else {
                route.meta = Object.assign({}, route.meta, { affix: true })
                throw new Error('end')
              }
            }
            children && children.length > 0 && patcher(children, currentPath)
          })
        }

        try {
          patcher(routes)
        } catch (e) {}
        return
      }

      switch (permissionMode) {
        // 角色权限
        case PermissionModeEnum.ROLE:
          // 对非一级路由进行过滤
          routes = filter(asyncRoutes, routeFilter)
          // 对一级路由根据角色权限过滤
          routes = routes.filter(routeFilter)
          // 将多级路由转化为二级路由
          routes = flatMultiLevelRoutes(routes)
          break
        // 路由映射，默认进入该case
        case PermissionModeEnum.ROUTE_MAPPING:
          // 对非一级路由进行过滤
          routes = filter(asyncRoutes, routeFilter)
          // 对一级路由再次根据角色权限过滤
          routes = routes.filter(routeFilter)
          // 将路由转换成菜单
          const menuList = transformRouteToMenu(routes, true)
          // 移除掉 ignoreRoute: true 的路由 非一级路由
          routes = filter(routes, routeRemoveIgnoreFilter)
          // 移除掉 ignoreRoute: true 的路由 一级路由；
          routes = routes.filter(routeRemoveIgnoreFilter)
          // 对菜单进行排序
          menuList.sort((a, b) => {
            return ((a.meta?.orderNo as any) || 0) - ((b.meta?.orderNo as any) || 0)
          })

          // 设置菜单列表
          this.setFrontMenuList(menuList)

          // 将多级路由转换为 2 级路由
          routes = flatMultiLevelRoutes(routes)
          break
        //  如果确定不需要做后台动态权限，请在下方评论整个判断
        case PermissionModeEnum.BACK:
          // 模拟从后台获取权限码，
          // 这个功能可能只需要执行一次，实际项目可以自己放在合适的时间
          let routeList: AppRouteRecordRaw[] = []
          try {
            await this.changePermissionCode()
            routeList = (await getMenuList()) as AppRouteRecordRaw[]
          } catch (error) {
            console.error(error)
          }

          // 动态引入组件
          routeList = transformObjToRoute(routeList)

          //  后台路由到菜单结构
          const backMenuList = transformRouteToMenu(routeList)
          this.setBackMenuList(backMenuList)

          // 删除 meta.ignoreRoute 项
          routeList = filter(routeList, routeRemoveIgnoreFilter)
          routeList = routeList.filter(routeRemoveIgnoreFilter)

          routeList = flatMultiLevelRoutes(routeList)
          routes = [PageNotFoundRoute, ...routeList]
          break
      }

      patchHomeAffix(routes)
      return routes
    }
  }
})

export function ussePermissionStoreWithOut() {
  return usePermissionStore(store)
}
