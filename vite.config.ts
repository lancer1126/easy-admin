import { defineConfig, loadEnv } from "vite";
import { rootPath, pathResolve, wrapperEnv } from "./build";
import { setupPluginList } from "./build/plugins";

export default defineConfig(configEnv => {
  const viteEnv = wrapperEnv(loadEnv(configEnv.mode, rootPath()));

  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    root: rootPath(),
    resolve: {
      alias: {
        "@": pathResolve("src"),
        "@build": pathResolve("build")
      }
    },
    server: {
      port: viteEnv.VITE_PORT,
      host: "0.0.0.0",
      warmup: {
        // 预热文件以提前转换和缓存结果，降低启动期间的初始页面加载时长并防止转换瀑布
        clientFiles: ["./index.html", "./src/{views,components}/*"]
      }
    },
    plugins: setupPluginList()
  };
});
