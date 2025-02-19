import { AxiosPromise } from "axios";
import { TenantInfo } from "@/api/types";
import request from "@/utils/request";

/**
 * 获取租户列表
 * @param hasToken
 */
export function getTenantList(hasToken: boolean): AxiosPromise<TenantInfo> {
  return request({
    url: "/auth/tenant/list",
    method: "get",
    headers: {
      hasToken: hasToken
    }
  });
}
