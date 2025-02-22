<script setup lang="ts">
import Sidebar from "@/layout/components/Sidebar/index.vue";
import Navbar from "@/layout/components/Navbar/index.vue";
import TagsView from "@/layout/components/TagsView/index.vue";
import AppMain from "@/layout/components/AppMain/index.vue";
import useSettingStore from "@/store/modules/setting";
import useAppStore from "@/store/modules/app";

const settingStore = useSettingStore();
const appStore = useAppStore();
const theme = computed(() => settingStore.theme);
const sidebarOpt = computed(() => appStore.sidebar);
const fixedHeader = computed(() => settingStore.fixedHeader);

const dynamicAppWrapper = computed(() => ({
  hideSidebar: !sidebarOpt.value.opened,
  openSidebar: sidebarOpt.value.opened,
  withoutAnimation: sidebarOpt.value.withoutAnimation,
  mobile: appStore.device === "mobile"
}));
</script>

<template>
  <div class="app-wrapper" :class="dynamicAppWrapper" :style="{ '--current-color': theme }">
    <sidebar v-if="!sidebarOpt.hide" class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
        <tags-view />
      </div>
      <app-main />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.module.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  //当前元素同时具有 mobile 和 openSidebar 类时
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$base-sidebar-width});
  transition: width 0.28s;
  background: $fixed-header-bg;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.sidebarHide .fixed-header {
  width: 100%;
}

.mobile .fixed-header {
  width: 100%;
}
</style>
