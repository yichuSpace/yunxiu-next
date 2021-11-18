<template>
  <ul class="yun-tree-children">
    <li v-show="data.visible">
      <div
        class="yun-tree-node"
        ref="node$"
        :draggable="TreeInstance.draggable"
        :data-key="data.nodeKey"
        @dragstart.stop="handleDragStart"
        @dragover.stop="handleDragOver"
        @dragend.stop="handleDragEnd"
        @drop.stop="handleDrop"
      >
        <span :class="arrowClasses">
          <i v-if="showArrow" class="yun-iconfont yun-icon-caret-right" @click="handleExpand"></i>
          <template v-if="!isLeaf">
            <i v-if="showLoading" class="yun-iconfont yun-icon-loading yun-load-loop"></i>
          </template>
        </span>
        <yun-checkbox
          v-if="showCheckbox"
          :model-value="data.checked"
          :indeterminate="data.indeterminate"
          :disabled="data.disabled || data.disableCheckbox"
          @change="handleCheck"
        ></yun-checkbox>
        <span v-if="data.render" :class="renderClasses" @click="handleSelect">
          <render :render="data.render" :data="data" :node="node"></render>
        </span>
        <span v-else-if="isParentRender" :class="renderClasses" @click="handleSelect">
          <render :render="parentRender" :data="data" :node="node"></render>
        </span>
        <template v-else>
          <span
            v-if="data.display"
            :class="titleClasses"
            :title="data.display"
            v-html="data.display"
            @click="handleSelect"
          ></span>
          <span v-else :class="titleClasses" :title="data[titleKey]" @click="handleSelect">
            <i v-if="data.icon" :class="`yun-iconfont yun-icon-${data.icon}`"></i>{{ data[titleKey] }}
          </span>
        </template>
      </div>
      <collapse-transition>
        <div class="yun-tree-node-children" v-show="data.expand">
          <tree-node
            v-for="(item, i) in children"
            :key="i"
            :data="item"
            :multiple="multiple"
            :show-checkbox="showCheckbox"
            :children-key="childrenKey"
          >
          </tree-node>
        </div>
      </collapse-transition>
    </li>
  </ul>
</template>

<script>
import Render from './render'
import CollapseTransition from '../collapse-transition'
import { inject, nextTick, ref, computed } from 'vue'
import YunCheckbox from '../checkbox'

const prefixCls = 'yun-tree'

export default {
  name: 'TreeNode',
  components: { CollapseTransition, Render, YunCheckbox },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      },
    },
    multiple: Boolean,
    childrenKey: {
      type: String,
      default: 'children',
    },
    showCheckbox: Boolean,
  },
  setup(props) {
    const TreeInstance = inject('YunTreeRoot', {})
    const node$ = ref(null)

    const isParentRender = computed(() => TreeInstance && TreeInstance.render)
    const parentRender = computed(() => TreeInstance.render || null)
    const titleKey = computed(() => TreeInstance.titleKey || 'title')
    const node = computed(() => [
      TreeInstance.states.flatState,
      TreeInstance.states.flatState.find(item => item.nodeKey === props.data.nodeKey),
    ])
    const handleExpand = () => {
      const item = props.data
      if (item.disabled) return

      // async loading
      if (item[props.childrenKey].length === 0) {
        const tree = TreeInstance
        if (tree && tree.loadData) {
          props.data.loading = true
          tree.loadData(item, children => {
            props.data.loading = false
            if (children.length) {
              props.data[props.childrenKey] = children
              tree.updateTreeState()
              nextTick(() => handleExpand())
            }
          })
          return
        }
      }

      if (item[props.childrenKey] && item[props.childrenKey].length) {
        props.data.expand = !props.data.expand
        TreeInstance.handleToggle(props.data)
      }
    }
    const handleSelect = () => {
      if (props.data.disabled) return
      if (TreeInstance.showCheckbox && TreeInstance.checkDirectly) {
        handleCheck()
      } else {
        TreeInstance.handleSelect(props.data.nodeKey)
      }
    }
    const handleCheck = () => {
      if (props.data.disabled) return
      const changes = {
        checked: !props.data.checked && !props.data.indeterminate,
        nodeKey: props.data.nodeKey,
      }
      TreeInstance.handleCheck(changes)
    }

    const handleDragStart = e => {
      if (!TreeInstance.draggable) return
      TreeInstance.handleTreeNodeDragStart({ e, treeNode: { $el: node$.value, node: props.data } })
    }

    const handleDragOver = e => {
      if (!TreeInstance.draggable) return
      TreeInstance.handleTreeNodeDragOver({ e, treeNode: { $el: node$.value, node: props.data } })
      e.preventDefault()
    }

    const handleDrop = e => {
      e.preventDefault()
    }

    const handleDragEnd = e => {
      if (!TreeInstance.draggable) return
      TreeInstance.handleTreeNodeDragEnd({ e, treeNode: { $el: node$.value, node: props.data } })
    }
    return {
      node$,
      TreeInstance,
      isParentRender,
      parentRender,
      node,
      titleKey,
      handleExpand,
      handleSelect,
      handleCheck,
      handleDragStart,
      handleDragOver,
      handleDrop,
      handleDragEnd,
    }
  },
  computed: {
    classes() {
      return [`${prefixCls}-children`]
    },
    arrowClasses() {
      return [
        `${prefixCls}-arrow`,
        {
          [`${prefixCls}-arrow-disabled`]: this.data.disabled,
          [`${prefixCls}-arrow-open`]: this.data.expand,
        },
      ]
    },
    titleClasses() {
      return [
        `${prefixCls}-title`,
        {
          ['is-selected']: this.data.selected,
        },
        {
          ['is-ellipsis']: this.TreeInstance.titleEllipsis,
        },
        {
          ['has-checkbox']: this.showCheckbox,
        },
      ]
    },
    renderClasses() {
      return [
        `${prefixCls}-render-title`,
        {
          ['is-selected']: this.data.selected,
        },
        {
          ['is-ellipsis']: this.TreeInstance.titleEllipsis,
        },
        {
          ['has-checkbox']: this.showCheckbox,
        },
      ]
    },
    showArrow() {
      return (
        (this.data[this.childrenKey] && this.data[this.childrenKey].length) ||
        ('loading' in this.data && !this.data.loading && !this.isLeaf)
      )
    },
    showLoading() {
      return 'loading' in this.data && this.data.loading
    },
    isLeaf() {
      return 'isLeaf' in this.data && this.data.isLeaf
    },
    children() {
      return this.data[this.childrenKey]
    },
  },
}
</script>
