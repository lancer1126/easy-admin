import { defineStore } from "pinia";

const useAppStore = defineStore("app", () => {
  const sidebarStatus = useStorage("sidebarStatus", "1");
  const device = ref<string>("desktop");
  const sidebar = ref<SidebarOption>({
    opened: sidebarStatus.value ? !!+sidebarStatus.value : true,
    hide: false,
    withoutAnimation: false
  });

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
    toggleSidebar
  };
});

export default useAppStore;
