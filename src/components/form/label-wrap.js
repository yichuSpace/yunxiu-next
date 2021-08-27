import { h, inject, ref, watch, onMounted, onUpdated, onBeforeUnmount, nextTick, Fragment } from 'vue'
import { FormKey, FormItemKey } from './token'
import { addResizeListener, removeResizeListener } from '../../utils/resizeEvent'

export default {
  name: 'YunLabelWrap',
  props: {
    isAutoWidth: Boolean,
    updateAll: Boolean,
  },
  setup(props, { slots }) {
    const el = ref(null)
    const YunForm = inject(FormKey)
    const YunFormItem = inject(FormItemKey)

    const computedWidth = ref(0)
    watch(computedWidth, (val, oldVal) => {
      if (props.updateAll) {
        YunForm.registerLabelWidth(val, oldVal)
        YunFormItem.updateComputedLabelWidth(val)
      }
    })

    const getLabelWidth = () => {
      if (el.value?.firstElementChild) {
        const width = window.getComputedStyle(el.value.firstElementChild).width
        return Math.ceil(parseFloat(width))
      } else {
        return 0
      }
    }
    const updateLabelWidth = (action = 'update') => {
      nextTick(() => {
        if (slots.default && props.isAutoWidth) {
          if (action === 'update') {
            computedWidth.value = getLabelWidth()
          } else if (action === 'remove') {
            YunForm.deregisterLabelWidth(computedWidth.value)
          }
        }
      })
    }
    const updateLabelWidthFn = () => updateLabelWidth('update')

    onMounted(() => {
      addResizeListener(el.value.firstElementChild, updateLabelWidthFn)
      updateLabelWidthFn()
    })

    onUpdated(updateLabelWidthFn)

    onBeforeUnmount(() => {
      updateLabelWidth('remove')
      removeResizeListener(el.value.firstElementChild, updateLabelWidthFn)
    })

    function render() {
      if (!slots) return null
      if (props.isAutoWidth) {
        const autoLabelWidth = YunForm.autoLabelWidth
        const style = {}
        if (autoLabelWidth && autoLabelWidth !== 'auto') {
          const marginLeft = parseInt(autoLabelWidth, 10) - computedWidth.value
          if (marginLeft) {
            style.marginLeft = marginLeft + 'px'
          }
        }
        return h(
          'div',
          {
            ref: el,
            class: ['yun-form-item__label-wrap'],
            style,
          },
          slots.default?.(),
        )
      } else {
        return h(Fragment, { ref: el }, slots.default?.())
      }
    }

    return render
  },
}
