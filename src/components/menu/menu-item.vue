<template>
  <li
    class="yun-menu-item"
    role="menuitem"
    tabindex="-1"
    :style="[paddingStyle, itemStyle, { backgroundColor }]"
    :class="{
      'is-active': active,
      'is-disabled': disabled,
      'is-tooltip': parentMenu.type.name === 'YunMenu' && rootMenu.props.collapse && slots.title,
    }"
    @click="handleClick"
    @mouseenter="onMouseEnter"
    @focus="onMouseEnter"
    @blur="onMouseLeave"
    @mouseleave="onMouseLeave"
  >
    <yun-tooltip
      v-if="parentMenu.type.name === 'YunMenu' && rootMenu.props.collapse && slots.title"
      theme="dark"
      placement="right"
    >
      <template #content>
        <slot name="title"></slot>
      </template>
      <div
        style="
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
          display: inline-block;
          box-sizing: border-box;
          padding: 0 20px;
        "
      >
        <slot></slot>
      </div>
    </yun-tooltip>
    <template v-else>
      <slot></slot>
      <slot name="title"></slot>
    </template>
  </li>
</template>
<script>
import { computed, onMounted, onBeforeUnmount, inject, getCurrentInstance } from 'vue'
import useMenu from './useMenu'
import YunTooltip from '../tooltip'

export default {
  name: 'YunMenuItem',
  componentName: 'YunMenuItem',
  components: { YunTooltip },
  props: {
    index: {
      default: null,
      validator: val => typeof val === 'string' || val === null,
    },
    route: [String, Object],
    disabled: Boolean,
  },
  emits: ['click'],
  setup(props, { emit, slots }) {
    const instance = getCurrentInstance()
    const rootMenu = inject('rootMenu')
    const { parentMenu, paddingStyle, indexPath } = useMenu(instance, props.index)
    const { addSubMenu, removeSubMenu } = inject(`subMenu:${parentMenu.value.uid}`)

    const active = computed(() => {
      return props.index === rootMenu.activeIndex.value
    })
    const hoverBackground = computed(() => {
      return rootMenu.hoverBackground.value
    })
    const backgroundColor = computed(() => {
      return rootMenu.props.backgroundColor || ''
    })
    const activeTextColor = computed(() => {
      return rootMenu.props.activeTextColor || ''
    })
    const textColor = computed(() => {
      return rootMenu.props.textColor || ''
    })
    const mode = computed(() => {
      return rootMenu.props.mode
    })
    const isNested = computed(() => {
      return parentMenu.value.type.name !== 'ElMenu'
    })

    const itemStyle = computed(() => {
      const style = {
        color: active.value ? activeTextColor.value : textColor.value,
        borderBottomColor: active.value ? activeTextColor.value : '',
      }
      if (mode.value === 'horizontal' && !isNested.value) {
        style.borderBottomColor = active.value
          ? rootMenu.props.activeTextColor
            ? activeTextColor.value
            : ''
          : 'transparent'
      }
      return style
    })

    const onMouseEnter = () => {
      if (mode.value === 'horizontal' && !rootMenu.props.backgroundColor) return
      instance.vnode.el.style.backgroundColor = hoverBackground.value
    }
    const onMouseLeave = () => {
      if (mode.value === 'horizontal' && !rootMenu.props.backgroundColor) return
      instance.vnode.el.style.backgroundColor = backgroundColor.value
    }
    const handleClick = () => {
      if (!props.disabled) {
        rootMenu.rootMenuEmit('menuItem:item-click', {
          index: props.index,
          indexPath,
          route: props.route,
        })
        emit('click', {
          index: props.index,
          indexPath: indexPath.value,
        })
      }
    }

    onMounted(() => {
      addSubMenu({ index: props.index, indexPath, active })
      rootMenu.methods.addMenuItem({ index: props.index, indexPath, active })
    })

    onBeforeUnmount(() => {
      removeSubMenu({ index: props.index, indexPath, active })
      rootMenu.methods.removeMenuItem({ index: props.index, indexPath, active })
    })

    return {
      parentMenu,
      rootMenu,
      slots,

      paddingStyle,
      itemStyle,
      backgroundColor,
      active,
      handleClick,
      onMouseEnter,
      onMouseLeave,
    }
  },
}
</script>
