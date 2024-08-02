export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined

export interface RequestOptions {
  // 将请求参数添加到url
  joinParamsToUrl?: boolean
  // 格式化时间
  formatDate?: boolean
  // 是否处理请求结果
  isTransformResponse?: boolean
  // 是否返回原始请求头
  isReturnNativeResponse?: boolean
  // 添加请求前缀
  joinPrefix?: boolean
  // 接口地址，如果不输入，使用默认的接口url
  apiUrl?: string
  // 请求拼接路径
  urlPrefix?: string
  // 错误信息提示类型
  errorMessageMode?: ErrorMessageMode
  // 是否添加时间戳
  joinTime?: boolean
  // 忽略取消token
  ignoreCancelToken?: boolean
  // 是否在请求头添加token
  withToken?: boolean
  // 请求重试机制
  retryRequest?: RetryRequest
}

export interface RetryRequest {
  isOpenRetry: boolean
  count: number
  waitTime: number
}

export interface Result<T = any> {
  code: number
  type: 'success' | 'error' | 'warning'
  message: string
  result: T
}

export interface UploadFileParams {
  data?: Recordable
  name?: string
  file: File | Blob
  filename?: string
  [key: string]: any
}
