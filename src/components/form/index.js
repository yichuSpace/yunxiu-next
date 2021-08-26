import YunForm from './form.vue'

YunForm.install = Vue => {
  Vue.component(YunForm.name, YunForm)
}

export default YunForm
export * from './token'
