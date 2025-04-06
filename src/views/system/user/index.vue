<script setup lang="ts">
import systemUserApi from "@/api/system/user";
import customRule from "@/utils/formRule";
import { UserVO } from "@/api/system/user/type";
import { DeptTreeVO } from "@/api/system/dept/type";
import { UserForm, UserQuery } from "@/api/system/user/type";
import { useDict } from "@/utils/dict";
import { confirmModal } from "@/utils/modal";

// 用户数据表单是否在加载
const tableLoading = ref<boolean>(false);
// 共查询到多少条用户数据
const totalRow = ref<number>(0);
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
  rules: customRule.userFormRules
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
  const res = await systemUserApi.fetchDeptTree();
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
const getUserList = async (pageNum?: number, pageSize?: number) => {
  tableLoading.value = true;
  if (pageNum !== undefined && pageNum > 0) {
    queryParams.value.pageNum = pageNum;
  }
  if (pageSize !== undefined && pageSize > 0) {
    queryParams.value.pageSize = pageSize;
  }

  try {
    const res = await systemUserApi.listUser(queryParams.value);
    userList.value = res.rows;
    totalRow.value = res.total;
  } finally {
    tableLoading.value = false;
  }
};
/**
 * 更新用户信息
 */
const handleUpdateUser = async (row: UserForm) => {
  // todo 修改用户信息
  return null;
};
/**
 * 删除用户信息
 * @param row
 */
const handleDeleteUser = async (row: UserForm) => {
  const userId = row.userId;
  if (!userId) {
    ElMessage.error("用户ID不能为空");
    return;
  }

  await confirmModal("是否删除用户？");
  await systemUserApi.delUser(userId);
  await getUserList();
  ElMessage.success("删除成功");
};
/**
 * 跳转页面
 */
const pageNumChange = async (pageNum: number) => {
  await getUserList(pageNum, undefined);
};
/**
 * 切换每页显示条数
 * @param pageSize
 */
const pageSizeChange = async (pageSize: number) => {
  await getUserList(undefined, pageSize);
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
          <!-- 表单内容 -->
          <el-table v-loading="tableLoading" :data="userList" style="width: 100%">
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
            <!-- 操作区 -->
            <el-table-column label="操作" align="center">
              <template #default="scope">
                <el-tooltip class="box-item" content="修改">
                  <el-button link type="primary" icon="Edit" @click="handleUpdateUser(scope.row)" />
                </el-tooltip>
                <el-tooltip class="box-item" content="删除">
                  <el-button link type="primary" icon="Delete" @click="handleDeleteUser(scope.row)" />
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <!-- 页面选择区 -->
          <Pagination
            :page-num="queryParams.pageNum"
            :limit-size="queryParams.pageSize"
            :total="totalRow"
            @page-change="pageNumChange"
            @size-change="pageSizeChange"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.box-item {
  width: 110px;
  margin-top: 10px;
}
</style>
