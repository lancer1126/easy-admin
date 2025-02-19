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
