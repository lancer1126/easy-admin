import { AxiosPromise } from "axios";
import { DeptTreeVO } from "@/api/system/dept/type";
import request from "@/utils/request";
import { UserQuery, UserVO } from "./type";

export const fetchDeptTree = (): AxiosPromise<DeptTreeVO[]> => {
  return request({
    url: "system/user/deptTree",
    method: "get"
  });
};

export const listUser = (query: UserQuery): AxiosPromise<UserVO[]> => {
  return request({
    url: "system/user/list",
    method: "get",
    params: query
  });
};

/**
 * 删除用户
 * @param userId 用户ID
 */
export const delUser = (userId: Array<string | number> | string | number) => {
  return request({
    url: "/system/user/" + userId,
    method: "delete"
  });
};

export default {
  fetchDeptTree,
  listUser,
  delUser
};
