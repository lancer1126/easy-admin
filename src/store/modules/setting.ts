import { defineStore } from "pinia";

const useSettingStore = defineStore("setting", () => {
  let configTitle: string = "easy-admin";
  const defaultLayout = ref<LayoutSetting>({
    topNav: false,
    tagsView: true,
    fixedHeader: false,
    sidebarLogo: false,
    dynamicTitle: false,
    sideTheme: "theme-dark",
    theme: "default"
  });

  onMounted(async () => {
    const resp = await fetch("/config.json");
    if (!resp.ok) {
      throw new Error("Failed to fetch config.json");
    }
    const config = await resp.json();
    configTitle = config.title;
    if (config.layoutSetting) {
      Object.assign(defaultLayout, config.layoutSetting);
    }
  });

  const storageSetting = useStorage<LayoutSetting>("layout-setting", defaultLayout);
  const title = ref<string>(configTitle);
  const theme = ref<string>(storageSetting.value.theme);
  const sideTheme = ref<string>(storageSetting.value.sideTheme);
  const topNav = ref<boolean>(storageSetting.value.topNav);
  const tagsView = ref<boolean>(storageSetting.value.tagsView);
  const fixedHeader = ref<boolean>(storageSetting.value.fixedHeader);
  const sidebarLogo = ref<boolean>(storageSetting.value.sidebarLogo);
  const dynamicTitle = ref<boolean>(storageSetting.value.dynamicTitle);

  return {
    title,
    theme,
    sideTheme,
    topNav,
    tagsView,
    fixedHeader,
    sidebarLogo,
    dynamicTitle
  };
});

export default useSettingStore;
