import YunButton from './components/button'
import YunIcon from './components/icon'
import YunAlert from './components/alert'
import YunCountTo from './components/countTo'
import YunInput from './components/input'
import YunInputNumber from './components/input-number'
import YunForm from './components/form'
import YunFormItem from './components/form-item'
import YunRow from './components/row'
import YunCol from './components/col'
import YunDivider from './components/divider'
import YunLoading from './components/loading'
import YunAffix from './components/affix'
import YunAnchor from './components/anchor'
import YunAnchorLink from './components/anchor-link'
import YunTable from './components/table'
import YunPagination from './components/pagination'
import YunSelect from './components/select'
import YunOption from './components/option'
import YunOptionGroup from './components/option-group'
import YunTag from './components/tag'
// import YunRadio from './components/radio'
// import YunRadioGroup from './components/radio-group'

import Notice from './components/notice'
import Message from './components/message'

import * as util from './utils/util'
import { setConfig } from './utils/config'

import { ClickAnimation, ClickOutside, NoData, Loading, Waves } from './directives'

import config from '../package.json'

const version = config.version // version_ to fix tsc issue
const Utils = {
  util,
  // helper,
  // resize,
  // color,
  // dom,
  // log,
}

const components = [
  YunButton,
  YunIcon,
  YunAlert,
  YunCountTo,
  YunInput,
  YunInputNumber,
  YunForm,
  YunFormItem,
  YunRow,
  YunCol,
  YunDivider,
  YunLoading,
  YunAffix,
  YunAnchor,
  YunAnchorLink,
  YunTable,
  YunPagination,
  YunSelect,
  YunOption,
  YunOptionGroup,
  YunTag,
  // YunRadio,
  // YunRadioGroup,
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
  // 注册全局指令
  app.directive('Waves', Waves)
  app.directive('ClickAnimation', ClickAnimation)
  app.directive('ClickOutside', ClickOutside)
  app.directive('NoData', NoData)
  app.directive('Loading', Loading)
  // 注册全局函数和属性
  app.config.globalProperties.$global = { ...defaultInstallOpt, ...options }
  setConfig({ ...defaultInstallOpt, ...options })
  app.config.globalProperties.$title = util.title
  app.config.globalProperties.$open = util.open
  app.config.globalProperties.$copy = util.copy
  return app
}

export {
  YunButton,
  YunIcon,
  YunAlert,
  Message,
  YunCountTo,
  YunInput,
  YunInputNumber,
  YunForm,
  YunFormItem,
  YunRow,
  YunCol,
  YunDivider,
  YunLoading,
  YunAffix,
  YunAnchor,
  YunAnchorLink,
  YunTable,
  YunPagination,
  YunSelect,
  YunOption,
  YunOptionGroup,
  YunTag,
  // YunRadio,
  // YunRadioGroup,
  Notice,
  Utils,
}

export default {
  version,
  install,
}
