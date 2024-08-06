import { defHttp } from '@/utils/http/axios'
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel'
import { ErrorMessageMode } from '#/axios'

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry'
}

/**
 * @description 登录接口
 * @param params
 * @param mode
 * @returns
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params
    },
    {
      errorMessageMode: mode
    }
  )
}

/**
 * @description 获取用户信息
 * @returns
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' })
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode })
}

/**
 * @description 退出登录
 * @returns
 */
export function doLogout() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' })
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000
      }
    }
  )
}
