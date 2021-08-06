<template>
  <div>
    sdf
  </div>
</template>

<script>
export default {
  name: 'YunMessage',
  props: {
    customClass: { type: String, default: '' },
    useHTML: { type: Boolean, default: false },
    duration: { type: Number, default: 3 },
    iconClass: { type: String, default: '' },
    id: { type: String, default: '' },
    message: {
      type: [String, Object],
      default: '',
    },
    onClose: {
      type: Function,
      required: true,
    },
    showClose: { type: Boolean, default: false },
    type: { type: String, default: 'info' },
    offset: { type: Number, default: 20 },
    zIndex: { type: Number, default: 0 },
  },
  data() {
    return {
      visible: false,
      closed: false,
    }
  },
  computed: {
    // typeClass() {
    //   const type = this.type
    //   return type && TypeMap[type] ? `bin-message__icon b-iconfont b-icon-${TypeMap[type]} is-${type}` : ''
    // },
    customStyle() {
      return {
        top: `${this.offset}px`,
        zIndex: this.zIndex,
      }
    },
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false
        // on(this.$el, 'transitionend', this.destroyElement)
      }
    },
  },
}
</script>

<style></style>
