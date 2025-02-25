import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { RouteRecordRaw } from "vue-router";

export function getUserRoutes(): AxiosPromise<RouteRecordRaw[]> {
  return request({
    url: "/system/menu/getRouters",
    method: "get"
  });
}
