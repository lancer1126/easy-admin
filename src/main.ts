import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import i18n from "@/lang";
import { createApp } from "vue";

// 全局css
import "virtual:uno.css";
import "@/assets/styles/index.scss";
import "element-plus/theme-chalk/dark/css-vars.css";
// svg图标
import "virtual:svg-icons-register";
import ElementIcons from "@/plugins/svgicon";

// 创建主app
const app = createApp(App);
app.use(router).use(store).use(i18n).use(ElementIcons);

app.mount("#app");
