<script setup lang="ts">
import { RouteLocationMatched } from "vue-router";

const route = useRoute();
const router = useRouter();
// 当前路由层级列表
const levelList = ref<RouteLocationMatched[]>([]);

/**
 * 判断路由是否为首页，如果不是首页需要在头部加上首页
 */
const checkDashboard = (r: any): any => {
  const name = r[0]?.name?.toString() || "";
  if (name === "" || name.trim() === "Home") {
    return r;
  }
  return [{ path: "/home", meta: { title: "首页" } }].concat(r);
};
/**
 * 获取当前的路由信息
 */
const getBreadcrumb = () => {
  let matchedRoutes = route.matched.filter(item => item.meta && item.meta.title);
  levelList.value = checkDashboard(matchedRoutes);
};
/**
 * 判断路径是否可跳转
 */
const checkRedirect = (item: any, index: any) => {
  return item?.redirect === "noRedirect" || item?.redirect === "" || index === levelList.value.length - 1;
};
/**
 * 点击导航跳转
 */
const handleRedirect = (item: any) => {
  const { redirect, path } = item;
  if (redirect && redirect !== "noRedirect" && redirect !== "") {
    router.push(redirect);
  } else {
    router.push(path);
  }
};

watch(
  () => route.path,
  () => {
    if (route.path.startsWith("/redirect")) {
      return;
    }
    getBreadcrumb();
  },
  { immediate: true }
);
</script>

<template>
  <el-breadcrumb class="breadcrumb-container" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="checkRedirect(item, index)" class="no-redirect">{{ item.meta?.title }}</span>
        <a v-else @click.prevent="handleRedirect(item)">{{ item.meta?.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.breadcrumb-container {
  display: flex;
  height: 50px;
  font-size: 15px;
  align-items: center;
  justify-content: center;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
