<script setup lang="ts">
import { isExternal } from "@/utils/validate";

const props = defineProps({
  to: {
    type: [String, Object],
    required: true
  }
});

const isExt = computed(() => {
  return isExternal(props.to as string);
});

const type = computed(() => {
  if (isExt.value) {
    return "a";
  } else {
    return "router-link";
  }
});

const linkProps = () => {
  if (isExt.value) {
    return {
      href: props.to,
      target: "_blank",
      rel: "noopener"
    };
  }
  return {
    to: props.to
  };
};
</script>

<template>
  <component :is="type" v-bind="linkProps()">
    <slot />
  </component>
</template>
