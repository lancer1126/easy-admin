<script setup lang="ts">
import usePermissionStore from "@/store/modules/permission";

const permStore = usePermissionStore();

const sidebarRoutes = computed(() => permStore.sidebarRoutes);
</script>

<template>
  <div>侧边栏</div>
</template>

<style scoped></style>
