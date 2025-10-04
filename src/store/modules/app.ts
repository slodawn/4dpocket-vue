import { defineStore } from 'pinia'
import { ref } from 'vue'
import storage from '@/utils/storage'

export type Theme = 'light' | 'dark' | 'auto'
export type Language = 'zh-CN' | 'en-US'

export const useAppStore = defineStore('app', () => {
  const theme = ref<Theme>(storage.get<Theme>('theme', 'light'))
  const language = ref<Language>(storage.get<Language>('language', 'zh-CN'))
  const sidebarCollapsed = ref<boolean>(storage.get<boolean>('sidebarCollapsed', false))

  function setTheme(value: Theme) {
    theme.value = value
    storage.set('theme', value)
  }

  function setLanguage(value: Language) {
    language.value = value
    storage.set('language', value)
  }

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
    storage.set('sidebarCollapsed', sidebarCollapsed.value)
  }

  function resetSettings() {
    theme.value = 'light'
    language.value = 'zh-CN'
    sidebarCollapsed.value = false
    storage.clear()
  }

  return {
    theme,
    language,
    sidebarCollapsed,
    setTheme,
    setLanguage,
    toggleSidebar,
    resetSettings,
  }
})

