import type { Router } from 'vue-router'
import { createPermissionGuard } from './permissionGuard'

export function setupRouterGrand(router: Router) {
  createPermissionGuard(router)
}
