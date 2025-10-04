import { ref, watch, type Ref } from 'vue'
import { storage, session, type StorageOptions } from '@/utils/storage'

/**
 * 存储 Hook - 提供响应式的存储功能
 * @param key 存储键名
 * @param defaultValue 默认值
 * @param options 存储选项
 */
export function useStorage<T>(
  key: string,
  defaultValue: T,
  options?: StorageOptions & { type?: 'local' | 'session' }
): [Ref<T>, (v: T) => void, () => void] {
  const storageInstance = options?.type === 'session' ? session : storage
  const data = ref(storageInstance.get<T>(key, defaultValue)) as Ref<T>

  // 监听数据变化，自动保存
  watch(
    data,
    newValue => {
      if (newValue === undefined || newValue === null) {
        storageInstance.remove(key)
      } else {
        storageInstance.set(key, newValue, options)
      }
    },
    { deep: true }
  )

  const setValue = (newValue: T) => {
    data.value = newValue
  }

  const removeValue = () => {
    storageInstance.remove(key)
    data.value = defaultValue
  }

  return [data, setValue, removeValue]
}

/**
 * localStorage Hook
 */
 
export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  options?: StorageOptions
): [Ref<T>, (v: T) => void, () => void] {
  return useStorage(key, defaultValue, { ...options, type: 'local' })
}

/**
 * sessionStorage Hook
 */
 
export function useSessionStorage<T>(
  key: string,
  defaultValue: T,
  options?: StorageOptions
): [Ref<T>, (v: T) => void, () => void] {
  return useStorage(key, defaultValue, { ...options, type: 'session' })
}

