import type { App } from "vue";
import rs from "responsive-storage";
import { responsiveStorageNameSpace } from "@/config";

export const initResponsiveStorage = (app: App, config: PlatformConfig) => {
  const nameSpace = responsiveStorageNameSpace();
  const configObj = Object.assign(
    {
      locale: rs.getData("locale", nameSpace) ?? { locale: config.Locale ?? "zh" }
    },
    {}
  );

  app.use(rs, { nameSpace, memory: configObj });
};
