<template>
  <i :class="bem.b()" :style="style"> <slot></slot> </i>
</template>
<script lang="ts" setup>
import { createNamespace } from "@yunxiu-next/utils/create";
import { computed, CSSProperties } from "vue";
import { iconProps } from "./icon";

const bem = createNamespace("icon");
defineOptions({
  name: "yun-icon",
});
const props = defineProps(iconProps);
// 计算属性 来计算一个样式来处理
const style = computed<CSSProperties>(() => {
  if (!props.size && !props.color) {
    return {};
  }
  return {
    ...(props.size ? { "font-size": props.size + "px" } : {}),
    ...(props.color ? { color: props.color } : {}),
  };
});
</script>
