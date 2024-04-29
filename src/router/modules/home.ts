import { home } from "@/router/enums";
import { $t } from "@/plugins/i18n";

export default {
  path: "/",
  name: "Home",
  redirect: "/login",
  meta: {
    icon: "ep:home-filled",
    title: $t("menus.pureHome"),
    rank: home
  }
} satisfies RouteConfigsTable;
