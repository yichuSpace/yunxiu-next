import YunColorPicker from './picker.vue'

YunColorPicker.install = app => {
  app.component(YunColorPicker.name, YunColorPicker)
}

export default YunColorPicker
