<template>
  <div class="storage-demo">
    <h1>存储系统使用示例</h1>

    <section class="demo-section">
      <h2>1. 基础用法</h2>
      <div class="demo-content">
        <input
          v-model="username"
          type="text"
          placeholder="输入用户名"
        />
        <button @click="saveUsername">
          保存到 localStorage
        </button>
        <button @click="clearUsername">
          清除
        </button>
        <p>当前值: {{ username }}</p>
      </div>
    </section>

    <section class="demo-section">
      <h2>2. 带过期时间的存储</h2>
      <div class="demo-content">
        <input
          v-model="tempData"
          type="text"
          placeholder="输入临时数据"
        />
        <button @click="saveTempData">
          保存 (10秒后过期)
        </button>
        <p>当前值: {{ getTempData() }}</p>
      </div>
    </section>

    <section class="demo-section">
      <h2>3. 使用 Hook 的响应式存储</h2>
      <div class="demo-content">
        <input
          v-model="count"
          type="number"
        />
        <button @click="count++">
          增加
        </button>
        <button @click="resetCount">
          重置
        </button>
        <p>计数器: {{ count }}</p>
      </div>
    </section>

    <section class="demo-section">
      <h2>4. sessionStorage 示例</h2>
      <div class="demo-content">
        <input
          v-model="sessionData"
          type="text"
          placeholder="输入会话数据"
        />
        <p>会话数据: {{ sessionData }}</p>
      </div>
    </section>

    <section class="demo-section">
      <h2>5. 存储信息</h2>
      <div class="demo-content">
        <p>localStorage 使用: {{ (storageSize / 1024).toFixed(2) }} KB</p>
        <p>存储的 keys: {{ Object.keys(allData).join(', ') }}</p>
        <button @click="clearAll">
          清空所有数据
        </button>
      </div>
    </section>
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

<style scoped>
.storage-demo {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: #42b983;
  margin-bottom: 2rem;
}

.demo-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.demo-section h2 {
  margin-top: 0;
  color: #333;
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

button {
  padding: 0.5rem 1rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background: #33a06f;
}

p {
  margin: 0;
  color: #666;
}
</style>

