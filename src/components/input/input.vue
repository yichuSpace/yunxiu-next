<template>
  <div :class="wrapClasses">
    <template v-if="type !== 'textarea'">
      <span class="yun-input-group-prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </span>
      <input
        :id="elementId"
        :autocomplete="type === 'password' ? 'new-password' : autocomplete"
        ref="inputRef"
        :type="inputType"
        :class="inputClasses"
        :placeholder="placeholder"
        :disabled="inputDisabled"
        :maxlength="maxlength"
        :readonly="readonly"
        :name="name"
        :value="currentValue"
        :number="number"
        :autofocus="autofocus"
        @keyup.enter="handleEnter"
        @keyup="handleKeyup"
        @keypress="handleKeypress"
        @keydown="handleKeydown"
        @focus="handleFocus"
        @blur="handleBlur"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        @input="handleInput"
        @change="handleChange"
      />
      <span class="yun-input-prefix" v-if="showPrefix">
        <slot name="prefix">
          <i class="yun-iconfont" :class="['yun-icon-' + prefix]" v-if="prefix"></i>
        </slot>
      </span>
      <span class="yun-input-suffix" v-if="showSuffix">
        <i
          class="yun-iconfont"
          :class="['yun-icon-' + icon, 'yun-input-icon', 'yun-input-icon-normal']"
          v-if="icon"
          @click="handleIconClick"
        ></i>
        <i
          class="yun-iconfont yun-icon-search"
          :class="['yun-input-icon', 'yun-input-icon-normal', 'yun-input-search-icon']"
          v-if="search"
          @click.stop="handleSearch"
        ></i>
        <i
          class="yun-iconfont yun-input-icon yun-input-icon-normal yun-input-view-icon"
          :class="showPassword ? 'yun-icon-eye' : 'yun-icon-eye-close'"
          v-if="showPasswordToggle"
          @click.stop="handleTogglePass"
        ></i>
        <slot name="suffix">
          <i class="yun-iconfont" :class="['yun-icon-' + suffix]" v-if="suffix"></i>
        </slot>
        <i
          v-if="YunForm.statusIcon && validateState"
          :class="['yun-iconfont', 'yun-input__validateIcon', validateIcon]"
        ></i>
      </span>
      <span class="yun-input-word-count" v-if="showWordCount">{{ wordCount }}</span>
      <!--清空按钮-->
      <span :class="closeClasses" v-if="clearable && currentValue && !disabled">
        <i class="yun-iconfont yun-icon-close-circle-fill" @click.stop.prevent="handleClear"></i>
      </span>

      <span class="yun-input-group-append" v-if="$slots.append">
        <slot name="append"></slot>
      </span>
    </template>
    <template v-else>
      <textarea
        :id="elementId"
        :wrap="wrap"
        :autocomplete="autocomplete"
        ref="textareaRef"
        :class="textareaClasses"
        :style="textareaStyle"
        :placeholder="placeholder"
        :disabled="inputDisabled"
        :rows="rows"
        :maxlength="maxlength"
        :readonly="readonly"
        :name="name"
        :value="currentValue"
        :autofocus="autofocus"
        @keyup.enter="handleEnter"
        @keyup="handleKeyup"
        @keypress="handleKeypress"
        @keydown="handleKeydown"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        @input="handleInput"
      ></textarea>
      <span class="yun-input-word-count" v-if="showWordCount">{{ wordCount }}</span>
    </template>
  </div>
</template>

<script>
import { computed, ref, watch, onMounted, reactive, toRefs, nextTick } from 'vue'
import calcTextareaHeight from './calcTextareaHeight'
import useForm from '../../hooks/useForm'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../utils/constants'
const prefixCls = 'yun-input'

