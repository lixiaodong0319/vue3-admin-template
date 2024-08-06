/**
 * @description 登录参数
 */
export interface LoginParams {
  username: string
  password: string
}

/**
 * @description 角色信息
 */
export interface RoleInfo {
  roleName: string
  value: string
}

/**
 * @description 登录返回结果
 */
export interface LoginResultModel {
  userId: string | number
  token: string
  role: RoleInfo
}

/**
 * @description 获取用户信息
 */
export interface GetUserInfoModel {
  // 角色
  roles: RoleInfo[]
  // 用户id
  userId: string | number
  // 用户名
  username: string
  // 真实姓名
  realName: string
  // 头像
  avatar: string
  // 介绍
  desc?: string
}
