import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

// 响应数据接口
interface ResponseData<T = any> {
  code: number
  data: T
  message: string
}

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    const { code, data, message } = response.data

    // 根据自定义错误码判断请求是否成功
    if (code === 200) {
      return data
    } else {
      // 处理业务错误
      console.error('Business error:', message)
      return Promise.reject(new Error(message || 'Error'))
    }
  },
  (error: AxiosError) => {
    // 处理 HTTP 错误
    let message = ''
    const status = error.response?.status

    switch (status) {
      case 401:
        message = 'Unauthorized, please login'
        // to login
        break
      case 403:
        message = 'Access denied'
        break
      case 404:
        message = 'Request address not found'
        break
      case 500:
        message = 'Server error'
        break
      default:
        message = error.message || 'Network error'
    }

    console.error('HTTP error:', message)
    return Promise.reject(error)
  }
)

// 导出封装的请求方法
export const request = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config)
  },

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, data, config)
  },

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return service.put(url, data, config)
  },

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, config)
  },
}

export default service

