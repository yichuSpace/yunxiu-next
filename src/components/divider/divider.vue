<template>
  <div
    :class="[
      'yun-divider',
      `yun-divider-${type}`,
      {
        ['yun-divider-dashed']: !!dashed,
      },
    ]"
  >
    <span v-if="$slots.default" :class="['yun-divider-inner-text', `is-${align}`]">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'YunDivider',
  props: {
    type: {
      type: String,
      default: 'horizontal', // 'horizontal', 'vertical'
      validator(val) {
        return ['horizontal', 'vertical'].includes(val)
      },
    },
    align: {
      type: String,
      default: 'center', // 'left', 'right', 'center'
      validator(val) {
        return ['left', 'center', 'right'].includes(val)
      },
    },
    dashed: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
