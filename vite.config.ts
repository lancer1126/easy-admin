// noinspection ES6PreferShortImport,JSUnusedGlobalSymbols

import { type ConfigEnv, type UserConfigExport, loadEnv } from "vite";
import { alias, rootPath, wrapperEnv } from "./build";
import { setupPlugin } from "./build/plugins";

export default ({ mode }: ConfigEnv): UserConfigExport => {
  const viteEnv = wrapperEnv(loadEnv(mode, rootPath));
  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    root: rootPath,
    resolve: {
      alias
    },
    server: {
      port: viteEnv.VITE_PORT,
      host: "0.0.0.0",
      proxy: {},
      warmup: {
        // 预热文件以提前转换和缓存结果，降低启动期间的初始页面加载时长并防止转换瀑布
        clientFiles: ["./index.html", "./src/{views,components}/*"]
      }
    },
    plugins: setupPlugin(),
    optimizeDeps: {
      // include,
      // exclude
    },
    build: {
      target: "es2015",
      sourcemap: false,
      chunkSizeWarningLimit: 4000
    }
  };
};
