<template>
  <div class="yun-form-item" :class="formItemClass">
    <LabelWrap :is-auto-width="labelStyle.width === 'auto'" :update-all="YunForm.labelWidth === 'auto'">
      <label v-if="label || $slots.label" :for="labelFor" class="yun-form-item__label" :style="labelStyle">
        <slot name="label">{{ label }}</slot>
        <span class="item-suffix">{{ YunForm.labelSuffix }}</span>
      </label>
    </LabelWrap>
    <div class="yun-form-item__content" :style="contentStyle">
      <slot></slot>
      <transition name="zoom-in-top">
        <slot v-if="shouldShowError" name="error" :error="validateMessage">
          <div
            class="yun-form-item__error"
            :class="{
              'yun-form-item__error--inline':
                typeof inlineMessage === 'boolean' ? inlineMessage : YunForm.inlineMessage || false,
            }"
          >
            {{ validateMessage }}
          </div>
        </slot>
      </transition>
    </div>
  </div>
</template>

<script>
import {
  provide,
  inject,
  ref,
  watch,
  computed,
  nextTick,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  toRefs,
  reactive,
} from 'vue'
import mitt from 'mitt'
import { NOOP } from '@vue/shared'
import AsyncValidator from 'async-validator'
import { FormKey, FormItemKey, FormEvents } from './token'
import LabelWrap from './label-wrap'
import { validSize } from '../../utils/validatorSize'
import { getPropByPath } from '../../utils/utilsHelper'

