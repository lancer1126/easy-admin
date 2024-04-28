import App from "./App.vue";
import router from "@/router";
import { createApp } from "vue";
import { MotionPlugin } from "@vueuse/motion";
import { FontIcon, IconifyIconOffline, IconifyIconOnline } from "@/components/ReIcon";
import { getPlatformConfig } from "@/config";
import { setupStore } from "@/store";
import { useI18n } from "@/plugins/i18n";
import { useEcharts } from "@/plugins/echarts";
import { useVxeTable } from "./plugins/vxeTable";

import PureTable from "@pureadmin/table";
import PureDescriptions from "@pureadmin/descriptions";

// 引入重置样式
import "./style/reset.scss";
// 导入公共样式
import "./style/index.scss";
// 导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import "./style/tailwind.css";
// 导入字体图标
import "./assets/iconfont/iconfont.js";
import "./assets/iconfont/iconfont.css";

const app = createApp(App);

// 全局注册@iconify/vue图标库
app.component("IconifyIconOffline", IconifyIconOffline);
app.component("IconifyIconOnline", IconifyIconOnline);
app.component("FontIcon", FontIcon);

getPlatformConfig(app).then(async () => {
  setupStore(app);
  app.use(router);
  await router.isReady();

  app.use(MotionPlugin).use(useI18n).use(PureTable).use(PureDescriptions).use(useVxeTable).use(useEcharts);
  app.mount("#app");
});
