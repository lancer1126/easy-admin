import { AxiosPromise } from "axios";
import { DeptTreeVO } from "@/api/system/dept/type";
import request from "@/utils/request";
import { UserVO } from "./type";

export const fetchDeptTree = (): AxiosPromise<DeptTreeVO[]> => {
  return request({
    url: "system/user/deptTree",
    method: "get"
  });
};

export const listUser = (): AxiosPromise<UserVO[]> => {
  return request({
    url: "system/user/list",
    method: "get"
  });
};
