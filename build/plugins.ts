import type { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import svgLoader from "vite-svg-loader";
import unplugins from "./unplugin";
import { pathResolve } from "./index";

function setupI18n(): PluginOption {
  return VueI18nPlugin({
    jitCompilation: false,
    include: [pathResolve("../locales/**")]
  });
}

export function setupPlugin(): PluginOption[] {
  return [vue(), vueJsx(), setupI18n(), svgLoader(), ...unplugins()];
}
