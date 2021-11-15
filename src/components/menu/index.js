import YunMenu from './menu.vue'

YunMenu.install = app => {
  app.component(YunMenu.name, YunMenu)
}

export default YunMenu
