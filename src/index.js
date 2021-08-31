import YunButton from './components/button'
import YunIcon from './components/icon'
import YunAlert from './components/alert'
import YunCountTo from './components/countTo'
import YunInput from './components/input'
import YunForm from './components/form'
import YunFormItem from './components/form-item'
import YunRow from './components/row'
import YunCol from './components/col'
import YunDivider from './components/divider'

import Notice from './components/notice'
import Message from './components/message'

import { setConfig } from './utils/config'

import config from '../package.json'

const version = config.version // version_ to fix tsc issue

const components = [
  YunButton,
  YunIcon,
  YunAlert,
  YunCountTo,
  YunInput,
  YunForm,
  YunFormItem,
  YunRow,
  YunCol,
  YunDivider,
]
const plugins = [Message, Notice]

const defaultInstallOpt = {
  zIndex: 2000,
}
const install = function(app, options = {}) {
  components.forEach(component => {
    app.use(component)
  })
  plugins.forEach(plugin => {
    app.use(plugin)
  })
  // 注册全局函数和属性
  app.config.globalProperties.$global = { ...defaultInstallOpt, ...options }
  setConfig({ ...defaultInstallOpt, ...options })

  return app
}

export {
  YunButton,
  YunIcon,
  YunAlert,
  Message,
  YunCountTo,
  YunInput,
  YunForm,
  YunFormItem,
  YunRow,
  YunCol,
  YunDivider,
  Notice,
}

export default {
  version,
  install,
}
