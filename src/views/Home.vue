<template>
  <div class="home">
    <div class="hero">
      <h1 class="hero-title">
        Welcome to 4DPocket Vue
      </h1>
      <p class="hero-subtitle">
        一个现代化的 Vue 3 + TypeScript 前端开发脚手架
      </p>
    </div>

    <div class="features">
      <h2 class="features-title">
        ✨ 功能演示
      </h2>
      <nav class="demo-grid">
        <router-link
          to="/storage-demo"
          class="demo-card"
        >
          <div class="demo-icon">
            💾
          </div>
          <h3 class="demo-title">
            存储系统
          </h3>
          <p class="demo-desc">
            localStorage/sessionStorage 封装
          </p>
          <div class="demo-badge">
            已实现
          </div>
        </router-link>

        <!-- 占位卡片 -->
        <div class="demo-card demo-card--disabled">
          <div class="demo-icon">
            🎨
          </div>
          <h3 class="demo-title">
            样式系统
          </h3>
          <p class="demo-desc">
            主题切换、CSS 变量
          </p>
          <div class="demo-badge demo-badge--disabled">
            开发中
          </div>
        </div>

        <div class="demo-card demo-card--disabled">
          <div class="demo-icon">
            🔧
          </div>
          <h3 class="demo-title">
            工具函数
          </h3>
          <p class="demo-desc">
            日期、验证、防抖节流
          </p>
          <div class="demo-badge demo-badge--disabled">
            开发中
          </div>
        </div>
      </nav>
    </div>

    <footer class="home-footer">
      <p class="text-secondary text-sm">
        Built with ❤️ using Vue 3 + TypeScript + Vite
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, $bg-white 0%, $bg-light 100%);
}

.hero {
  text-align: center;
  padding: $spacing-xxl $spacing-md;
  margin-bottom: $spacing-xl;
}

.hero-title {
  font-size: $font-size-xxl * 1.5;
  font-weight: $font-weight-bold;
  color: $primary-color;
  margin-bottom: $spacing-md;
  animation: fadeInUp 0.6s ease-out;

  @media (max-width: $breakpoint-sm) {
    font-size: $font-size-xxl;
  }
}

.hero-subtitle {
  font-size: $font-size-lg;
  color: $text-secondary;
  animation: fadeInUp 0.6s ease-out 0.2s both;
}

.features {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 $spacing-md $spacing-xxl;
}

.features-title {
  font-size: $font-size-xl;
  color: $text-primary;
  text-align: center;
  margin-bottom: $spacing-xl;
  animation: fadeInUp 0.6s ease-out 0.4s both;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: $spacing-lg;
  animation: fadeInUp 0.6s ease-out 0.6s both;
}

.demo-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $spacing-xl;
  background: $white;
  border: 2px solid $border-light;
  border-radius: $border-radius-lg;
  text-decoration: none;
  color: inherit;
  transition: all $transition-base $transition-ease;
  cursor: pointer;

  &:hover:not(&--disabled) {
    border-color: $primary-color;
    transform: translateY(-8px);
    box-shadow: $shadow-lg;
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;

    &:hover {
      transform: none;
      border-color: $border-light;
    }
  }
}

.demo-icon {
  font-size: 48px;
  margin-bottom: $spacing-md;
}

.demo-title {
  font-size: $font-size-lg;
  font-weight: $font-weight-bold;
  color: $text-primary;
  margin-bottom: $spacing-sm;
}

.demo-desc {
  font-size: $font-size-sm;
  color: $text-secondary;
  text-align: center;
  margin-bottom: $spacing-md;
}

.demo-badge {
  position: absolute;
  top: $spacing-md;
  right: $spacing-md;
  padding: $spacing-xs $spacing-sm;
  font-size: $font-size-xs;
  font-weight: $font-weight-medium;
  color: $white;
  background: $success-color;
  border-radius: $border-radius-xl;

  &--disabled {
    background: $gray-4;
  }
}

.home-footer {
  text-align: center;
  padding: $spacing-xl $spacing-md;
  border-top: 1px solid $border-light;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

