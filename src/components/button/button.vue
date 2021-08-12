<template>
  <button
    v-if="type !== 'text' && animationType === 'click'"
    class="yun-button"
    :type="nativeType"
    :class="btnClass"
    @click="handleClick"
  >
    <i
      class="button-loading icon-is-rotating"
      :class="['yun-iconfont', `yun-icon-${loadingIcon || 'loading'}`]"
      v-if="loading"
      :style="iconStyles"
    ></i>
    <i :class="['yun-iconfont', 'yun-icon-' + icon]" v-if="icon && !loading" :style="iconStyles"></i>
    <span v-if="$slots.default" :style="textStyle"><slot></slot></span>
  </button>
  <button
    v-else-if="type !== 'text' && animationType === 'waves'"
    class="yun-button"
    :disabled="disabled || loading"
    :type="nativeType"
    :class="btnClass"
    @click="handleClick"
    v-waves="waveColor"
  >
    <i
      class="button-loading icon-is-rotating"
      :class="['yun-iconfont', `yun-icon-${loadingIcon || 'loading'}`]"
      v-if="loading"
      :style="iconStyles"
    ></i>
    <i :class="['yun-iconfont', 'yun-icon-' + icon]" v-if="icon && !loading" :style="iconStyles"></i>
    <span v-if="$slots.default" :style="textStyle"><slot></slot></span>
  </button>
  <button
    v-else
    :disabled="disabled || loading"
    :type="nativeType"
    class="yun-button"
    :class="[
      {
        [`yun-button--${type}`]: type,
        'is-disabled': disabled,
        'is-loading': loading,
      },
    ]"
    @click="handleClick"
  >
    <i
      class="button-loading icon-is-rotating"
      :class="['yun-iconfont', `yun-icon-${loadingIcon || 'loading'}`]"
      v-if="loading"
      :style="iconStyles"
    ></i>
    <i :class="['yun-iconfont', 'yun-icon-' + icon]" v-if="icon && !loading" :style="iconStyles"></i>
    <span v-if="$slots.default" :style="textStyle"><slot></slot></span>
  </button>
</template>

<script>
import { validSize } from '../../utils/validatorSize'
export default {
  name: 'YunButton',
  props: {
    type: {
      type: String,
      validator: val => ['default', 'primary', 'success', 'warning', 'info', 'danger', 'text'].includes(val),
    },
    size: {
      type: String,
      validator: validSize,
    },
    icon: String,
    iconStyle: Object,
    loading: Boolean,
    loadingIcon: String,
    disabled: Boolean,
    plain: Boolean,
    round: Boolean,
    dashed: Boolean,
    transparent: Boolean,
    background: Boolean,
    animationType: {
      type: String,
      validator: val => ['click', 'waves'].includes(val),
      default: 'click',
    },
    textColor: String,
    nativeType: {
      type: String,
      default: 'button',
      validator: val => ['button', 'submit', 'reset'].includes(val),
    },
  },
  emits: ['click'],
  computed: {
    textStyle() {
      const colorMap = {
        primary: '#1089ff',
        success: '#52c41a',
        info: '#35495E',
        warning: '#fa8c16',
        danger: '#f5222d',
      }
      let color = this.textColor ? (colorMap[this.textColor] ? colorMap[this.textColor] : this.textColor) : null
      return color ? { color } : null
    },
    iconStyles() {
      return { ...this.textStyle, ...this.iconStyle }
    },
    btnClass() {
      return [
        `yun-button--${this.type || 'default'}`,
        {
          [`yun-button--${this.size}`]: this.size,
          'is-disabled': this.disabled,
          'is-loading': this.loading,
          'is-plain': this.plain,
          'is-round': this.round,
          'is-dashed': this.dashed,
          'is-transparent': this.transparent,
          'is-background': this.background,
        },
      ]
    },
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    },
  },
}
</script>