export default {
  name: 'YunInput',
  props: {
    type: {
      validator: value => {
        return ['text', 'textarea', 'password', 'url', 'email', 'date', 'number', 'tel'].includes(value)
      },
      default: 'text',
    },
    modelValue: {
      type: [String, Number, Boolean],
      default: '',
    },
    size: {
      type: String,
      validator: value => {
        return ['small', 'large', 'default', 'mini', ''].includes(value)
      },
    },
    placeholder: {
      type: String,
      default: '',
    },
    maxlength: {
      type: Number,
    },
    disabled: Boolean,
    showPasswordToggle: Boolean,
    icon: {
      type: String,
      default: '',
    },
    autosize: {
      type: Object,
      default: () => {
        return {}
      },
    },
    rows: {
      type: Number,
      default: 2,
    },
    readonly: Boolean,
    name: String,
    number: Boolean,
    autofocus: Boolean,
    autocomplete: {
      validator: value => {
        return ['on', 'off'].includes(value)
      },
      default: 'off',
    },
    clearable: Boolean,
    elementId: String,
    wrap: {
      validator: value => {
        return ['hard', 'soft'].includes(value)
      },
      default: 'soft',
    },
    prefix: {
      type: String,
      default: '',
    },
    suffix: {
      type: String,
      default: '',
    },
    search: Boolean,
    noResize: Boolean,
    showWordCount: Boolean,
    validateEvent: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, ctx) {
    // data
    const data = reactive({
      currentValue: props.modelValue,
      textareaStyles: {},
      isOnComposition: false,
    })
    const inputRef = ref(null)
    const textareaRef = ref(null)
    const showPassword = ref(false)
    const { YunForm, YunFormItem, validateState, validateIcon, formEmit } = useForm()

    // watch
    watch(
      () => props.modelValue,
      val => {
        setCurrentValue(val)
      },
    )
    // computed
    const wrapClasses = computed(() => {
      return [
        `${prefixCls}-wrapper`,
        {
          [`${prefixCls}-wrapper-${props.size}`]: !!props.size,
          [`${prefixCls}-type-${props.type}`]: props.type,
          [`${prefixCls}-group-with-prepend`]: ctx.slots.prepend,
          [`${prefixCls}-group-with-append`]: ctx.slots.append || props.search,
          [`${prefixCls}-hide-icon`]: ctx.slots.append, // #554
          [`${prefixCls}-with-search`]: props.search,
          [`${prefixCls}-with-word-count`]: props.showWordCount,
        },
      ]
    })
    const showPrefix = computed(() => props.prefix !== '' || ctx.slots.prefix !== undefined)
    const showSuffix = computed(() => {
      return (
        props.suffix !== '' ||
        props.icon !== '' ||
        props.search ||
        props.showPasswordToggle ||
        ctx.slots.suffix !== undefined
      )
    })
    const inputDisabled = computed(() => props.disabled)
    const inputSize = computed(() => props.size)
    const inputType = computed(() =>
      props.type !== 'password' ? props.type : `${showPassword.value ? 'text' : 'password'}`,
    )
    const inputClasses = computed(() => {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${inputSize.value}`]: !!inputSize.value,
          [`${prefixCls}-disabled`]: inputDisabled.value,
          [`${prefixCls}-with-prefix`]: showPrefix.value,
          [`${prefixCls}-with-suffix`]: showSuffix.value || props.search,
        },
      ]
    })
    const closeClasses = computed(() => [prefixCls + '-icon', prefixCls + '-icon-clear'])
    const textareaStyle = computed(() => {
      return {
        resize: props.noResize ? 'none' : null,
        ...data.textareaStyles,
      }
    })
    const textareaClasses = computed(() => {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-disabled`]: props.disabled,
        },
      ]
    })
    const wordCount = computed(() => {
      return data.currentValue.toString().length + (props.maxlength ? `/${props.maxlength}` : '')
    })
    // self methods
    const setCurrentValue = value => {
      if (value === data.currentValue) return
      nextTick(() => {
        resizeTextarea()
      })
      data.currentValue = value
      if (props.validateEvent) {
        formEmit('change', [value])
      }
    }

    const resizeTextarea = () => {
      const autosize = props.autosize
      if (!autosize || props.type !== 'textarea') {
        return false
      }

      const minRows = autosize.minRows || props.rows
      const maxRows = autosize.maxRows || props.rows

      data.textareaStyles = calcTextareaHeight(textareaRef.value, minRows, maxRows)
    }
    // handle methods
    const handleEnter = e => {
      ctx.emit('enter', e)
      if (props.search) ctx.emit('search', data.currentValue)
    }
    const handleKeydown = e => {
      ctx.emit('keydown', e)
    }
    const handleKeypress = e => {
      ctx.emit('keypress', e)
    }
    const handleKeyup = e => {
      ctx.emit('keyup', e)
    }
    const handleIconClick = e => {
      ctx.emit('click', e)
    }
    const handleFocus = e => {
      ctx.emit('focus', e)
    }
    const handleBlur = e => {
      ctx.emit('blur', e)
      if (props.validateEvent) {
        formEmit('blur', [props.modelValue])
      }
    }
    const handleComposition = e => {
      if (e.type === 'compositionstart') {
        data.isOnComposition = true
      }
      if (e.type === 'compositionend') {
        data.isOnComposition = false
        handleInput(e)
      }
    }
    const handleInput = e => {
      if (data.isOnComposition) return
      let value = e.target.value
      if (props.number && value !== '') value = Number.isNaN(Number(value)) ? value : Number(value)
      setCurrentValue(value)
      ctx.emit(UPDATE_MODEL_EVENT, value)
      ctx.emit('input', value)
    }
    const handleChange = e => {
      ctx.emit(CHANGE_EVENT, e.target.value)
    }
    const handleTogglePass = () => {
      showPassword.value = !showPassword.value
    }

    const handleClear = () => {
      setCurrentValue('')
      ctx.emit(UPDATE_MODEL_EVENT, '')
      ctx.emit(CHANGE_EVENT, '')
      ctx.emit('clear')
    }
    const handleSearch = () => {
      if (props.disabled) return false
      inputRef?.value.focus()
      ctx.emit('search', data.currentValue)
    }

    const focus = () => {
      if (props.type === 'textarea') {
        textareaRef?.value.focus()
      } else {
        inputRef?.value.focus()
      }
    }

    const blur = () => {
      if (props.type === 'textarea') {
        textareaRef?.value.blur()
      } else {
        inputRef?.value.blur()
      }
    }

    // mounted
    onMounted(() => {
      if (props.type === 'textarea') {
        resizeTextarea()
      }
    })
    return {
      ...toRefs(data),
      inputRef,
      textareaRef,
      showPassword,
      wrapClasses,
      showPrefix,
      showSuffix,
      inputDisabled,
      inputSize,
      inputType,
      inputClasses,
      closeClasses,
      textareaStyle,
      textareaClasses,
      wordCount,

      YunForm,
      YunFormItem,
      validateState,
      validateIcon,
      formEmit,

      handleEnter,
      handleKeydown,
      handleKeypress,
      handleKeyup,
      handleIconClick,
      handleFocus,
      handleBlur,
      handleComposition,
      handleInput,
      handleChange,
      handleClear,
      handleSearch,
      handleTogglePass,
      focus,
      blur,
    }
  },
}
</script>
