import { defineStore } from "pinia";
import zhCN from "element-plus/es/locale/lang/zh-cn";
import enUS from "element-plus/es/locale/lang/en";

const useAppStore = defineStore("app", () => {
  const sidebarStatus = useStorage("sidebarStatus", "1");
  const device = ref<string>("desktop");
  const sidebar = ref<SidebarOption>({
    opened: sidebarStatus.value ? !!+sidebarStatus.value : true,
    hide: false,
    withoutAnimation: false
  });

  // 控制element-plus显示语言
  const elLangObj: any = { en_US: enUS, zh_CN: zhCN };
  const language = useStorage("language", "zh_CN");
  const locale = computed(() => elLangObj[language.value]);

  /**
   * 控制侧边栏是否收缩
   */
  const toggleSidebar = () => {
    sidebar.value.opened = !sidebar.value.opened;
    sidebarStatus.value = sidebar.value.opened ? "1" : "0";
  };

  return {
    device,
    sidebar,
    locale,
    toggleSidebar
  };
});

export default useAppStore;
