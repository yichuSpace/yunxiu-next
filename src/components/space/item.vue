<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'YunSpace',
  props: {
    prefixCls: {
      type: String,
      default: 'yun-space',
    },
  },
  setup(props) {
    return {
      classes: computed(() => `${props.prefixCls}__item`),
    }
  },
}
</script>
