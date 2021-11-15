import YunDropdownMenu from '../dropdown/dropdown-menu.vue'

YunDropdownMenu.install = app => {
  app.component(YunDropdownMenu.name, YunDropdownMenu)
}

export default YunDropdownMenu
