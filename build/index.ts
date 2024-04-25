import { dirname } from "node:path/win32";
import { resolve } from "path";
import { fileURLToPath } from "url";

/** 当前执行node命令时文件夹的地址（工作目录） */
const rootPath: string = process.cwd();

const wrapperEnv = (envConf: Recordable): ViteEnv => {
  const ret: ViteEnv = {
    VITE_PORT: 8848,
    VITE_PUBLIC_PATH: "",
    VITE_ROUTER_HISTORY: "",
    VITE_CDN: false,
    VITE_HIDE_HOME: "false",
    VITE_COMPRESSION: "none"
  };

  for (const envName of Object.keys(envConf)) {
    let configVal = envConf[envName].replace(/\\n/g, "\n");
    configVal = configVal === "true" ? true : configVal === "false" ? false : configVal;

    if (envName === "VITE_PORT") {
      configVal = Number(configVal);
    }
    ret[envName] = configVal;
    if (typeof configVal === "string") {
      process.env[envName] = configVal;
    } else if (typeof configVal === "object") {
      process.env[envName] = JSON.stringify(configVal);
    }
  }
  return ret;
};

/** 路径查找 */
const pathResolve = (dir = ".", metaUrl = import.meta.url) => {
  console.log("metaUrl: ", metaUrl);
  const curDir = dirname(fileURLToPath(metaUrl));
  const buildDir = resolve(curDir, "build");
  const resolvedPath = resolve(curDir, dir);
  if (resolvedPath.startsWith(buildDir)) {
    return fileURLToPath(metaUrl);
  }
  return resolvedPath;
};

/** 设置别名 */
const alias: Record<string, string> = {
  "@": pathResolve("../src"),
  "@build": pathResolve()
};

export { rootPath, alias, pathResolve, wrapperEnv };
