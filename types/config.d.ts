import { CacheTypeEnum } from '@/enums/cacheEnum'

export interface ProjectConfig {
  // 权限相关信息的存储位置
  permissionCacheType: CacheTypeEnum
}

export interface GlobEnvConfig {
  // 站点名称
  VITE_GLOB_APP_TITLE: string
  // 服务接口地址
  VITE_GLOB_API_URL: string
  // 服务接口前缀
  VITE_GLOB_API_URL_PREFIX?: string
  // 项目缩写
  VITE_GLOB_APP_SHORT_NAME
  // 上传地址
  VITE_GLOB_UPLOAD_URL?: string
}

export interface GlobConfig {
  // 站点名称
  title: string
  // 服务接口地址
  apiUrl: string
  // 上传地址
  uploadUrl?: string
  // 服务接口前缀
  urlPrefix?: string
  // 项目缩写
  shortName: string
}
