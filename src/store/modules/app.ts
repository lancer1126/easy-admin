import { defineStore } from "pinia";

const useAppStore = defineStore("app", () => {
  const device = ref<string>("desktop");
  const sidebarStatus = useStorage("sidebarStatus", "1");
  const sidebar = ref<SidebarOption>({
    opened: sidebarStatus.value ? !!+sidebarStatus.value : true,
    hide: false,
    withoutAnimation: false
  });

  return {
    device,
    sidebar
  };
});

export default useAppStore;
