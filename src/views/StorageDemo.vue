<template>
  <div class="storage-demo">
    <header class="demo-header">
      <router-link
        to="/"
        class="back-link"
      >
        ← 返回首页
      </router-link>
      <h1 class="demo-title">
        💾 存储系统使用示例
      </h1>
      <p class="demo-subtitle">
        演示 localStorage 和 sessionStorage 的封装使用
      </p>
    </header>

    <div class="demo-container">
      <section class="demo-section">
        <div class="section-header">
          <h2 class="section-title">
            1️⃣ 基础用法
          </h2>
          <span class="section-tag">基础</span>
        </div>
        <div class="demo-content">
          <div class="input-group">
            <input
              v-model="username"
              type="text"
              placeholder="输入用户名"
              class="input"
            />
          </div>
          <div class="button-group">
            <button
              class="btn btn-primary"
              @click="saveUsername"
            >
              💾 保存到 localStorage
            </button>
            <button
              class="btn btn-default"
              @click="clearUsername"
            >
              🗑️ 清除
            </button>
          </div>
          <div class="result-box">
            <span class="result-label">当前值:</span>
            <span class="result-value">{{ username || '(空)' }}</span>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <div class="section-header">
          <h2 class="section-title">
            2️⃣ 带过期时间的存储
          </h2>
          <span class="section-tag section-tag--warning">过期机制</span>
        </div>
        <div class="demo-content">
          <div class="input-group">
            <input
              v-model="tempData"
              type="text"
              placeholder="输入临时数据"
              class="input"
            />
          </div>
          <button
            class="btn btn-warning"
            @click="saveTempData"
          >
            ⏱️ 保存 (10秒后过期)
          </button>
          <div class="result-box">
            <span class="result-label">当前值:</span>
            <span class="result-value">{{ getTempData() }}</span>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <div class="section-header">
          <h2 class="section-title">
            3️⃣ 使用 Hook 的响应式存储
          </h2>
          <span class="section-tag section-tag--success">响应式</span>
        </div>
        <div class="demo-content">
          <div class="counter-display">
            <span class="counter-label">计数器:</span>
            <span class="counter-value">{{ count }}</span>
          </div>
          <div class="input-group">
            <input
              v-model="count"
              type="number"
              class="input"
            />
          </div>
          <div class="button-group">
            <button
              class="btn btn-success"
              @click="count++"
            >
              ➕ 增加
            </button>
            <button
              class="btn btn-default"
              @click="resetCount"
            >
              🔄 重置
            </button>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <div class="section-header">
          <h2 class="section-title">
            4️⃣ sessionStorage 示例
          </h2>
          <span class="section-tag section-tag--info">会话存储</span>
        </div>
        <div class="demo-content">
          <div class="input-group">
            <input
              v-model="sessionData"
              type="text"
              placeholder="输入会话数据（关闭页面后消失）"
              class="input"
            />
          </div>
          <div class="result-box">
            <span class="result-label">会话数据:</span>
            <span class="result-value">{{ sessionData || '(空)' }}</span>
          </div>
        </div>
      </section>

      <section class="demo-section demo-section--highlight">
        <div class="section-header">
          <h2 class="section-title">
            5️⃣ 存储信息
          </h2>
          <span class="section-tag">统计</span>
        </div>
        <div class="demo-content">
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">存储使用:</span>
              <span class="info-value">{{ (storageSize / 1024).toFixed(2) }} KB</span>
            </div>
            <div class="info-item">
              <span class="info-label">存储的 keys:</span>
              <span class="info-value">{{ Object.keys(allData).join(', ') || '(无)' }}</span>
            </div>
          </div>
          <button
            class="btn btn-danger"
            @click="clearAll"
          >
            🗑️ 清空所有数据
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import storage from '@/utils/storage'
import { useLocalStorage, useSessionStorage } from '@/hooks/useStorage'

