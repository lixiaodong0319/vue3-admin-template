import type { GlobEnvConfig } from '#/config'
import { warn } from '@/utils/log'
import pkg from '../../package.json'
import { getConfigFileName } from '../../build/getConfigFileName'

/**
 * @description 根据版本生成缓存
 * @returns
 */
export function getStorageShortName() {
  return `${getCommonStoragePrefix()}${`__${pkg.version}__`}`
}

/**
 * @description 获取缓存公共前缀
 * @returns
 */
export function getCommonStoragePrefix() {
  const { VITE_GLOB_APP_SHORT_NAME } = getAppEnvConfig()
  return `${VITE_GLOB_APP_SHORT_NAME}__${getEnv()}`.toUpperCase()
}

/**
 * 获取环境变量配置
 * @returns
 */
export function getAppEnvConfig() {
  const ENV_NAME = getConfigFileName(import.meta.env)

  const ENV = import.meta.env.DEV
    ? (import.meta.env as unknown as GlobEnvConfig)
    : (window[ENV_NAME as any] as unknown as GlobEnvConfig)

  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL
  } = ENV

  if (!/^[a-zA-Z\_]*$/.test(VITE_GLOB_APP_SHORT_NAME)) {
    warn(
      `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`
    )
  }

  return {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL
  }
}

/**
 * @description 开发环境
 */
export const devMode = 'development'

/**
 * @description 生产环境
 */
export const prodMode = 'production'

/**
 * 获取环境变量
 * @returns
 */
export function getEnv(): string {
  return import.meta.env.MODE
}

/**
 * 是否是开发环境
 * @returns
 */
export function isDevMode(): boolean {
  return import.meta.env.DEV
}

/**
 * 是否是生产环境
 * @returns
 */
export function isProdMode(): boolean {
  return import.meta.env.PROD
}
