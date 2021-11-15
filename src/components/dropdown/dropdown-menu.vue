<template>
  <ul
    v-click-outside:[triggerElm]="innerHide"
    class="yun-dropdown-menu"
    @mouseenter.stop="show"
    @mouseleave.stop="hide"
  >
    <slot></slot>
  </ul>
</template>
<script>
import { getCurrentInstance, onMounted } from 'vue'
import ClickOutside from '../../directives/click-outside'
import { useDropdown, initDropdownDomEvent } from './useDropdown'

export default {
  name: 'YunDropdownMenu',
  directives: { ClickOutside },
  setup() {
    const { yunDropdown } = useDropdown()

    function show() {
      yunDropdown.show?.()
    }

    function hide() {
      if (yunDropdown.trigger.value === 'click') return
      _hide()
    }

    function _hide() {
      yunDropdown.hide?.()
    }

    onMounted(() => {
      const dropdownMenu = getCurrentInstance()
      initDropdownDomEvent(dropdownMenu, yunDropdown.triggerElm.value, yunDropdown.instance)
    })

    return {
      show,
      hide,
      innerHide: _hide,
      triggerElm: yunDropdown.triggerElm,
    }
  },
}
</script>
