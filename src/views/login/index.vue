<script setup lang="ts">
import { bg, illustration, avatar } from "./utils/static";
import { toRaw, ref, reactive, watch } from "vue";
import Motion from "@/views/login/utils/motion";
import { FormInstance } from "element-plus";
import { loginRules } from "@/views/login/utils/rule";
import { useI18n } from "vue-i18n";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import ReImageVerify from "@/components/ReImageVerify";
import User from "@iconify-icons/ri/user-3-fill";
import Lock from "@iconify-icons/ri/lock-fill";
import Info from "@iconify-icons/ri/information-line";
import IconifyIconOffline from "@/components/ReIcon/src/iconifyIconOffline";
import { useUserStoreHook } from "@/store/modules/user";
import { initRouter } from "@/router/utils";
import { useRouter } from "vue-router";
import { useEventListener } from "@vueuse/core";
import { debounce } from "@pureadmin/utils";
import { setToken } from "@/utils/auth";

defineOptions({
  name: "Login"
});

const router = useRouter();
const title = ref("Easy Admin");
const imgCode = ref("");
const loginDay = ref(7);
const checked = ref(false);
const loading = ref(false);
const disabled = ref(false);
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  username: "admin",
  password: "admin123",
  verifyCode: ""
});

const { t } = useI18n();

const onLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      loading.value = true;
      useUserStoreHook()
        .login(ruleForm)
        .then(resp => {
          if (resp.success) {
            setToken(resp.data);
            return initRouter().then(() => {
              disabled.value = true;
              router.push("/welcome").finally(() => (disabled.value = false));
            });
          }
        })
        .finally(() => (loading.value = false));
    }
  });
};
const immediateDebounce: any = debounce(formRef => onLogin(formRef), 1000, true);

watch(imgCode, value => {
  useUserStoreHook().SET_VERIFY_CODE(value);
});
watch(checked, value => {
  useUserStoreHook().SET_REMEMBERED(value);
});
watch(loginDay, value => {
  useUserStoreHook().SET_LOGIN_DAY(value);
});

useEventListener(document, "keypress", ({ code }) => {
  if (code === "Enter" && !disabled.value && !loading.value) {
    immediateDebounce(ruleFormRef.value);
  }
});
</script>

<template>
  <div class="select-none">
    <!-- 背景图片 -->
    <img :src="bg" class="wave" alt="" />
    <!-- 登录信息 -->
    <div class="login-container">
      <div class="img">
        <component :is="toRaw(illustration)" />
      </div>
      <div class="login-box">
        <div class="login-form">
          <avatar class="avatar" />
          <Motion>
            <h2 class="outline-none">{{ title }}</h2>
          </Motion>
          <el-form ref="ruleFormRef" :model="ruleForm" :rules="loginRules" size="large">
            <!-- 用户名 -->
            <Motion :delay="100">
              <el-form-item prop="username">
                <el-input
                  v-model="ruleForm.username"
                  clearable
                  :placeholder="t('login.pureUsername')"
                  :prefix-icon="useRenderIcon(User)"
                />
              </el-form-item>
            </Motion>
            <!-- 密码 -->
            <Motion :delay="150">
              <el-form-item prop="password">
                <el-input
                  v-model="ruleForm.password"
                  clearable
                  show-password
                  :placeholder="t('login.purePassword')"
                  :prefix-icon="useRenderIcon(Lock)"
                />
              </el-form-item>
            </Motion>
            <!-- 验证码 -->
            <Motion :delay="200">
              <el-form-item prop="verifyCode">
                <el-input
                  v-model="ruleForm.verifyCode"
                  clearable
                  :placeholder="t('login.pureVerifyCode')"
                  :prefix-icon="useRenderIcon('ri:shield-keyhole-line')"
                >
                  <template v-slot:append>
                    <ReImageVerify v-model:code="imgCode" />
                  </template>
                </el-input>
              </el-form-item>
            </Motion>
            <!-- 登录 -->
            <Motion :delay="250">
              <el-form-item>
                <!-- 登录提示（记住用户，忘记密码等） -->
                <div class="w-full h-[20px] flex justify-between items-center">
                  <el-checkbox v-model="checked">
                    <span class="flex">
                      <select
                        v-model="loginDay"
                        :style="{
                          width: loginDay < 10 ? '10px' : '16px',
                          outline: 'none',
                          background: 'none',
                          appearance: 'none'
                        }"
                      >
                        <option value="1">1</option>
                        <option value="7">7</option>
                        <option value="30">30</option>
                      </select>
                      {{ t("login.pureRemember") }}
                      <!--suppress VueUnrecognizedDirective -->
                      <IconifyIconOffline
                        v-tippy="{
                          content: t('login.pureRememberInfo'),
                          placement: 'top'
                        }"
                        :icon="Info"
                        class="ml-1"
                      />
                    </span>
                  </el-checkbox>
                  <el-button link type="primary">
                    {{ t("login.pureForget") }}
                  </el-button>
                </div>
                <!-- 登录按钮 -->
                <el-button
                  class="w-full mt-4"
                  size="default"
                  type="primary"
                  :loading="loading"
                  :disabled="disabled"
                  @click="onLogin(ruleFormRef)"
                >
                  {{ t("login.pureLogin") }}
                </el-button>
              </el-form-item>
            </Motion>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 页脚 -->
    <div class="footer">
      <div class="w-full flex-c absolute bottom-3 text-sm text-[rgba(0,0,0,0.6)] dark:text-[rgba(220,220,242,0.8)]">
        Go to
        <a class="hover:text-primary" href="https://github.com/lancer1126/easy-admin" target="_blank">
          &nbsp;{{ title }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("@/style/login.css");
</style>

<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}
</style>
