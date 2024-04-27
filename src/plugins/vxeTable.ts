import "vxe-table/lib/style.css";
import type { App } from "vue";


import {
  // 全局对象
  VXETable,
  Custom,
  // 可选组件
  Icon,
  Column,
  // 表格
  Table
} from "vxe-table";

// 全局默认参数
VXETable.config({
});

export function useVxeTable(app: App) {
  // 表格功能
  app
    .use(Custom)
    // 可选组件
    .use(Icon)
    .use(Column)
    // 安装表格
    .use(Table);
}
