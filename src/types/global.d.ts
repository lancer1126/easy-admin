import type { ECharts } from "echarts";

declare global {
  /**
   * 打包压缩格式的类型声明
   */
  type ViteCompression = "none" | "gzip" | "brotli" | "both" | "gzip-clear" | "brotli-clear" | "both-clear";

  /**
   * 全局自定义环境变量的类型声明
   */
  interface ViteEnv {
    VITE_PORT: number;
    VITE_PUBLIC_PATH: string;
    VITE_ROUTER_HISTORY: string;
    VITE_CDN: boolean;
    VITE_HIDE_HOME: string;
    VITE_COMPRESSION: ViteCompression;
  }

  interface PlatformConfig {
    version?: string;
    title?: string;
  }

  interface GlobalPropertiesApi {
    $echarts: ECharts;
  }
}
