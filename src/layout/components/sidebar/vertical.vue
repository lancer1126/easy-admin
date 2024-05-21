<script setup lang="ts">
import { computed, ref } from "vue";
import { usePermissionStoreHook } from "@/store/modules/permission";
import Logo from "@/layout/components/sidebar/logo.vue";

const showScroll = ref(false);
const showLogo = ref(true);
const menus = computed(() => {
  return usePermissionStoreHook().wholeMenus;
});
const loading = computed(() => menus.value.length === 0);
</script>

<template>
  <div
    v-loading="loading"
    :class="['sidebar-container', 'has-logo']"
    @mouseenter.prevent="showScroll = true"
    @mouseleave.prevent="showScroll = false"
  >
    <Logo v-if="showLogo" />
  </div>
</template>

<style scoped></style>
