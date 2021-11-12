<template>
  <label
    v-if="isBtnGroup"
    v-click-animation
    class="yun-radio"
    :class="{
      'is-disabled': isDisabled,
      'is-focus': focus,
      'is-checked': model === label,
    }"
    role="radio"
    :aria-checked="model === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
  >
    <span
      class="yun-radio__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label,
      }"
    >
      <span class="yun-radio__inner"></span>
      <input
        ref="radioRef"
        v-model="model"
        class="yun-radio__original"
        :value="label"
        type="radio"
        aria-hidden="true"
        :name="name"
        :disabled="isDisabled"
        tabindex="-1"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
      />
    </span>
    <span v-if="$slots.default || label" class="yun-radio__label" @keydown.stop>
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
  <label
    v-else
    class="yun-radio"
    :class="{
      'is-disabled': isDisabled,
      'is-focus': focus,
      'is-checked': model === label,
    }"
    role="radio"
    :aria-checked="model === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
  >
    <span
      class="yun-radio__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label,
      }"
    >
      <span class="yun-radio__inner"></span>
      <input
        ref="radioRef"
        v-model="model"
        class="yun-radio__original"
        :value="label"
        type="radio"
        aria-hidden="true"
        :name="name"
        :disabled="isDisabled"
        tabindex="-1"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
      />
    </span>
    <span v-if="$slots.default || label" class="yun-radio__label" @keydown.stop>
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script>
import { computed, nextTick, ref } from 'vue'
import { UPDATE_MODEL_EVENT } from '../../utils/constants'
import { useRadio, useRadioAttrs } from './useRadio'

export default {
  name: 'YunRadio',
  componentName: 'YunRadio',
  props: {
    modelValue: {
      type: [Boolean, String, Number],
      default: '',
    },
    label: {
      type: [Boolean, String, Number],
      default: '',
    },
    disabled: Boolean,
    name: {
      type: String,
      default: '',
    },
  },
  emits: [UPDATE_MODEL_EVENT, 'change'],
  setup(props, ctx) {
    const { isGroup, isBtnGroup, radioGroup, YunForm, focus } = useRadio()

    const radioRef = ref(null)
    const model = computed({
      get() {
        return isGroup.value ? radioGroup.modelValue : props.modelValue
      },
      set(val) {
        if (isGroup.value) {
          radioGroup.changeEvent(val)
        } else {
          ctx.emit(UPDATE_MODEL_EVENT, val)
        }
        radioRef.value.checked = props.modelValue === props.label
      },
    })

    const { tabIndex, isDisabled } = useRadioAttrs(props, {
      isGroup,
      radioGroup,
      YunForm,
      model,
    })

    function handleChange() {
      nextTick(() => {
        ctx.emit('change', model.value)
      })
    }

    return {
      focus,
      isGroup,
      isBtnGroup,
      isDisabled,
      model,
      tabIndex,
      handleChange,
      radioRef,
    }
  },
}
</script>
