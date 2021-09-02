<template>
  <transition name="fade-in-linear">
    <div :class="classes">
      <div class="yun-loading-inner">
        <slot>
          <div v-if="!showIcon">
            <svg class="circular" viewBox="25 25 50 50">
              <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
            </svg>
          </div>
          <i v-else class="yun-iconfont loading-icon icon-is-rotating" :class="`yun-icon-${showIcon}`"></i>
        </slot>
        <slot name="text">
          <div v-if="text" class="loading-text" :style="textStyle">{{ text }}</div>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script>
const prefixCls = 'yun-loading'
export default {
  name: 'YunLoading',
  data() {
    return {
      text: this.showText,
    }
  },
  props: {
    showIcon: String,
    showText: String,
    fix: {
      type: Boolean,
      default: true,
    },
    size: String,
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-fix`]: this.fix,
          [`${prefixCls}-show-text`]: this.showText,
        },
      ]
    },
    textStyle() {
      return {
        fontSize: `${this.size}px`,
      }
    },
  },
  methods: {
    setTitle(title) {
      this.text = title
    },
  },
}
</script>
