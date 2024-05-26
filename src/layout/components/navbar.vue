<script setup lang="ts">
import BreadCrumb from "@/layout/components/sidebar/breadCrumb.vue";
</script>

<template>
  <div class="navbar bg-[#fff] shadow-sm shadow-[rgba(0,21,41,0.08)]">
    <BreadCrumb class="breadcrumb-container" />
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 48px;
  overflow: hidden;

  .breadcrumb-container {
    float: left;
    margin-left: 16px;
  }
}
</style>
