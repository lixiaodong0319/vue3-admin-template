import type { UserInfo } from '#/store'
import { defineStore } from 'pinia'
import { store } from '@/store'
import { RoleEnum } from '@/enums/roleEnum'
import { getAuthCache, getToken, setAuthCache } from '@/utils/auth'
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum'
import { GetUserInfoModel, LoginParams } from '@/api/model/userModel'
import { PageEnum } from '@/enums/pageEnums'
import { router } from '@/router'
import { doLogout, getUserInfo, loginApi } from '@/api/user'
import { isArray } from '@/utils/is'

interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
  roleList: RoleEnum[]
  sessionTimeout?: boolean
  lastUpdateTime: number
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
    roleList: [],
    sessionTimeout: false,
    lastUpdateTime: 0
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {}
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY)
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY)
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout
    }
  },
  actions: {
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info
      setAuthCache(USER_INFO_KEY, info)
    },
    setToken(info: string | undefined) {
      this.token = info ? info : ''
      setAuthCache(TOKEN_KEY, info)
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList
      setAuthCache(ROLES_KEY, roleList)
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag
    },
    async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null

      const userInfo = await this.getUserInfoAction()

      const sessionTimeout = this.sessionTimeout
      if (sessionTimeout) {
        this.setSessionTimeout(false)
      } else {
        // const permissionStore = usePermissionStore()
        // if (!permissionStore.isDynamicAddedRoute) {
        // const routes = await permissionStore.buildRoutesAction()
        // routes.forEach((route) => {
        //     router.addRoute(route as unknown as RouteRecordRaw)
        // })
        // router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw)
        // permissionStore.setDynamicAddedRoute(true)
        // }
        // goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME))
      }
      return userInfo
    },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null
      const userInfo = await getUserInfo()
      const { roles = [] } = userInfo
      if (isArray(roles)) {
        const roleList = roles.map((item) => item.value) as RoleEnum[]
        this.setRoleList(roleList)
      } else {
        userInfo.roles = []
        this.setRoleList([])
      }
      this.setUserInfo(userInfo)
      return userInfo
    },
    /**
     * 退出登录
     * @param goLogin
     */
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          await doLogout()
        } catch {
          console.log('注销token失败')
        }
      }
      this.setToken(undefined)
      this.setSessionTimeout(false)
      this.setUserInfo(null)
      goLogin && router.push(PageEnum.BASE_LOGIN)
    }
  }
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
