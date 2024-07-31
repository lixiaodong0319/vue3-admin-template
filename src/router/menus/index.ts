import type { Menu } from '@/router/types'

import { asyncRoutes } from '../routes'

function getAsyncMenus() {
  return asyncRoutes.filter((item) => !item.meta?.hideMenu)
}

export const getMenus = (): Menu[] => {
  const menus = getAsyncMenus()
  return menus
}
