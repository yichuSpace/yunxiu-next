import YunProgress from './progress.vue'

YunProgress.install = Vue => {
  Vue.component(YunProgress.name, YunProgress)
}

export default YunProgress