export default {
  name: 'YunFormItem',
  componentName: 'YunFormItem',
  components: { LabelWrap },
  props: {
    label: String,
    labelWidth: String,
    prop: String,
    required: {
      type: Boolean,
      default: undefined,
    },
    rules: [Object, Array],
    error: String,
    validateStatus: String,
    for: String,
    inlineMessage: {
      type: [String, Boolean],
      default: '',
    },
    showMessage: {
      type: Boolean,
      default: true,
    },
    size: {
      types: String,
      validator: validSize,
    },
  },
  setup(props) {
    const formItemMitt = mitt()

    const YunForm = inject(FormKey, {})
    const validateState = ref('')
    const validateMessage = ref('')
    const validateDisabled = ref(false)
    const computedLabelWidth = ref('')

    const vm = getCurrentInstance()

    // 是否嵌套
    const isNested = computed(() => {
      let parent = vm.parent
      while (parent && parent.type.name !== 'YunForm') {
        if (parent.type.name === 'YunFormItem') {
          return true
        }
        parent = parent.parent
      }
      return false
    })

    let initialValue = undefined

    watch(
      () => props.error,
      val => {
        validateMessage.value = val
        validateState.value = val ? 'error' : ''
      },
      {
        immediate: true,
      },
    )
    watch(
      () => props.validateStatus,
      val => {
        validateState.value = val
      },
    )

    const labelFor = computed(() => props.for || props.prop)
    const labelStyle = computed(() => {
      if (YunForm.labelPosition === 'top') return {}
      const labelWidth = props.labelWidth || YunForm.labelWidth
      if (labelWidth) {
        return {
          width: labelWidth,
        }
      }
      return {}
    })

    const contentStyle = computed(() => {
      const ret = {}
      if (YunForm.labelPosition === 'top' || YunForm.inline) {
        return ret
      }
      if (!props.label && !props.labelWidth && isNested.value) {
        return ret
      }

      const labelWidth = props.labelWidth || YunForm.labelWidth
      if (labelWidth === 'auto') {
        if (props.labelWidth === 'auto') {
          ret.marginLeft = computedLabelWidth.value
        } else if (YunForm.labelWidth === 'auto') {
          ret.marginLeft = YunForm.autoLabelWidth
        }
      } else {
        ret.marginLeft = labelWidth
      }
      return ret
    })

    const fieldValue = computed(() => {
      const model = YunForm.model
      if (!model || !props.prop) {
        return
      }

      let path = props.prop
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.')
      }

      return getPropByPath(model, path, true).v
    })
    const isRequired = computed(() => {
      let rules = getRules()
      let required = false

      if (rules && rules.length) {
        rules.every(rule => {
          if (rule.required) {
            required = true
            return false
          }
          return true
        })
      }
      return required
    })
    const YunFormItemSize = computed(() => props.size || YunForm.size)
    const sizeClass = computed(() => {
      return YunFormItemSize.value
    })

    const validate = (trigger, callback = NOOP) => {
      validateDisabled.value = false
      const rules = getFilteredRule(trigger)
      if ((!rules || rules.length === 0) && props.required === undefined) {
        callback()
        return
      }
      validateState.value = 'validating'
      const descriptor = {}
      if (rules && rules.length > 0) {
        rules.forEach(rule => {
          delete rule.trigger
        })
      }
      descriptor[props.prop] = rules
      const validator = new AsyncValidator(descriptor)
      const model = {}
      model[props.prop] = fieldValue.value
      validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
        validateState.value = !errors ? 'success' : 'error'
        validateMessage.value = errors ? errors[0].message : ''
        callback(validateMessage.value, invalidFields)
        YunForm.emit?.('validate', props.prop, !errors, validateMessage.value || null)
      })
    }
    const clearValidate = () => {
      validateState.value = ''
      validateMessage.value = ''
      validateDisabled.value = false
    }

    const resetField = () => {
      validateState.value = ''
      validateMessage.value = ''
      let model = YunForm.model
      let value = fieldValue.value
      let path = props.prop
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.')
      }
      let prop = getPropByPath(model, path, true)
      validateDisabled.value = true
      prop.o[prop.k] = Array.isArray(value) ? [].concat(initialValue) : initialValue

      // reset validateDisabled after onFieldChange triggered
      nextTick(() => {
        validateDisabled.value = false
      })
    }

    const getRules = () => {
      const formRules = YunForm.rules
      const selfRules = props.rules
      const requiredRule = props.required !== undefined ? { required: !!props.required } : []
      const prop = getPropByPath(formRules, props.prop || '', false)
      const normalizedRule = formRules ? prop.o[props.prop || ''] || prop.v : []

      return [].concat(selfRules || normalizedRule || []).concat(requiredRule)
    }
    const getFilteredRule = trigger => {
      const rules = getRules()
      return rules
        .filter(rule => {
          if (!rule.trigger || trigger === '') return true
          if (Array.isArray(rule.trigger)) {
            return rule.trigger.indexOf(trigger) > -1
          } else {
            return rule.trigger === trigger
          }
        })
        .map(rule => ({ ...rule }))
    }
    const onFieldBlur = () => {
      validate('blur')
    }
    const onFieldChange = () => {
      if (validateDisabled.value) {
        validateDisabled.value = false
        return
      }
      validate('change')
    }
    const updateComputedLabelWidth = width => {
      computedLabelWidth.value = width ? `${width}px` : ''
    }

    const addValidateEvents = () => {
      const rules = getRules()

      if (rules.length || props.required !== undefined) {
        formItemMitt.on(FormEvents.blur, onFieldBlur)
        formItemMitt.on(FormEvents.change, onFieldChange)
      }
    }
    const removeValidateEvents = () => {
      formItemMitt.off(FormEvents.blur, onFieldBlur)
      formItemMitt.off(FormEvents.change, onFieldChange)
    }

    const YunFormItem = reactive({
      ...toRefs(props),
      size: sizeClass,
      validateState,
      removeValidateEvents,
      addValidateEvents,
      resetField,
      clearValidate,
      validate,
      formItemMitt,
      updateComputedLabelWidth,
    })

    onMounted(() => {
      if (props.prop) {
        YunForm.formMitt?.emit(FormEvents.addField, YunFormItem)
        let value = fieldValue.value
        initialValue = Array.isArray(value) ? [...value] : value

        addValidateEvents()
      }
    })
    onBeforeUnmount(() => {
      YunForm.formMitt?.emit(FormEvents.removeField, YunFormItem)
    })
    provide(FormItemKey, YunFormItem)

    const formItemClass = computed(() => [
      {
        'yun-form-item--feedback': YunForm.statusIcon,
        'is-error': validateState.value === 'error',
        'is-validating': validateState.value === 'validating',
        'is-success': validateState.value === 'success',
        'is-required': isRequired.value || props.required,
        'is-no-asterisk': YunForm.hideRequiredAsterisk,
      },
      sizeClass.value ? 'yun-form-item--' + sizeClass.value : '',
    ])

    const shouldShowError = computed(() => {
      return validateState.value === 'error' && props.showMessage && YunForm.showMessage
    })

    return {
      formItemClass,
      shouldShowError,
      YunForm,
      labelStyle,
      contentStyle,
      validateMessage,
      labelFor,
      resetField,
      clearValidate,
    }
  },
}
</script>
