<script setup lang="ts">
import { watch } from "vue";
import { useImageVerify } from "@/components/ReImageVerify/src/hooks";

defineOptions({
  name: "ReImageVerify"
});

interface Props {
  code?: string;
}
interface Emits {
  (e: "update:code", code: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  code: ""
});
const emit = defineEmits<Emits>();
const { domRef, imgCode, setImgCode, getImgCode } = useImageVerify();

watch(
  () => props.code,
  newVal => {
    setImgCode(newVal);
  }
);
watch(imgCode, newVal => {
  emit("update:code", newVal);
});

defineExpose({ getImgCode });
</script>

<template>
  <canvas ref="domRef" width="120" height="40" class="cursor-pointer" @click="getImgCode" />
</template>
