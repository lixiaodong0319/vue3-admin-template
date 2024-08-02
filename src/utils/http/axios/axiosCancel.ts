import type { AxiosRequestConfig, Canceler } from 'axios'
import { isFunction } from '@/utils/is'
import axios from 'axios'

// 用于存储每个请求的识别和取消功能
let pendingMap = new Map<string, Canceler>()

export function getPendingUrl(config: AxiosRequestConfig) {
  return [config.method, config.url].join('&')
}

export class AxiosCanceler {
  /**
   * 添加请求
   * @param config
   */
  addPending(config: AxiosRequestConfig) {
    this.removePending(config)
    const url = getPendingUrl(config)
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          pendingMap.set(url, cancel)
        }
      })
  }

  /**
   * @description 移除所有请求
   */
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel()
    })
    pendingMap.clear()
  }

  /**
   * 移除请求
   * @param config
   */
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config)

    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url)
      cancel && cancel(url)
      pendingMap.delete(url)
    }
  }

  /**
   * @description 重置
   */
  reset(): void {
    pendingMap = new Map<string, Canceler>()
  }
}
