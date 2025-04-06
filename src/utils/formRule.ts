import type { FormRules } from "element-plus";

// 用户表单验证规则
export const userFormRules: FormRules = {
  userName: [
    { required: true, message: "用户名称不能为空", trigger: "blur" },
    {
      min: 2,
      max: 20,
      message: "用户名称长度必须介于 2 和 20 之间",
      trigger: "blur"
    }
  ],
  nickName: [{ required: true, message: "用户昵称不能为空", trigger: "blur" }],
  password: [
    { required: true, message: "用户密码不能为空", trigger: "blur" },
    {
      min: 5,
      max: 20,
      message: "用户密码长度必须介于 5 和 20 之间",
      trigger: "blur"
    },
    { pattern: /^[^<>"'|\\]+$/, message: "不能包含非法字符：< > \" ' \\ |", trigger: "blur" }
  ],
  email: [
    {
      type: "email",
      message: "请输入正确的邮箱地址",
      trigger: ["blur", "change"]
    }
  ],
  phonenumber: [
    {
      pattern: /^1[3|456789][0-9]\d{8}$/,
      message: "请输入正确的手机号码",
      trigger: "blur"
    }
  ],
  roleIds: [{ required: true, message: "用户角色不能为空", trigger: "blur" }]
};

export default {
  userFormRules
};
