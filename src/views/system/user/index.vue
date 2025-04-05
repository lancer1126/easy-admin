<script setup lang="ts">
import { UserVO } from "@/api/system/user/type";
import { DeptTreeVO } from "@/api/system/dept/type";
import { fetchDeptTree, listUser } from "@/api/system/user";
import { UserForm, UserQuery } from "@/api/system/user/type";
import { useDict } from "@/utils/dict";

const deptSearch = ref<string>("");
const deptTreeData = ref<DeptTreeVO[]>([]);
const deptTreeProps = {
  label: "label",
  children: "children"
};
const dateRange = ref<[DateModelType, DateModelType]>(["", ""]);

// 查询表单的引用
const queryFormRef = ref<ElFormInstance>();
// 查询表单的默认值
const initFormData: UserForm = {
  userId: undefined,
  deptId: undefined,
  userName: "",
  nickName: undefined,
  password: "",
  phonenumber: undefined,
  email: undefined,
  sex: undefined,
  status: "0",
  remark: "",
  postIds: [],
  roleIds: []
};
// 初始化分页的查询对象
const initQueryData: PageData<UserForm, UserQuery> = {
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    userName: "",
    phonenumber: "",
    status: "",
    deptId: "",
    roleId: ""
  },
  rules: {
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
  }
};
const queryData = ref<PageData<UserForm, UserQuery>>(initQueryData);
const userList = ref<UserVO[]>([]);

const { queryParams } = toRefs<PageData<UserForm, UserQuery>>(queryData.value);
const { sys_normal_disable } = toRefs<any>(useDict("sys_normal_disable"));

/**
 * 当点击部门树中的某个节点时
 */
const handleNodeCLick = (node: DeptTreeVO) => {
  // todo 点击部门时查询部门数据
  return null;
};
/**
 * 获取用户管理中的部门信息
 */
const getDepTree = async () => {
  const res = await fetchDeptTree();
  deptTreeData.value = res.data;
};
/**
 * 查询部门
 */
const handleQuery = () => {
  // todo 查询
};
/**
 * 重置查询
 */
const resetQuery = () => {
  // todo 重置查询
};
/**
 * 获取用户列表
 */
const getUserList = async () => {
  const res = await listUser();
  userList.value = res.rows;
};

onMounted(() => {
  getDepTree();
  getUserList();
});
</script>

<template>
  <div class="p-2">
    <el-row :gutter="20">
      <!-- 部门信息树 -->
      <el-col :lg="4" :xs="24">
        <el-card shadow="hover">
          <el-input v-model="deptSearch" placeholder="请输入部门信息" prefix-icon="Search" clearable />
          <el-tree
            class="mt-2"
            :data="deptTreeData"
            :props="deptTreeProps"
            @node-click="handleNodeCLick"
            :expand-on-click-node="false"
            :highlight-current="true"
          />
        </el-card>
      </el-col>
      <!-- 部门人员具体信息-->
      <el-col :lg="20" :xs="24">
        <!-- 搜索条件 -->
        <el-card shadow="hover" class="mb-[10px]">
          <el-form :model="queryParams" ref="queryFormRef" :inline="true">
            <el-form-item label="用户名称" prop="userName">
              <el-input v-model="queryParams.userName" placeholder="请输入用户名" clearable />
            </el-form-item>
            <el-form-item label="手机号码" prop="phonenumber">
              <el-input v-model="queryParams.phonenumber" placeholder="请输入手机号码" clearable />
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-select v-model="queryParams.status" placeholder="用户状态" clearable>
                <el-option
                  v-for="dict in sys_normal_disable"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="创建日期" style="width: 308px">
              <el-date-picker
                v-model="dateRange"
                value-format="YYYY-MM-DD HH:mm:ss"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
              <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <!-- 搜索结果 -->
        <el-card shadow="hover">
          <template #header> 表头功能区 </template>
          <el-table :data="userList" style="width: 100%">
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column key="userId" label="编号" align="center" prop="userId" />
            <el-table-column key="userName" label="名称" align="center" prop="userName" />
            <el-table-column key="nickName" label="昵称" align="center" prop="nickName" />
            <el-table-column key="deptName" label="部门" align="center" prop="deptName" />
            <el-table-column key="phonenumber" label="手机号" align="center" prop="phonenumber" />
            <el-table-column key="status" label="状态" align="center" prop="status">
              <template #default="scope">
                <el-switch v-model="scope.row.status" active-value="0" inactive-value="1" />
              </template>
            </el-table-column>
            <el-table-column key="createTime" label="创建时间" align="center" prop="createTime" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped></style>
