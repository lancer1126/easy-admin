<script setup lang="ts">
import AppLink from "./Link.vue";
import { isExternal } from "@/utils/validate";
import { getNormalPath } from "@/utils/custom";

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  basePath: {
    type: String,
    default: ""
  },
  isNest: {
    type: Boolean,
    default: false
  }
});

const itemToShow = ref<any>({});

/**
 * 判断路由是否还有子路由，
 */
const showSelf = computed((): boolean => {
  // alwaysShow表示父级菜单也需要显示，反之若子菜单只有一个则不显示父级菜单
  return onlyOneChild(props.item) && (!itemToShow.value.children || itemToShow.value.noShowingChildren);
});

/**
 * 判断路由是否只有一个子路由
 */
const onlyOneChild = (menuItem: any): boolean => {
  let showingChildren = [];
  if (menuItem.children) {
    showingChildren = menuItem.children.filter((item: any) => !item.hidden);
  }
  if (showingChildren.length === 1) {
    // 如果只有一个子路由，但是父路由需要显示，则视为需要递归显示，反之则只显示唯一的子路由
    if (menuItem.alwaysShow) {
      return false;
    } else {
      itemToShow.value = showingChildren[0];
      return true;
    }
  } else if (showingChildren.length === 0) {
    itemToShow.value = { ...menuItem, path: "", noShowingChildren: true };
    return true;
  }
  return false;
};

/**
 * 处理路由链接
 * @param routePath
 * @param routeQuery
 */
const resolveRoutePath = (routePath: string, routeQuery?: string): any => {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath as string)) {
    return props.basePath;
  }
  if (routeQuery) {
    let query = JSON.parse(routeQuery);
    return { path: getNormalPath(props.basePath + "/" + routePath), query: query };
  }
  return getNormalPath(props.basePath + "/" + routePath);
};
</script>

<template>
  <div>
    <!-- 显示路由菜单 -->
    <template v-if="showSelf">
      <app-link v-if="itemToShow.meta" :to="resolveRoutePath(itemToShow.path, itemToShow.query)">
        <el-menu-item :index="resolveRoutePath(itemToShow.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
          <svg-icon :icon-class="itemToShow.meta.icon" />
          <template #title>
            <span class="menu-title">{{ itemToShow.meta.title }}</span>
          </template>
        </el-menu-item>
      </app-link>
    </template>
    <!-- 有多个子菜单 -->
    <el-sub-menu v-else :index="resolveRoutePath(item.path)" teleported>
      <template v-if="item.meta" #title>
        <svg-icon :icon-class="item.meta ? item.meta.icon : ''" />
        <span class="menu-title">{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="(child, index) in item.children"
        :key="child.path + index"
        :item="child"
        :basePath="resolveRoutePath(child.path)"
        :is-nest="true"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<style lang="scss" scoped></style>
