import type { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import svgLoader from "vite-svg-loader";
import unplugins from "./unplugin";
import { resolve } from "path";

function setupI18n(): PluginOption {
  return VueI18nPlugin({
    runtimeOnly: true,
    compositionOnly: true,
    include: [resolve("locales/**")]
  });
}

export function setupPluginList(): PluginOption[] {
  return [vue(), vueJsx(), setupI18n(), svgLoader(), ...unplugins()];
}
