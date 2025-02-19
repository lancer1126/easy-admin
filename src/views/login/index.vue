<script setup lang="ts">
import { LoginData, TenantVO } from "@/api/types";
import { useI18n } from "vue-i18n";
import { getTenantList } from "@/api/login/login";

const { t } = useI18n();
const loading = ref(false);
const tenantEnabled = ref(true);
const tenantList = ref<TenantVO[]>([]);

const loginForm = ref<LoginData>({
  tenantId: "00000",
  username: "admin",
  password: "123456",
  rememberMe: false,
  code: "",
  uuid: ""
} as LoginData);

const loginRules: ElFormRules = {
  tenantId: [{ required: true, trigger: "blur", message: t("login.rule.tenantId.required") }],
  username: [{ required: true, trigger: "blur", message: t("login.rule.username.required") }],
  password: [{ required: true, trigger: "blur", message: t("login.rule.password.required") }],
  code: [{ required: true, trigger: "change", message: t("login.rule.code.required") }]
};

/**
 * 获取租户列表
 */
const initTenants = async () => {
  const { data } = await getTenantList(false);
  tenantEnabled.value = data.tenantEnabled || true;
  if (tenantEnabled.value) {
    tenantList.value = data.voList;
    if (tenantList.value != null && tenantList.value.length > 0) {
      loginForm.value.tenantId = tenantList.value[0].tenantId;
    }
  }
};

/**
 * 登录
 */
const handleLogin = () => {
  // todo 登录逻辑
};

onMounted(() => {
  initTenants();
});
</script>

<template>
  <div class="login">
    <!-- 登录表单 -->
    <el-form class="login-form" :model="loginForm" :rules="loginRules">
      <div class="title-box">
        <h3 class="title">Easy-Admin管理系统</h3>
      </div>
      <!-- 租户信息 -->
      <el-form-item v-if="tenantEnabled" prop="tenantId">
        <el-select v-model="loginForm.tenantId" filterable style="width: 100%">
          <el-option v-for="item in tenantList" :key="item.tenantId" :label="item.companyName" :value="item.tenantId" />
          <template #prefix><svg-icon icon-class="company" class="el-input__icon input-icon" /></template>
        </el-select>
      </el-form-item>
      <!-- 用户名 -->
      <el-form-item>
        <el-input v-model="loginForm.username" type="text" size="large" auto-complete="off">
          <template #prefix><svg-icon icon-class="user" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          size="large"
          auto-complete="off"
          @keyup.enter="handleLogin"
        >
          <template #prefix><svg-icon icon-class="password" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <!-- 登录按钮 -->
      <el-form-item style="width: 100%">
        <el-button :loading="loading" size="large" type="primary" style="width: 100%" @click.prevent="handleLogin">
          <span v-if="!loading">{{ $t("login.login") }}</span>
          <span v-else>{{ $t("login.logging") }}</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100%;
  background-size: cover;
  background-image: url("@/assets/images/background-gta6.jpg");
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  opacity: 0.6;
}

.title-box {
  display: flex;

  .title {
    margin: 0 auto 30px auto;
    text-align: center;
    color: #707070;
  }

  :deep(.lang-select--style) {
    line-height: 0;
    color: #7483a3;
  }
}
</style>
