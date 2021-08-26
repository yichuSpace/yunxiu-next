import { FormItemKey, FormKey, FormEvents } from '../components/form'
import { inject, computed } from 'vue'

export const VALIDATE_STATE_MAP = {
  validating: 'yun-icon-loading icon-is-rotating',
  success: 'yun-icon-check-circle',
  error: 'yun-icon-close-circle',
}

export default function useForm() {
  const YunForm = inject(FormKey, {})
  const YunFormItem = inject(FormItemKey, {})

  const validateState = computed(() => YunFormItem.validateState || '')

  const validateIcon = computed(() => VALIDATE_STATE_MAP[validateState.value])

  // blur, change,value
  function formEmit(type, value) {
    YunFormItem.formItemMitt?.emit(FormEvents[type], value)
  }

  return {
    YunForm,
    YunFormItem,
    validateState,
    validateIcon,
    formEmit,
  }
}
