import { home } from "@/router/enums";
import { $t } from "@/plugins/i18n";

const { VITE_HIDE_HOME } = import.meta.env;

export default {
  path: "/",
  name: "Home",
  component: () => import("@/layout/index.vue"),
  redirect: "/welcome",
  meta: {
    icon: "ep:home-filled",
    title: $t("menus.pureHome"),
    rank: home
  },
  children: [
    {
      path: "/welcome",
      name: "Welcome",
      component: () => import("@/views/welcome/index.vue"),
      meta: {
        title: $t("menus.pureHome"),
        showLink: VITE_HIDE_HOME !== "true"
      }
    }
  ]
} satisfies RouteConfigsTable;
