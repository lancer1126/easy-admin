/** 获取`logo` */
function getLogo() {
  return new URL("/logo.svg", import.meta.url).href;
}

export { getLogo };
