import { defineStore } from "pinia";
import type { AppType } from "@/store/types";
import { store } from "@/store";
import { deviceDetection } from "@/store/utils";

const useAppStore = defineStore({
  id: "pure--app",
  state: (): AppType => ({
    sidebar: {
      opened: true,
      withoutAnimation: false,
      isClickCollapse: false
    },
    layout: "vertical",
    device: deviceDetection() ? "mobile" : "desktop",
    viewportSize: {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    },
    sortSwap: false
  }),
  getters: {
    getSidebarStatus(state) {
      return state.sidebar.opened;
    },
    getDevice(state) {
      return state.device;
    },
    getViewportWidth(state) {
      return state.viewportSize.width;
    },
    getViewportHeight(state) {
      return state.viewportSize.height;
    }
  },
  actions: {}
});

export function useAppStoreHook() {
  return useAppStore(store);
}
