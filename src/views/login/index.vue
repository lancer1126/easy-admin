<script setup lang="ts">
import { bg, illustration, avatar } from "./utils/static";
import { toRaw, ref } from "vue";

defineOptions({
  name: "Login"
});

const title = ref("Easy Admin");
</script>

<template>
  <div class="select-none">
    <img :src="bg" class="wave" alt="" />
    <div class="login-container">
      <div class="img">
        <component :is="toRaw(illustration)" />
      </div>
      <div class="login-box">
        <div class="login-form">
          <avatar class="avatar" />
        </div>
      </div>
    </div>
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

<style lang="scss" scoped></style>
