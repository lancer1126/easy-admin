// 路径匹配
export function isPathMatch(pattern: string, path: string) {
  const regexPattern = pattern
    .replace(/\//g, "\\/")
    .replace(/\*\*/g, "__DOUBLE_STAR__")
    .replace(/\*/g, "[^\\/]*")
    .replace(/__DOUBLE_STAR__/g, ".*");
  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(path);
}

/**
 * 判断url是否是http或https
 * @returns {Boolean}
 * @param url
 */
export const isHttp = (url: string): boolean => {
  return url.indexOf("http://") !== -1 || url.indexOf("https://") !== -1;
};

/**
 * 判断path是否为外链
 * @param {string} path
 * @returns {Boolean}
 */
export const isExternal = (path: string) => {
  return /^(https?:|mailto:|tel:)/.test(path);
};
