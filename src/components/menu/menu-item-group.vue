<template>
  <li class="yun-menu-item-group">
    <div class="yun-menu-item-group__title" :style="{ paddingLeft: levelPadding + 'px' }">
      <template v-if="!slots.title">{{ title }}</template>
      <slot v-else name="title"></slot>
    </div>
    <ul>
      <slot></slot>
    </ul>
  </li>
</template>

<script>
import { computed, getCurrentInstance, inject, reactive } from 'vue'
export default {
  name: 'YunMenuItemGroup',
  componentName: 'YunMenuItemGroup',
  props: {
    title: {
      type: String,
    },
  },
  setup(props, { slots }) {
    // data
    const data = reactive({
      paddingLeft: 20,
    })
    const instance = getCurrentInstance()
    // computed
    const levelPadding = computed(() => {
      let padding = 20
      let parent = instance.parent
      if (rootProps.collapse) return 20
      while (parent && parent.type.name !== 'YunMenu') {
        if (parent.type.name === 'YunSubmenu') {
          padding += 20
        }
        parent = parent.parent
      }
      return padding
    })

    // inject
    const { props: rootProps } = inject('rootMenu')

    return {
      data,
      levelPadding,
      props,
      slots,
    }
  },
}
</script>
