import { Component, defineComponent, h } from "vue";

interface Options {
  name?: string;
}

export function createCustomNameComponent(loader: () => Promise<any>, options: Options = {}): () => Promise<Component> {
  const { name } = options;
  let component: Component | null = null;

  const load = async () => {
    try {
      const { default: loadedComponent } = await loader();
      component = loadedComponent;
    } catch (error) {
      console.error(`Cannot resolve component ${name}, error:`, error);
    }
  };

  return async () => {
    if (!component) {
      await load();
    }

    return Promise.resolve(
      defineComponent({
        name,
        render() {
          return h(component as Component);
        }
      })
    );
  };
}

// 返回项目路径
export const getNormalPath = (p: string): string => {
  if (p.length === 0 || !p || p === "undefined") {
    return p;
  }
  const res = p.replace("//", "/");
  if (res[res.length - 1] === "/") {
    return res.slice(0, res.length - 1);
  }
  return res;
};
