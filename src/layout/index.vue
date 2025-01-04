<script setup lang="ts">
import { SetType } from "@/layout/types";
import { h, computed, defineComponent, onMounted, reactive } from "vue";
import { useAppStoreHook } from "@/store/modules/app";
import { useSettingStoreHook } from "@/store/modules/setting";
import AppMain from "@/layout/components/appMain.vue";
import NavVertical from "@/layout/components/sidebar/NavVertical.vue";
import Navbar from "@/layout/components/navbar.vue";
import Tag from "@/layout/components/tag/index.vue";

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

let layoutHeader = defineComponent({
  render() {
    return h(
      "div",
      { class: { "fixed-header": set.fixedHeader } },
      {
        default: () => [h(Navbar), h(Tag)]
      }
    );
  }
});
</script>

<template>
  <div ref="appWrapper" :class="['app-wrapper', set.classes]">
    <NavVertical />
    <div :class="['main-container']">
      <layout-header />
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
