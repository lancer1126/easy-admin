import type { App } from "vue";
import VueTippy from "vue-tippy";

export function useVueTippy(app: App) {
  app.use(VueTippy, {
    directive: "tippy" // => v-tippy
    // component: "tippy", // => <tippy/>
    // componentSingleton: "tippy-singleton", // => <tippy-singleton/>,
    // defaultProps: {
    //   placement: "auto-end",
    //   allowHTML: true
    // } // => Global default options * see all props
  });
}
