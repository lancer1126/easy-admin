<script setup lang="ts">
import { LoginData, TenantVO } from "@/api/types";
import { useI18n } from "vue-i18n";
import { getCodeImg, getTenantList } from "@/api/login/login";
import { to } from "await-to-js";
import useUserStore from "@/store/modules/user";

const { t } = useI18n();
const loading = ref(false);
const tenantEnabled = ref(true);
const captchaEnabled = ref(false);
const codeUrl = ref("");
const redirectUrl = ref("/");
const tenantList = ref<TenantVO[]>([]);
const loginRef = ref<ElFormInstance>();
const userStore = useUserStore();
const router = useRouter();

const loginForm = ref<LoginData>({
  tenantId: "00000",
  username: "admin",
  password: "admin123",
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
  loginRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true;
      // 若勾选记住我，保存登录信息
      if (loginForm.value.rememberMe) {
        localStorage.setItem("tenantId", String(loginForm.value.tenantId));
        localStorage.setItem("username", String(loginForm.value.username));
        localStorage.setItem("password", String(loginForm.value.password));
        localStorage.setItem("rememberMe", String(loginForm.value.rememberMe));
      } else {
        localStorage.removeItem("tenantId");
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        localStorage.removeItem("rememberMe");
      }

      // 请求登录接口
      const [err] = await to(userStore.login(loginForm.value));
      if (!err) {
        const redirect = redirectUrl.value || "/";
        await router.push(redirect);
        loading.value = false;
      } else {
        loading.value = false;
        if (captchaEnabled.value) {
          await refreshCode();
        }
      }
    } else {
      console.log("登录表单数据校验错误!!");
    }
  });
};

/**
 * 刷新验证码
 */
const refreshCode = async () => {
  let res = await getCodeImg();
  const { data } = res;
  captchaEnabled.value = data.captchaEnabled ?? true;
  if (captchaEnabled.value) {
    codeUrl.value = "data:image/gif;base64," + data.img;
    loginForm.value.uuid = data.uuid;
  }
};

/**
 * 若用户之前勾选过记住我，检查本地存储中是否有相关信息
 */
const initLoginData = () => {
  const tenantId = localStorage.getItem("tenantId");
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  const rememberMe = localStorage.getItem("rememberMe");
  loginForm.value = {
    tenantId: tenantId ?? String(loginForm.value.tenantId),
    username: username ?? String(loginForm.value.username),
    password: password ?? String(loginForm.value.password),
    rememberMe: rememberMe ?? false
  } as LoginData;
};

watch(
  () => router.currentRoute.value,
  (newRoute: any) => {
    redirectUrl.value = newRoute.query && newRoute.query.redirect && decodeURIComponent(newRoute.query.redirect);
  },
  { immediate: true }
);

onMounted(() => {
  initTenants();
  refreshCode();
  initLoginData();
});
</script>

<template>
  <div class="login">
    <!-- 登录表单 -->
    <el-form ref="loginRef" class="login-form" :model="loginForm" :rules="loginRules">
      <div class="title-box">
        <h3 class="title">GTA6入口(不是)</h3>
      </div>
      <!-- 租户信息 -->
      <el-form-item v-if="tenantEnabled" prop="tenantId">
        <el-select v-model="loginForm.tenantId" filterable style="width: 100%">
          <el-option v-for="item in tenantList" :key="item.tenantId" :label="item.companyName" :value="item.tenantId" />
          <template #prefix>
            <svg-icon icon-class="company" class="el-input__icon input-icon" />
          </template>
        </el-select>
      </el-form-item>
      <!-- 用户名 -->
      <el-form-item>
        <el-input v-model="loginForm.username" type="text" size="large" auto-complete="off">
          <template #prefix>
            <svg-icon icon-class="user" class="el-input__icon input-icon" />
          </template>
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
          <template #prefix>
            <svg-icon icon-class="password" class="el-input__icon input-icon" />
          </template>
        </el-input>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="code">
        <el-input
          v-model="loginForm.code"
          size="large"
          autocomplete="off"
          style="width: 62%"
          @keyup.enter="handleLogin"
        >
          <template #prefix>
            <svg-icon icon-class="validCode" class="el-input__icon input-icon" />
          </template>
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="refreshCode" class="code-image" alt="" />
        </div>
      </el-form-item>
      <!-- 记住我勾选框 -->
      <el-checkbox v-model="loginForm.rememberMe" style="margin: 0 0 15px 0">
        {{ $t("login.rememberPassword") }}
      </el-checkbox>
      <!-- 登录按钮 -->
      <el-form-item style="width: 100%">
        <el-button :loading="loading" size="large" type="primary" style="width: 100%" @click.prevent="handleLogin">
          <span v-if="!loading">{{ $t("login.login") }}</span>
          <span v-else>{{ $t("login.logging") }}</span>
        </el-button>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2024-2025 lancer1126 Rights Reserved.</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-size: cover;
  background-image: url("@/assets/images/background-gta6.jpg");
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  opacity: 0.85;

  .el-input {
    height: 40px;

    input {
      height: 40px;
    }
  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0;
  }
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

.login-code {
  width: 38%;
  height: 40px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
    float: right;
  }
}

.code-image {
  height: 38px;
  padding-right: 0;
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  color: #fff;
  font-family: Arial, serif;
  font-size: 12px;
  letter-spacing: 1px;
}
</style>
