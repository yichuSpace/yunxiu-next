<template>
  <li
    class="yun-dropdown-item"
    :class="{
      'yun-dropdown-item-disabled': disabled,
      'yun-dropdown-item-divided': divided,
      'yun-dropdown-item-selected': selected,
    }"
    :aria-disabled="disabled"
    :tabindex="disabled ? null : -1"
    @click="handleClick"
  >
    <i v-if="icon" :class="`yun-iconfont yun-icon-${icon}`"></i>
    <slot></slot>
  </li>
</template>
<script>
import { getCurrentInstance } from 'vue'
import { useDropdown } from './useDropdown'

export default {
  name: 'YunDropdownItem',
  props: {
    name: {
      type: [Object, String, Number],
      default: () => ({}),
    },
    disabled: Boolean,
    divided: Boolean,
    selected: Boolean,
    icon: String,
  },
  setup(props) {
    const { yunDropdown } = useDropdown()
    const _instance = getCurrentInstance()

    function handleClick(e) {
      if (props.disabled) return
      if (yunDropdown.hideOnClick.value) {
        yunDropdown.handleClick?.()
      }
      yunDropdown.commandHandler?.(props.name, _instance, e)
    }

    return {
      handleClick,
    }
  },
}
</script>
