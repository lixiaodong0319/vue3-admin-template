import { isDevMode } from '@/utils/env'

// 系统默认缓存时间，单位秒
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

// aes加密key
export const cacheCipher = {
  key: '_11111000001111@',
  iv: '@11111000001111_'
}

// 系统缓存是否用aes加密
export const enableStorageEncryption = !isDevMode()
