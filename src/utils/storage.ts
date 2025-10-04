/**
 * 存储系统封装
 * 支持 localStorage 和 sessionStorage
 * 提供类型安全、过期时间控制、命名空间隔离等功能
 */

export type StorageType = 'local' | 'session'

export interface StorageOptions {
  expire?: number // 过期时间（毫秒）
  namespace?: string // 命名空间
}

interface StorageData<T> {
  value: T
  expire?: number // 过期时间戳
}

class StorageManager {
  private namespace: string
  private storage: Storage

  constructor(type: StorageType = 'local', namespace: string = 'app') {
    this.storage = type === 'local' ? localStorage : sessionStorage
    this.namespace = namespace
  }

  /**
   * 生成带命名空间的完整 key
   */
  private getFullKey(key: string): string {
    return `${this.namespace}:${key}`
  }

  /**
   * 检查数据是否过期
   */
  private isExpired(data: StorageData<any>): boolean {
    if (!data.expire) return false
    return Date.now() > data.expire
  }

  /**
   * 设置存储数据
   */
  set<T = any>(key: string, value: T, options?: StorageOptions): void {
    const fullKey = this.getFullKey(key)
    const data: StorageData<T> = {
      value,
    }

    // 设置过期时间
    if (options?.expire) {
      data.expire = Date.now() + options.expire
    }

    try {
      this.storage.setItem(fullKey, JSON.stringify(data))
    } catch (error) {
      console.error('Storage set error:', error)
      // 存储空间不足时，清理过期数据后重试
      this.clearExpired()
      try {
        this.storage.setItem(fullKey, JSON.stringify(data))
      } catch (retryError) {
        console.error('Storage set retry failed:', retryError)
      }
    }
  }

  /**
   * 获取存储数据（有默认值时返回 T，无默认值时返回 T | undefined）
   */
  get<T>(key: string, defaultValue: T): T
  get<T>(key: string): T | undefined
  get<T>(key: string, defaultValue?: T): T | undefined {
    const fullKey = this.getFullKey(key)

    try {
      const item = this.storage.getItem(fullKey)
      if (!item) return defaultValue

      const data: StorageData<T> = JSON.parse(item)

      // 检查是否过期
      if (this.isExpired(data)) {
        this.remove(key)
        return defaultValue
      }

      return data.value
    } catch (error) {
      console.error('Storage get error:', error)
      return defaultValue
    }
  }

  /**
   * 删除存储数据
   */
  remove(key: string): void {
    const fullKey = this.getFullKey(key)
    this.storage.removeItem(fullKey)
  }

  /**
   * 清空当前命名空间下的所有数据
   */
  clear(): void {
    const keys = this.getKeys()
    keys.forEach(key => {
      this.storage.removeItem(key)
    })
  }

  /**
   * 检查 key 是否存在
   */
  has(key: string): boolean {
    const fullKey = this.getFullKey(key)
    return this.storage.getItem(fullKey) !== null
  }

  /**
   * 获取当前命名空间下的所有 key
   */
  getKeys(): string[] {
    const keys: string[] = []
    const prefix = `${this.namespace}:`

    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i)
      if (key && key.startsWith(prefix)) {
        keys.push(key)
      }
    }

    return keys
  }

  /**
   * 获取当前命名空间下的所有数据
   */
  getAll<T = any>(): Record<string, T> {
    const result: Record<string, T> = {}
    const prefix = `${this.namespace}:`

    this.getKeys().forEach(fullKey => {
      const key = fullKey.replace(prefix, '')
      const value = this.get<T>(key)
      if (value !== undefined) {
        result[key] = value
      }
    })

    return result
  }

  /**
   * 清理过期数据
   */
  clearExpired(): void {
    const keys = this.getKeys()

    keys.forEach(fullKey => {
      try {
        const item = this.storage.getItem(fullKey)
        if (!item) return

        const data: StorageData<any> = JSON.parse(item)
        if (this.isExpired(data)) {
          this.storage.removeItem(fullKey)
        }
      } catch {
        // 如果解析失败，可能是旧数据，直接删除
        this.storage.removeItem(fullKey)
      }
    })
  }

  /**
   * 获取存储空间使用情况（字节）
   */
  getSize(): number {
    let size = 0
    const keys = this.getKeys()

    keys.forEach(key => {
      const item = this.storage.getItem(key)
      if (item) {
        size += item.length + key.length
      }
    })

    return size
  }
}

// 创建默认实例
export const storage = new StorageManager('local')
export const session = new StorageManager('session')

// 导出类供自定义使用
export { StorageManager }

export default {
  local: storage,
  session: session,
  set: storage.set.bind(storage),
  get: storage.get.bind(storage),
  remove: storage.remove.bind(storage),
  clear: storage.clear.bind(storage),
  has: storage.has.bind(storage),
}

