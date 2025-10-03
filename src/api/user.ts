import { request } from '@/utils/request'

// 用户信息接口
export interface User {
  id: number
  username: string
  email: string
}

// 登录参数接口
export interface LoginParams {
  username: string
  password: string
}

// 登录响应接口
export interface LoginResponse {
  token: string
  user: User
}

// 用户相关 API
export const userApi = {
  // 登录
  login(data: LoginParams) {
    return request.post<LoginResponse>('/user/login', data)
  },

  // 获取用户信息
  getUserInfo() {
    return request.get<User>('/user/info')
  },

  // 登出
  logout() {
    return request.post('/user/logout')
  },
}

