<template>
  <yun-popper
    ref="popper"
    v-model:visible="popperVisible"
    manual-mode
    placement="bottom-start"
    :popper-class="`yun-cascader__dropdown ${popperClass}`"
    :stop-popper-mouse-event="false"
    transition="zoom-in-top"
    :gpu-acceleration="false"
    theme="light"
    pure
    :show-arrow="false"
    :offset="5"
    @after-leave="hideSuggestionPanel"
  >
    <template #trigger>
      <div
        v-click-outside:[popperPaneRef]="() => togglePopperVisible(false)"
        :class="['yun-cascader', realSize && `yun-cascader--${realSize}`, { 'is-disabled': isDisabled }]"
        @click="() => togglePopperVisible(readonly ? undefined : true)"
        @keydown="handleKeyDown"
        @mouseenter="inputHover = true"
        @mouseleave="inputHover = false"
      >
        <yun-input
          ref="input"
          v-model.trim="inputValue"
          :placeholder="placeholder"
          :readonly="readonly"
          :disabled="isDisabled"
          :validate-event="false"
          :size="realSize"
          :class="{ 'is-focus': popperVisible }"
          @focus="e => $emit('focus', e)"
          @blur="e => $emit('blur', e)"
          @input="handleInput"
        >
          <template #suffix>
            <i
              v-if="clearBtnVisible"
              key="clear"
              class="yun-iconfont yun-icon-close-circle-fill"
              @click.stop="handleClear"
            ></i>
            <i
              v-else
              key="arrow-down"
              :class="['yun-iconfont', 'yun-icon-down', popperVisible && 'is-reverse']"
              @click.stop="togglePopperVisible()"
            ></i>
          </template>
        </yun-input>

        <div v-if="multiple" ref="tagWrapper" class="yun-cascader__tags">
          <yun-tag
            v-for="tag in presentTags"
            :key="tag.key"
            type="info"
            :size="tagSize"
            :hit="tag.hitState"
            :closable="tag.closable"
            disable-transitions
            @close="deleteTag(tag)"
          >
            <span>{{ tag.text }}</span>
          </yun-tag>
          <input
            v-if="filterable && !isDisabled"
            v-model.trim="searchInputValue"
            type="text"
            class="yun-cascader__search-input"
            :placeholder="presentText ? '' : placeholder"
            @input="e => handleInput(searchInputValue, e)"
            @click.stop="togglePopperVisible(true)"
            @keydown.delete="handleDelete"
          />
        </div>
      </div>
    </template>

    <template #default>
      <yun-cascader-panel
        v-show="!filtering"
        ref="panel"
        v-model="checkedValue"
        :options="options"
        :props="props"
        :border="false"
        :render-label="$slots.default"
        @expand-change="handleExpandChange"
        @close="togglePopperVisible(false)"
      />
      <yun-scrollbar
        v-if="filterable"
        v-show="filtering"
        ref="suggestionPanel"
        tag="ul"
        class="yun-cascader__suggestion-panel"
        view-class="yun-cascader__suggestion-list"
      >
        <template v-if="suggestions.length">
          <li
            v-for="item in suggestions"
            :key="item.uid"
            :class="['yun-cascader__suggestion-item', item.checked && 'is-checked']"
            :tabindex="-1"
            @click="handleSuggestionClick(item)"
          >
            <span>{{ item.text }}</span>
            <i v-if="item.checked" class="yun-iconfont yun-icon-check"></i>
          </li>
        </template>
        <slot v-else name="empty">
          <li class="yun-cascader__empty-text">暂无数据</li>
        </slot>
      </yun-scrollbar>
    </template>
  </yun-popper>
</template>

<script>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import YunCascaderPanel from '../cascader-panel'
import YunInput from '../input'
import YunPopper from '../popper'
import YunScrollbar from '../scrollbar'
import YunTag from '../tag'
import { ClickOutside } from '../../directives'
import { isPromise } from '@vue/shared'
import { debounce } from '../../utils/util'
import { EVENT_CODE } from '../../utils/aria'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../utils/constants'
import isServer from '../../utils/isServer'
import { addResizeListener, removeResizeListener } from '../../utils/resizeEvent'
import { validSize } from '../../utils/validatorSize'
import useForm from '../../hooks/useForm'

const DEFAULT_INPUT_HEIGHT = 32

const INPUT_HEIGHT_MAP = {
  large: 40,
  small: 24,
  mini: 22,
}

const popperOptions = {
  modifiers: [
    {
      name: 'arrowPosition',
      enabled: true,
      phase: 'main',
      fn: ({ state }) => {
        const { modifiersData, elements } = state
        const { reference, arrow } = elements
        modifiersData.arrow.x = modifiersData.arrow.x - (reference.clientWidth - arrow.clientWidth) / 2 + 35
      },
      requires: ['arrow'],
    },
  ],
}

