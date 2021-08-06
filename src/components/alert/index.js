import YunAlert from './alert.vue'

YunAlert.install = Vue => {
  Vue.component(YunAlert.name, YunAlert)
}

export default YunAlert
