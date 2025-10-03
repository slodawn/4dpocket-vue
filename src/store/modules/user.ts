import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userApi } from '@/api'
import type { User, LoginParams } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(localStorage.getItem('token') || '')
  const userInfo = ref<User | null>(null)

  // 登录
  async function login(params: LoginParams) {
    try {
      const data = await userApi.login(params)
      token.value = data.token
      userInfo.value = data.user
      localStorage.setItem('token', data.token)
      return data
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  // 获取用户信息
  async function getUserInfo() {
    try {
      const data = await userApi.getUserInfo()
      userInfo.value = data
      return data
    } catch (error) {
      console.error('Get user info failed:', error)
      throw error
    }
  }

  // 登出
  async function logout() {
    try {
      await userApi.logout()
      token.value = ''
      userInfo.value = null
      localStorage.removeItem('token')
    } catch (error) {
      console.error('Logout failed:', error)
      throw error
    }
  }

  return {
    token,
    userInfo,
    login,
    getUserInfo,
    logout,
  }
})

