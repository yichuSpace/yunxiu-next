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
import YunRadio from './components/radio'
import YunRadioGroup from './components/radio-group'
import YunCheckbox from './components/checkbox'
import YunCheckboxGroup from './components/checkbox-group'
import YunSwitch from './components/switch'
import YunPopover from './components/popover'
import YunTooltip from './components/tooltip'
import YunDatePicker from './components/date-picker'
import YunTimePicker from './components/time-picker'
import YunEmpty from './components/empty'
import YunPopper from './components/popper'
import YunScrollbar from './components/scrollbar'
import YunSpace from './components/space'
import YunMenu from './components/menu'
import YunMenuItem from './components/menu-item'
import YunMenuItemGroup from './components/menu-item-group'
import YunSubmenu from './components/submenu'
import YunBreadcrumb from './components/breadcrumb'
import YunBreadcrumbItem from './components/breadcrumb-item'
import YunDropdown from './components/dropdown'
import YunDropdownItem from './components/dropdown-item'
import YunDropdownMenu from './components/dropdown-menu'
import YunBackTop from './components/back-top'
import YunTabs from './components/tabs'
import YunStep from './components/step'
import YunSteps from './components/steps'
import YunCascader from './components/cascader'
import YunCascaderPanel from './components/cascader-panel'
import YunColorPicker from './components/color-picker'
import YunRate from './components/rate'
import YunSlider from './components/slider'
import YunUpload from './components/upload'
import YunProgress from './components/progress'
import YunTree from './components/tree'
import YunBigTree from './components/big-tree'
import YunDesc from './components/desc'
import YunDescItem from './components/desc-item'
import YunCircle from './components/circle'
import YunCard from './components/card'
import YunBadge from './components/badge'
import YunCollapse from './components/collapse'
import YunCollapsePanel from './components/collapse-panel'
import YunSplit from './components/split'
import YunSkeleton from './components/skeleton'
import YunSkeletonItem from './components/skeleton-item'
import LoadingBar from './components/loading-bar'

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
  YunRadio,
  YunRadioGroup,
  YunCheckbox,
  YunCheckboxGroup,
  YunSwitch,
  YunPopover,
  YunTooltip,
  YunDatePicker,
  YunTimePicker,
  YunEmpty,
  YunPopper,
  YunScrollbar,
  YunMenu,
  YunMenuItem,
  YunMenuItemGroup,
  YunSubmenu,
  YunBreadcrumb,
  YunBreadcrumbItem,
  YunDropdown,
  YunDropdownItem,
  YunDropdownMenu,
  YunBackTop,
  YunTabs,
  YunStep,
  YunSteps,
  YunCascader,
  YunCascaderPanel,
  YunSpace,
  YunColorPicker,
  YunRate,
  YunSlider,
  YunUpload,
  YunProgress,
  YunTree,
  YunBigTree,
  YunDesc,
  YunDescItem,
  YunCircle,
  YunCard,
  YunBadge,
  YunCollapse,
  YunCollapsePanel,
  YunSplit,
  YunSkeleton,
  YunSkeletonItem,
]

const plugins = [Message, Notice, LoadingBar]

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
  YunRadio,
  YunRadioGroup,
  YunCheckbox,
  YunCheckboxGroup,
  YunSwitch,
  YunPopover,
  YunTooltip,
  YunDatePicker,
  YunTimePicker,
  YunEmpty,
  YunPopper,
  YunScrollbar,
  YunSpace,
  YunMenu,
  YunMenuItem,
  YunMenuItemGroup,
  YunSubmenu,
  YunBreadcrumb,
  YunBreadcrumbItem,
  YunDropdown,
  YunDropdownItem,
  YunDropdownMenu,
  YunBackTop,
  YunTabs,
  YunStep,
  YunSteps,
  YunCascader,
  YunCascaderPanel,
  YunColorPicker,
  YunRate,
  YunSlider,
  YunUpload,
  YunProgress,
  YunTree,
  YunBigTree,
  YunDesc,
  YunDescItem,
  YunCircle,
  YunCard,
  YunBadge,
  YunCollapse,
  YunCollapsePanel,
  YunSplit,
  YunSkeleton,
  YunSkeletonItem,
  LoadingBar,
  Notice,
  Utils,
}

export default {
  version,
  install,
}
