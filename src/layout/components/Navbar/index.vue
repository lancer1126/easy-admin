<script setup lang="ts">
import useAppStore from "@/store/modules/app";

const appStore = useAppStore();

// 侧边栏是否是打开状态
const sidebarOpened = computed(() => appStore.sidebar.opened);

/**
 * 切换是否收缩侧边栏
 */
const toggleSidebar = () => appStore.toggleSidebar();
</script>

<template>
  <div class="navbar-container">
    <hamburger class="hamburger-container" :is-opened="sidebarOpened" @toggle-click="toggleSidebar" />
  </div>
</template>

<style lang="scss" scoped>
.navbar-container {
  display: flex;
  height: 50px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    transition: background-color 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background-color: rgba(0, 0, 0, 0.025);
    }
  }
}
</style>
