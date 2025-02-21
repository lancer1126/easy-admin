// noinspection ES6PreferShortImport,JSUnusedGlobalSymbols

import { type ConfigEnv, type UserConfigExport, loadEnv } from "vite";
import setupPlugins from "./src/plugins/vitePlugin";
import path from "path";

export default ({ mode }: ConfigEnv): UserConfigExport => {
  const viteEnv = loadEnv(mode, process.cwd());
  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./"),
        "@": path.resolve(__dirname, "./src")
      }
    },
    server: {
      port: Number(viteEnv.VITE_PORT),
      host: "0.0.0.0",
      proxy: {
        [viteEnv.VITE_BASE_API]: {
          target: "http://localhost:8080",
          changeOrigin: true,
          ws: true,
          rewrite: path => path.replace(new RegExp("^" + viteEnv.VITE_BASE_API), "")
        }
      },
      warmup: {
        // 预热文件以提前转换和缓存结果，降低启动期间的初始页面加载时长并防止转换瀑布
        clientFiles: ["./index.html", "./src/{views,components}/*"]
      }
    },
    plugins: setupPlugins(viteEnv, mode === "build"),
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern"
        }
      }
    },
    optimizeDeps: {
      include: [
        "vue",
        "vue-router",
        "pinia",
        "@vueuse/core",
        "echarts",
        "vue-i18n",
        "@vueup/vue-quill",
        "image-conversion",
        "element-plus/es/components/**/css"
      ]
    }
  };
};
