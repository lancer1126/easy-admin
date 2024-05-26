<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { transformI18n } from "@/plugins/i18n";

const route = useRoute();
</script>

<template>
  <el-breadcrumb class="!leading-[50px] select-none" separator="/">
    <transition-group name="breadcrumb">
      {{ transformI18n(route.meta.title) }}
    </transition-group>
  </el-breadcrumb>
</template>
