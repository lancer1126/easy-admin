import { createApp } from "vue";
import "./style/style.css";
import App from "./App.vue";
import { getPlatformConfig } from "@/config";

const app = createApp(App);

getPlatformConfig(app).then(() => {
  app.mount("#app");
});
