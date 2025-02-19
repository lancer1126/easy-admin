import type { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCss from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";
import compression from "vite-plugin-compression";
import Icons from "unplugin-icons/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import unpluginExtendPlus from "unplugin-vue-setup-extend-plus/vite";
import path from "path";

const setupUnoCss = () => {
  return UnoCss({
    hmrTopLevelAwait: false
  });
};

const setupCompression = (env: any) => {
  const { VITE_BUILD_COMPRESS } = env;
  const plugins: any[] = [];
  if (VITE_BUILD_COMPRESS) {
    const compressList = VITE_BUILD_COMPRESS.split(",");
    if (compressList.includes("gzip")) {
      plugins.push(
        compression({
          ext: ".gz",
          deleteOriginFile: false
        })
      );
    }
    if (compressList.includes("brotli")) {
      plugins.push(
        compression({
          ext: ".br",
          algorithm: "brotliCompress",
          deleteOriginFile: false
        })
      );
    }
  }
  return plugins;
};

const setupIcons = () => {
  return Icons({
    autoInstall: true
  });
};

const setupSvgIcons = (isBuild: boolean) => {
  return createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), "src/assets/icons/svg")],
    symbolId: "icon-[dir]-[name]",
    svgoOptions: isBuild
  });
};

const setupUnPlugins = () => {
  return [
    AutoImport({
      // 自动导入vue、pinia等API，无需在文件中手动导入
      imports: ["vue", "vue-router", "@vueuse/core", "pinia"],
      resolvers: [ElementPlusResolver(), IconsResolver({ prefix: "Icon" })],
      dts: path.resolve(process.cwd(), "src/types/auto-imports.d.ts"),
      vueTemplate: true,
      // 生成和管理ESLint的配置文件，以确保自动导入的函数和组件不会被ESLint报错
      eslintrc: {
        enabled: false, // 首次启动设为true，成功生成文件后改为false
        filepath: path.resolve(process.cwd(), ".eslintrc-auto-import.json"),
        globalsPropValue: true
      }
    }),
    Components({
      resolvers: [ElementPlusResolver(), IconsResolver({ enabledCollections: ["ep"] })],
      dts: path.resolve(process.cwd(), "src/types/components.d.ts")
    })
  ];
};

const setupUnpluginExtend = () => {
  return unpluginExtendPlus({});
};

export default (viteEnv: any, isBuild = false): PluginOption[] => {
  return [
    vue(),
    setupUnoCss(),
    setupCompression(viteEnv),
    setupIcons(),
    setupSvgIcons(isBuild),
    ...setupUnPlugins(),
    setupUnpluginExtend()
  ];
};
