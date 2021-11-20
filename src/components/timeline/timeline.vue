<template>
  <ul :class="cpClasses">
    <slot></slot>
  </ul>
</template>

<script>
const prefixCls = 'yun-timeline'

export default {
  name: 'YunTimeline',
  props: {
    pending: Boolean,
  },
  computed: {
    cpClasses() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-pending`]: this.pending,
        },
      ]
    },
  },
}
</script>
