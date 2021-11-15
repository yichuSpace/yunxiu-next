<template>
  <li
    :id="`${menuId}-${node.uid}`"
    role="menuitem"
    :aria-haspopup="!isLeaf"
    :aria-owns="isLeaf ? null : menuId"
    :aria-expanded="inExpandingPath"
    :tabindex="expandable ? -1 : null"
    :class="[
      'yun-cascader-node',
      checkStrictly && 'is-selectable',
      inExpandingPath && 'in-active-path',
      inCheckedPath && 'in-checked-path',
      node.checked && 'is-active',
      !expandable && 'is-disabled',
    ]"
    @mouseenter="handleHoverExpand"
    @focus="handleHoverExpand"
    @click="handleClick"
  >
    <!-- prefix -->
    <yun-checkbox
      v-if="multiple"
      :model-value="node.checked"
      :indeterminate="node.indeterminate"
      :disabled="isDisabled"
      @click.stop
      @update:model-value="handleCheck"
    />
    <yun-radio
      v-else-if="checkStrictly"
      :model-value="checkedNodeId"
      :label="node.uid"
      :disabled="isDisabled"
      @update:model-value="handleCheck"
      @click.stop
    >
      <span></span>
    </yun-radio>
    <i v-else-if="isLeaf && node.checked" class="yun-iconfont yun-icon-check yun-cascader-node__prefix"></i>

    <!-- content -->
    <node-content />

    <!-- postfix -->
    <template v-if="!isLeaf">
      <i v-if="node.loading" class="yun-iconfont yun-icon-loading icon-is-rotating yun-cascader-node__postfix"></i>
      <i v-else class="yun-iconfont yun-icon-right yun-cascader-node__postfix"></i>
    </template>
  </li>
</template>

<script>
import { computed, inject, h } from 'vue'
import YunCheckbox from '../../checkbox'
import YunRadio from '../../radio'
import { PANEL_INJECTION_KEY } from '../utils/utils'

export default {
  name: 'YunCascaderNode',
  components: {
    YunCheckbox,
    YunRadio,
    NodeContent: {
      render() {
        const { node, panel } = this.$parent
        const { data, label } = node
        const { renderLabelFn } = panel
        return h('span', { class: 'yun-cascader-node__label' }, renderLabelFn ? renderLabelFn({ node, data }) : label)
      },
    },
  },
  props: {
    node: {
      type: Object,
      required: true,
    },
    menuId: String,
  },
  emits: ['expand'],
  setup(props, { emit }) {
    const panel = inject(PANEL_INJECTION_KEY)

    const isHoverMenu = computed(() => panel.isHoverMenu)
    const multiple = computed(() => panel.config.multiple)
    const checkStrictly = computed(() => panel.config.checkStrictly)
    const checkedNodeId = computed(() => panel.checkedNodes[0]?.uid)
    const isDisabled = computed(() => props.node.isDisabled)
    const isLeaf = computed(() => props.node.isLeaf)
    const expandable = computed(() => (checkStrictly.value && !isLeaf.value) || !isDisabled.value)
    const inExpandingPath = computed(() => isInPath(panel.expandingNode))
    // only useful in check-strictly mode
    const inCheckedPath = computed(() => checkStrictly.value && panel.checkedNodes.some(isInPath))

    const isInPath = node => {
      const { level, uid } = props.node
      return node?.pathNodes[level - 1]?.uid === uid
    }

    const doExpand = () => {
      if (inExpandingPath.value) return
      panel.expandNode(props.node)
    }

    const doCheck = checked => {
      const { node } = props
      if (checked === node.checked) return
      panel.handleCheckChange(node, checked)
    }

    const doLoad = () => {
      panel.lazyLoad(props.node, () => {
        if (!isLeaf.value) doExpand()
      })
    }

    const handleHoverExpand = e => {
      if (!isHoverMenu.value) return
      handleExpand()
      !isLeaf.value && emit('expand', e)
    }

    const handleExpand = () => {
      const { node } = props
      // do not exclude leaf node because the menus expanded might have to reset
      if (!expandable.value || node.loading) return
      node.loaded ? doExpand() : doLoad()
    }

    const handleClick = () => {
      if (isHoverMenu.value && !isLeaf.value) return
      if (isLeaf.value && !isDisabled.value && !checkStrictly.value && !multiple.value) {
        handleCheck(true)
      } else {
        handleExpand()
        // 单选模式，默认触发选中
        if (checkStrictly.value && !isDisabled.value && !multiple.value) {
          handleCheck(true)
        }
      }
    }

    const handleCheck = checked => {
      if (!props.node.loaded) {
        doLoad()
      } else {
        doCheck(checked)
        !checkStrictly.value && doExpand()
      }
    }

    return {
      panel,
      isHoverMenu,
      multiple,
      checkStrictly,
      checkedNodeId,
      isDisabled,
      isLeaf,
      expandable,
      inExpandingPath,
      inCheckedPath,
      handleHoverExpand,
      handleExpand,
      handleClick,
      handleCheck,
    }
  },
}
</script>
