<template>
  <span class="yun-breadcrumb__item">
    <span :class="['yun-breadcrumb__inner']" ref="link" role="link">
      <slot></slot>
    </span>
    <i v-if="separatorIcon" class="yun-separator icon" :class="['yun-iconfont', 'yun-icon-' + separatorIcon]"></i>
    <span v-else class="yun-separator" role="presentation">{{ separator }}</span>
  </span>
</template>

<script>
import { inject, ref } from 'vue'

export default {
  name: 'YunBreadcrumbItem',
  setup() {
    const parent = inject('Breadcrumb')
    const separator = ref(parent.props.separator)
    const separatorIcon = ref(parent.props.separatorIcon)
    const link = ref(null)
    return {
      parent,
      link,
      separator,
      separatorIcon,
    }
  },
}
</script>
