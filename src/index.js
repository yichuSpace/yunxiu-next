import YunButton from './components/button'
import YunIcon from './components/icon'
import YunAlert from './components/alert'
import YunMessage from './components/message'
import YunCountTo from './components/countTo'
import YunInput from './components/input'
import YunForm from './components/form'
import YunFormItem from './components/form-item'
import YunRow from './components/row'
import YunCol from './components/col'

import config from '../package.json'

const version = config.version // version_ to fix tsc issue

const components = [
  YunButton,
  YunIcon,
  YunAlert,
  YunMessage,
  YunCountTo,
  YunInput,
  YunForm,
  YunFormItem,
  YunRow,
  YunCol,
]

const install = function(app, options = {}) {
  components.forEach(component => {
    app.use(component)
  })
  return app
}

export { YunButton, YunIcon, YunAlert, YunMessage, YunCountTo, YunInput, YunForm, YunFormItem, YunRow, YunCol }

export default {
  version,
  install,
}
