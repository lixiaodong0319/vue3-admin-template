import type { ProjectConfig } from '#/config'
import { CacheTypeEnum } from '@/enums/cacheEnum'

const setting: ProjectConfig = {
  // 权限相关信息的存储位置
  permissionCacheType: CacheTypeEnum.LOCAL
}
export default setting