const username = ref(storage.get('username', ''))
const tempData = ref('')
const [count, , resetCount] = useLocalStorage('counter', 0)
const [sessionData] = useSessionStorage('sessionData', '')
const storageSize = computed(() => storage.local.getSize())
const allData = computed(() => storage.local.getAll())

function saveUsername() {
  storage.set('username', username.value)
}

function clearUsername() {
  storage.remove('username')
  username.value = ''
}

function saveTempData() {
  storage.set('tempData', tempData.value, { expire: 10000 }) // 10秒
  alert('数据已保存，10秒后过期')
}

function getTempData() {
  return storage.get('tempData', '无数据或已过期')
}

function clearAll() {
  if (confirm('确定要清空所有数据吗？')) {
    storage.clear()
    username.value = ''
    tempData.value = ''
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.storage-demo {
  min-height: 100vh;
  background: $bg-lighter;
  padding: $spacing-lg $spacing-md;
}

.demo-header {
  max-width: 900px;
  margin: 0 auto $spacing-xl;
  text-align: center;
}

.back-link {
  display: inline-block;
  margin-bottom: $spacing-lg;
  font-size: $font-size-base;
  color: $primary-color;
  text-decoration: none;
  transition: transform $transition-base;

  &:hover {
    transform: translateX(-4px);
  }
}

.demo-title {
  font-size: $font-size-xxl;
  color: $text-primary;
  margin-bottom: $spacing-sm;
}

.demo-subtitle {
  font-size: $font-size-md;
  color: $text-secondary;
}

.demo-container {
  max-width: 900px;
  margin: 0 auto;
}

.demo-section {
  background: $white;
  border: 1px solid $border-light;
  border-radius: $border-radius-lg;
  padding: $spacing-lg;
  margin-bottom: $spacing-lg;
  transition: box-shadow $transition-base;

  &:hover {
    box-shadow: $shadow-md;
  }

  &--highlight {
    background: linear-gradient(135deg, $primary-light 0%, $white 100%);
    border-color: $primary-color;
  }
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: $spacing-md;
  padding-bottom: $spacing-md;
  border-bottom: 2px solid $border-lighter;
}

.section-title {
  font-size: $font-size-lg;
  font-weight: $font-weight-bold;
  color: $text-primary;
  margin: 0;
}

.section-tag {
  padding: $spacing-xs $spacing-sm;
  font-size: $font-size-xs;
  font-weight: $font-weight-medium;
  color: $white;
  background: $primary-color;
  border-radius: $border-radius-xl;

  &--success {
    background: $success-color;
  }

  &--warning {
    background: $warning-color;
  }

  &--info {
    background: $info-color;
  }
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.input-group {
  display: flex;
  gap: $spacing-sm;
}

.button-group {
  display: flex;
  gap: $spacing-sm;
  flex-wrap: wrap;
}

.result-box {
  padding: $spacing-md;
  background: $bg-light;
  border-left: 4px solid $primary-color;
  border-radius: $border-radius-sm;
  display: flex;
  align-items: center;
  gap: $spacing-sm;
}

.result-label {
  font-weight: $font-weight-medium;
  color: $text-regular;
}

.result-value {
  color: $primary-color;
  font-weight: $font-weight-bold;
}

.counter-display {
  text-align: center;
  padding: $spacing-xl;
  background: linear-gradient(135deg, $success-light 0%, $white 100%);
  border-radius: $border-radius-md;
}

.counter-label {
  display: block;
  font-size: $font-size-sm;
  color: $text-secondary;
  margin-bottom: $spacing-xs;
}

.counter-value {
  display: block;
  font-size: $font-size-xxl * 2;
  font-weight: $font-weight-bold;
  color: $success-color;
}

.info-grid {
  display: grid;
  gap: $spacing-md;
  padding: $spacing-md;
  background: $white;
  border: 1px solid $border-lighter;
  border-radius: $border-radius-base;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
}

.info-label {
  font-size: $font-size-sm;
  color: $text-secondary;
  font-weight: $font-weight-medium;
}

.info-value {
  font-size: $font-size-base;
  color: $text-primary;
  word-break: break-all;
}
</style>

