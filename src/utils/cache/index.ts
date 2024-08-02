import { getStorageShortName } from '@/utils/env'
import { createStorage as create, CreateStorageParams } from './storageCache'
import { DEFAULT_CACHE_TIME } from '@/settings/encryptionSetting'
import { enableStorageEncryption } from '@/settings/encryptionSetting'

export type Options = Partial<CreateStorageParams>

function createOptions(storage: Storage, options: Options = {}): Options {
  return {
    hasEncrypt: enableStorageEncryption,
    storage,
    prefixKey: getStorageShortName(),
    ...options
  }
}

export const WebStorage = create(createOptions(sessionStorage))

export function createStorage(storage: Storage = sessionStorage, options: Options = {}) {
  return create(createOptions(storage, options))
}

export function createSessionStorage(options: Options = {}) {
  return createStorage(sessionStorage, { ...options, timeout: DEFAULT_CACHE_TIME })
}

export function createLocalStorage(options: Options = {}) {
  return createStorage(localStorage, { ...options, timeout: DEFAULT_CACHE_TIME })
}

export default WebStorage