export default {
  name: 'YunCascader',
  components: {
    YunCascaderPanel,
    YunInput,
    YunPopper,
    YunScrollbar,
    YunTag,
  },
  directives: { ClickOutside },
  props: {
    modelValue: [Number, String, Array],
    options: {
      type: Array,
      default() {
        return []
      },
    },
    props: {
      type: Object,
      default: () => ({}),
    },
    size: {
      type: String,
      validator: validSize,
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    filterMethod: {
      type: Function,
      default: (node, keyword) => node.text.includes(keyword),
    },
    separator: {
      type: String,
      default: ' / ',
    },
    showAllLevels: {
      type: Boolean,
      default: true,
    },
    collapseTags: Boolean,
    debounce: {
      type: Number,
      default: 300,
    },
    beforeFilter: {
      type: Function,
      default: () => true,
    },
    popperClass: {
      type: String,
      default: '',
    },
  },
  emits: [UPDATE_MODEL_EVENT, CHANGE_EVENT, 'focus', 'blur', 'visible-change', 'expand-change', 'remove-tag'],
  setup(props, { emit }) {
    let inputInitialHeight = 0
    let pressDeleteCount = 0

    const { YunForm, YunFormItem, formEmit } = useForm()

    const popper = ref(null)
    const input = ref(null)
    const tagWrapper = ref(null)
    const panel = ref(null)
    const suggestionPanel = ref(null)
    const popperVisible = ref(false)
    const inputHover = ref(false)
    const filtering = ref(false)
    const inputValue = ref('')
    const searchInputValue = ref('')
    const presentTags = ref([])
    const suggestions = ref([])

    const isDisabled = computed(() => props.disabled || YunForm.disabled)
    const realSize = computed(() => props.size || YunFormItem.size)
    const tagSize = computed(() => (['small', 'mini'].includes(realSize.value) ? 'mini' : 'small'))
    const multiple = computed(() => !!props.props.multiple)
    const readonly = computed(() => !props.filterable || multiple.value)
    const searchKeyword = computed(() => (multiple.value ? searchInputValue.value : inputValue.value))
    const checkedNodes = computed(() => panel.value?.checkedNodes || [])
    const clearBtnVisible = computed(() => {
      if (!props.clearable || isDisabled.value || filtering.value || !inputHover.value) return false

      return !!checkedNodes.value.length
    })
    const presentText = computed(() => {
      const { showAllLevels, separator } = props
      const nodes = checkedNodes.value
      return nodes.length ? (multiple.value ? ' ' : nodes[0].calcText(showAllLevels, separator)) : ''
    })

    const checkedValue = computed({
      get() {
        return props.modelValue
      },
      set(val) {
        emit(UPDATE_MODEL_EVENT, val)
        emit(CHANGE_EVENT, val)
        formEmit('change', [val])
      },
    })

    const popperPaneRef = computed(() => {
      return popper.value?.popperRef
    })

    const togglePopperVisible = visible => {
      if (isDisabled.value) return

      visible = visible ?? !popperVisible.value

      if (visible !== popperVisible.value) {
        popperVisible.value = visible
        input.value.inputRef.setAttribute('aria-expanded', visible)

        if (visible) {
          updatePopperPosition()
          nextTick(panel.value.scrollToExpandingNode)
        } else if (props.filterable) {
          const { value } = presentText
          inputValue.value = value
          searchInputValue.value = value
        }

        emit('visible-change', visible)
      }
    }

    const updatePopperPosition = () => {
      nextTick(popper.value.update)
    }

    const hideSuggestionPanel = () => {
      filtering.value = false
    }

    const genTag = node => {
      const { showAllLevels, separator } = props
      return {
        node,
        key: node.uid,
        text: node.calcText(showAllLevels, separator),
        hitState: false,
        closable: !isDisabled.value && !node.isDisabled,
      }
    }

    const deleteTag = tag => {
      const { node } = tag
      node.doCheck(false)
      panel.value.calculateCheckedValue()
      emit('remove-tag', node.valueByOption)
    }

    const calculatePresentTags = () => {
      if (!multiple.value) return

      const nodes = checkedNodes.value
      const tags = []

      if (nodes.length) {
        const [first, ...rest] = nodes
        const restCount = rest.length

        tags.push(genTag(first))

        if (restCount) {
          if (props.collapseTags) {
            tags.push({
              key: -1,
              text: `+ ${restCount}`,
              closable: false,
            })
          } else {
            rest.forEach(node => tags.push(genTag(node)))
          }
        }
      }

      presentTags.value = tags
    }

    const calculateSuggestions = () => {
      const { filterMethod, showAllLevels, separator } = props
      const res = panel.value.getFlattedNodes(!props.props.checkStrictly).filter(node => {
        if (node.isDisabled) return false
        node.calcText(showAllLevels, separator)
        return filterMethod(node, searchKeyword.value)
      })

      if (multiple.value) {
        presentTags.value.forEach(tag => {
          tag.hitState = false
        })
      }

      filtering.value = true
      suggestions.value = res
      updatePopperPosition()
    }

    const focusFirstNode = () => {
      let firstNode = null

      if (filtering.value && suggestionPanel.value) {
        firstNode = suggestionPanel.value.$el.querySelector('.yun-cascader__suggestion-item')
      } else {
        firstNode = panel.value?.$el.querySelector('.yun-cascader-node[tabindex="-1"]')
      }

      if (firstNode) {
        firstNode.focus()
        !filtering.value && firstNode.click()
      }
    }

    const updateStyle = () => {
      const inputInner = input.value.inputRef
      const tagWrapperEl = tagWrapper.value
      const suggestionPanelEl = suggestionPanel.value?.$el

      if (isServer || !inputInner) return

      if (suggestionPanelEl) {
        const suggestionList = suggestionPanelEl.querySelector('.yun-cascader__suggestion-list')
        suggestionList.style.minWidth = inputInner.offsetWidth + 'px'
      }

      if (tagWrapperEl) {
        const { offsetHeight } = tagWrapperEl
        inputInner.style.height = Math.max(offsetHeight + 6, inputInitialHeight) + 'px'
        updatePopperPosition()
      }
    }

    const getCheckedNodes = leafOnly => {
      return panel.value.getCheckedNodes(leafOnly)
    }

    const handleExpandChange = value => {
      updatePopperPosition()
      emit('expand-change', value)
    }

    const handleKeyDown = e => {
      switch (e.code) {
        case EVENT_CODE.enter:
          togglePopperVisible()
          break
        case EVENT_CODE.down:
          togglePopperVisible(true)
          nextTick(focusFirstNode)
          e.preventDefault()
          break
        case EVENT_CODE.esc:
        case EVENT_CODE.tab:
          togglePopperVisible(false)
          break
      }
    }

    const handleClear = () => {
      panel.value.clearCheckedNodes()
      togglePopperVisible(false)
    }

    const handleSuggestionClick = node => {
      const { checked } = node

      if (multiple.value) {
        panel.value.handleCheckChange(node, !checked, false)
      } else {
        !checked && panel.value.handleCheckChange(node, true, false)
        togglePopperVisible(false)
      }
    }

    const handleDelete = () => {
      const tags = presentTags.value
      const lastTag = tags[tags.length - 1]
      pressDeleteCount = searchInputValue.value ? 0 : pressDeleteCount + 1

      if (!lastTag || !pressDeleteCount) return

      if (lastTag.hitState) {
        deleteTag(lastTag)
      } else {
        lastTag.hitState = true
      }
    }

    const handleFilter = debounce(() => {
      const { value } = searchKeyword

      if (!value) return

      const passed = props.beforeFilter(value)

      if (isPromise(passed)) {
        passed.then(calculateSuggestions).catch(() => {
          /* prevent log error */
        })
      } else if (passed !== false) {
        calculateSuggestions()
      } else {
        hideSuggestionPanel()
      }
    }, props.debounce)

    const handleInput = (val, e) => {
      !popperVisible.value && togglePopperVisible(true)

      if (e?.isComposing) return

      val ? handleFilter() : hideSuggestionPanel()
    }

    watch(filtering, updatePopperPosition)

    watch([checkedNodes, isDisabled], calculatePresentTags)

    watch(presentTags, () => nextTick(updateStyle))

    watch(presentText, val => (inputValue.value = val), { immediate: true })

    onMounted(() => {
      const inputEl = input.value.$el
      inputInitialHeight = inputEl?.offsetHeight || INPUT_HEIGHT_MAP[realSize.value] || DEFAULT_INPUT_HEIGHT
      addResizeListener(inputEl, updateStyle)
    })

    onBeforeUnmount(() => {
      removeResizeListener(input.value.$el, updateStyle)
    })

    return {
      popperOptions,
      popper,
      popperPaneRef,
      input,
      tagWrapper,
      panel,
      suggestionPanel,
      popperVisible,
      inputHover,
      filtering,
      presentText,
      checkedValue,
      inputValue,
      searchInputValue,
      presentTags,
      suggestions,
      isDisabled,
      realSize,
      tagSize,
      multiple,
      readonly,
      clearBtnVisible,
      YunForm,
      YunFormItem,
      formEmit,
      togglePopperVisible,
      hideSuggestionPanel,
      deleteTag,
      focusFirstNode,
      getCheckedNodes,
      handleExpandChange,
      handleKeyDown,
      handleClear,
      handleSuggestionClick,
      handleDelete,
      handleInput,
    }
  },
}
</script>
