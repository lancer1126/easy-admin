import { reactive } from "vue";
import type { FormRules } from "element-plus";
import { $t, transformI18n } from "@/plugins/i18n";

/** 密码正则（密码格式应为8-18位数字、字母、符号的任意两种组合） */
export const REGEXP_PWD =
  /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){8,18}$/;

const loginRules = reactive<FormRules>({
  username: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error(transformI18n($t("login.purePassWordReg"))));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  password: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error(transformI18n($t("login.purePassWordReg"))));
        } else if (!REGEXP_PWD.test(value)) {
          callback(new Error(transformI18n($t("login.purePassWordRuleReg"))));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  verifyCode: []
});

export { loginRules };
