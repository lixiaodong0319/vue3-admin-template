import type { Router } from 'vue-router'
import { useUserStoreWithOut } from '@/store/modules/user'
import { PageEnum } from '@/enums/pageEnums'

const whitePathList: PageEnum[] = [PageEnum.BASE_LOGIN]

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut()
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
  })
}
