<template>
  <div class="home">
    <h1>Welcome to 4DPocket Vue</h1>
    <p class="subtitle">
      一个现代化的 Vue 3 前端开发脚手架
    </p>

    <div class="features">
      <h2>功能演示</h2>
      <nav class="demo-nav">
        <router-link
          to="/storage-demo"
          class="demo-link"
        >
          <h3>存储系统</h3>
          <p>localStorage/sessionStorage 封装</p>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #42b983;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 3rem;
}

.features {
  margin-top: 3rem;
}

.features h2 {
  color: #333;
  margin-bottom: 2rem;
}

.demo-nav {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.demo-link {
  display: block;
  padding: 2rem;
  border: 2px solid #e5e5e5;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s;
}

.demo-link:hover {
  border-color: #42b983;
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.15);
}

.demo-link h3 {
  color: #42b983;
  margin: 0.5rem 0;
}

.demo-link p {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}
</style>

