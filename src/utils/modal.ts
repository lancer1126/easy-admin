import { ElMessageBox, ElMessage } from "element-plus";

/**
 * 确认框工具方法
 * @param content 提示内容
 * @param title 标题
 * @returns Promise 确认返回resolve，取消返回reject
 */
export const confirmModal = (content: string, title: string = "请确认"): Promise<void> => {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(content, title, {
      type: "warning",
      confirmButtonText: "确定",
      cancelButtonText: "取消"
    })
      .then(() => {
        ElMessage.success("操作成功");
        resolve();
      })
      .catch(() => {
        ElMessage.info("操作已取消");
        reject();
      });
  });
};

export default {
  confirmModal
};
