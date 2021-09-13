<template>
  <div :class="anchorLinkClasses">
    <a
      class="yun-anchor-link-title"
      :href="href"
      :data-href="href"
      :style="activeColor"
      @click.prevent="goAnchor"
      :title="title"
      >{{ title }}</a
    >
    <slot></slot>
  </div>
</template>

<script>
import { inject, computed } from 'vue'

export default {
  name: 'YunAnchorLink',
  props: {
    href: String,
    title: String,
    scrollOffset: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const prefix = 'yun-anchor-link'
    const parent = inject('YunAnchor')
    const selectLink = inject('chooseLink')

    const anchorLinkClasses = computed(() => {
      return [prefix, parent.data.currentLink === props.href ? `${prefix}-active` : '']
    })

    const activeColor = computed(() => {
      return {
        color: parent.data.currentLink === props.href ? parent.props.activeColor : null,
      }
    })

    parent.linksRef.value = [...parent.linksRef.value, props]
    const goAnchor = () => {
      selectLink(props.href)
    }
    return {
      parent,
      selectLink,
      anchorLinkClasses,
      activeColor,
      goAnchor,
    }
  },
}
</script>
