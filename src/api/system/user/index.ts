import { AxiosPromise } from "axios";
import { DeptTreeVO } from "@/api/system/dept/type";
import request from "@/utils/request";

export const fetchDeptTree = (): AxiosPromise<DeptTreeVO[]> => {
  return request({
    url: "system/user/deptTree",
    method: "get"
  });
};
