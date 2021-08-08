<template>
  <button class="yun-button" @click="handleClick">
    sdfazxczCsdgfdsg
  </button>
</template>

<script>
export default {
  name: 'YunButton',
  props: {
    type: {
      type: String,
      validator: val => ['default', 'primary', 'success', 'warning', 'info', 'danger', 'text'].includes(val),
    },
    size: {
      type: String,
      // validator: validSize,
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
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    },
  },
}
</script>
