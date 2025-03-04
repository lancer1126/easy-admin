<script setup lang="ts">
import usePermissionStore from "@/store/modules/permission";
import SidebarItem from "./SidebarItem.vue";
import Logo from "@/layout/components/Sidebar/Logo.vue";
import variables from "@/assets/styles/variables.module.scss";
import useAppStore from "@/store/modules/app";

const route = useRoute();
const permissionStore = usePermissionStore();
const appStore = useAppStore();

const collapsed = computed(() => !appStore.sidebar.opened);
const sidebarRoutes = computed(() => permissionStore.sidebarRoutes);
const activeMenu = computed(() => {
  const { meta, path } = route;
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});

const bgColor = computed(() => variables.menuBackground);
const textColor = computed(() => variables.menuColor);
</script>

<template>
  <div>
    <logo :collapsed="collapsed" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        mode="vertical"
        :default-active="activeMenu"
        :background-color="bgColor"
        :text-color="textColor"
        :unique-opened="true"
        :collapse="collapsed"
      >
        <sidebar-item v-for="(r, index) in sidebarRoutes" :key="r.path + index" :item="r" :base-path="r.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
