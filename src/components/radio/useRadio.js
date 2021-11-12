import { ref, computed, inject } from 'vue'
import useForm from '../../hooks/useForm'

export const useRadio = () => {
  const { YunForm, YunFormItem, formEmit } = useForm()
  const radioGroup = inject('RadioGroup', {})
  const focus = ref(false)
  const isGroup = computed(() => radioGroup?.name === 'YunRadioGroup')
  const isBtnGroup = computed(() => isGroup.value && radioGroup?.type === 'button')

  return {
    isGroup,
    focus,
    radioGroup,
    isBtnGroup,
    YunForm,
    YunFormItem,
    formEmit,
  }
}

export const useRadioAttrs = (props, { isGroup, radioGroup, YunForm, model }) => {
  const isDisabled = computed(() => {
    return isGroup.value
      ? radioGroup.disabled || props.disabled || YunForm.disabled
      : props.disabled || YunForm.disabled
  })

  const tabIndex = computed(() => {
    return isDisabled.value || (isGroup.value && model.value !== props.label) ? -1 : 0
  })

  return {
    isDisabled,
    tabIndex,
  }
}
