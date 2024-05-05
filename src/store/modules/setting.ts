import { defineStore } from "pinia";
import { store } from "@/store";
import type { SettingType } from "@/store/types";
import { getConfig } from "@/config";

const useSettingStore = defineStore({
  id: "pure-setting",
  state: (): SettingType => ({
    title: getConfig().Title,
    fixedHeader: getConfig().FixedHeader,
    hiddenSideBar: getConfig().HiddenSideBar
  }),
  getters: {
    getTitle(state) {
      return state.title;
    },
    getFixedHeader(state) {
      return state.fixedHeader;
    },
    getHiddenSideBar(state) {
      return state.hiddenSideBar;
    }
  },
  actions: {
    CHANGE_SETTING({ key, value }) {
      if (Reflect.has(this, key)) {
        this[key] = value;
      }
    }
  }
});

export function useSettingStoreHook() {
  return useSettingStore(store);
}
