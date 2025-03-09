// 根据字典类型查询字典数据信息
import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { DictDataVO } from "@/api/system/dict/type";

/**
 * 根据字典类型查询字典数据信息
 */
export function getDicts(dictType: string): AxiosPromise<DictDataVO[]> {
  return request({
    url: "/system/dict/data/type/" + dictType,
    method: "get"
  });
}
