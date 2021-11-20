<template>
  <div :class="['yun-skeleton__item', `yun-skeleton__${variant}`]">
    <img-placeholder v-if="variant === 'image'" />
  </div>
</template>

<script>
import ImgPlaceholder from './img-placeholder.vue'

export default {
  name: 'YunSkeletonItem',
  components: { ImgPlaceholder },
  props: {
    variant: {
      type: String,
      default: 'text',
    },
  },
}
</script>
