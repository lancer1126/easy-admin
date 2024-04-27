import type { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import svgLoader from "vite-svg-loader";
import unplugins from "./unplugin";
import { pathResolve } from "./index";
import { themePreprocessorPlugin } from "@pureadmin/theme";
import { genScssMultipleScopeVars } from "../src/layout/theme";

const setupI18n = (): PluginOption =>
  VueI18nPlugin({
    jitCompilation: false,
    include: [pathResolve("../locales/**")]
  });

const setupTheme = (): PluginOption =>
  themePreprocessorPlugin({
    scss: {
      multipleScopeVars: genScssMultipleScopeVars(),
      extract: true
    }
  });

export function setupPlugin(): PluginOption[] {
  return [vue(), vueJsx(), setupI18n(), svgLoader(), setupTheme(), ...unplugins()];
}
