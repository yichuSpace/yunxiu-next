<template>
  <div :class="['yun-collapse-item', { 'yun-collapse-item-active': isActive }]">
    <div class="yun-collapse-header" @click="handleHeaderClick">
      <yun-icon name="right" v-if="!hideArrow"></yun-icon>
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <yun-collapse-transition>
      <div class="yun-collapse-content" v-show="isActive">
        <div class="yun-collapse-content-box">
          <slot></slot>
        </div>
      </div>
    </yun-collapse-transition>
  </div>
</template>

<script>
import { ref, inject, computed } from 'vue'
import YunIcon from '../icon'
import YunCollapseTransition from '../collapse-transition'

export const generateId = () => Math.floor(Math.random() * 10000)
export default {
  name: 'YunCollapsePanel',
  components: { YunCollapseTransition, YunIcon },
  props: {
    title: String,
    name: String,
    hideArrow: Boolean,
    disabled: Boolean,
  },
  setup(props) {
    const collapse = inject('collapse')
    const collapseMitt = collapse?.collapseMitt

    const contentWrapStyle = ref({
      height: 'auto',
      display: 'block',
    })
    const contentHeight = ref(0)
    const isClick = ref(false)
    const id = ref(generateId())

    const isActive = computed(() => {
      return collapse?.activeNames.value.indexOf(props.name) > -1
    })

    const handleHeaderClick = () => {
      if (props.disabled) return
      collapseMitt?.emit('item-click', props.name)
      isClick.value = true
    }

    return {
      isActive,
      contentWrapStyle,
      contentHeight,
      isClick,
      id,
      handleHeaderClick,
      collapse,
    }
  },
}
</script>
