<script lang="ts">
import { ElConfigProvider } from "element-plus";
import { defineComponent } from "vue";

export default defineComponent({
  name: "app",
  components: { [ElConfigProvider.name]: ElConfigProvider }
});
</script>

<template>
  <el-config-provider>
    <router-view />
  </el-config-provider>
</template>
