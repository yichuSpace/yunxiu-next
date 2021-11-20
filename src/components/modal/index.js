import YunModal from './modal.vue'

YunModal.install = app => {
  app.component(YunModal.name, YunModal)
}

export default YunModal
export { default as useModal } from './useModal'
