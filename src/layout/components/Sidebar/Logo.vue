<script setup lang="ts">
import logoImg from "@/assets/images/GTA VI Logo.svg.png";
import useSettingStore from "@/store/modules/setting";

const appName = useSettingStore().appName;
defineProps({
  collapsed: {
    type: Boolean,
    required: true
  }
});
</script>

<template>
  <div class="sidebar-logo-container" :class="{ collapsed: collapsed }">
    <router-link to="/" class="sidebar-logo-link">
      <img :src="logoImg" class="sidebar-logo" alt="" />
      <h1 class="sidebar-app-name">{{ appName }}</h1>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    width: 100%;
    height: 100%;

    & .sidebar-logo {
      width: 34px;
      height: 34px;
      vertical-align: middle;
      margin-right: 16px;
    }

    & .sidebar-app-name {
      display: inline-block;
      margin: 0;
      vertical-align: middle;
      color: #f1ecec;
      font-weight: 600;
      line-height: 50px;
      font-size: 18px;
      font-family:
        Avenir,
        Helvetica Neue,
        Arial,
        Helvetica,
        sans-serif;
    }
  }

  &.collapsed {
    .sidebar-logo {
      margin-right: 5px;
    }
  }
}
</style>
