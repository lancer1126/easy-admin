<script setup lang="ts">
const route = useRoute();

// 路由是否需要缓存，默认需要
const isRouteCached = () => {
  return route.meta?.noCache !== true;
};
</script>

<template>
  <div class="app-main">
    <keep-alive v-if="isRouteCached">
      <router-view />
    </keep-alive>
    <router-view v-else />
  </div>
</template>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
