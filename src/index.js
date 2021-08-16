import YunButton from './components/button'
import YunIcon from './components/icon'
import YunAlert from './components/alert'
import YunMessage from './components/message'
import YunCountTo from './components/countTo'

import config from '../package.json'

const version = config.version // version_ to fix tsc issue

const components = [YunButton, YunIcon, YunAlert, YunMessage, YunCountTo]

const install = function(app, options = {}) {
  components.forEach(component => {
    app.use(component)
  })
  return app
}

export { YunButton, YunIcon, YunAlert, YunMessage, YunCountTo }

export default {
  version,
  install,
}
