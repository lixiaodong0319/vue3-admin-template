import type { ProjectConfig } from '#/config'
import { CacheTypeEnum } from '@/enums/cacheEnum'
import { PermissionModeEnum } from '@/enums/appEnum'

const setting: ProjectConfig = {
  // 权限相关信息的存储位置
  permissionCacheType: CacheTypeEnum.LOCAL,

  // 权限模式
  permissionMode: PermissionModeEnum.ROUTE_MAPPING
}
export default setting
