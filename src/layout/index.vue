<script setup lang="ts">
import { SetType } from "@/layout/types";
import { computed, onMounted, reactive } from "vue";
import { useAppStoreHook } from "@/store/modules/app";
import { useSettingStoreHook } from "@/store/modules/setting";
import AppMain from "@/layout/components/appMain.vue";
import Vertical from "@/layout/components/sidebar/vertical.vue";

const globalSetting = useSettingStoreHook();

const set: SetType = reactive({
  sidebar: computed(() => {
    return useAppStoreHook().sidebar;
  }),
  device: computed(() => {
    return useAppStoreHook().device;
  }),
  fixedHeader: computed(() => {
    return globalSetting.fixedHeader;
  }),
  classes: computed(() => {
    return {
      hideSidebar: !set.sidebar.opened,
      openSidebar: set.sidebar.opened,
      withoutAnimation: set.sidebar.withoutAnimation,
      mobile: set.device === "mobile"
    };
  }),
  hideTabs: false
});

onMounted(() => {
  window.document.body.setAttribute("layout", "vertical");
});
</script>

<template>
  <div ref="appWrapper" :class="['app-wrapper', set.classes]">
    <Vertical />
    <div :class="['main-container']">
      <AppMain />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  &::after {
    display: table;
    clear: both;
    content: "";
  }

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
</style>
