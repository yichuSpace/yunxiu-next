## 快速上手

本章节介绍如何在项目中使用 vue3 版本的 yunxiu-next

### 引入

你可以引入整个 yunxiu-next，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 yunxiu-next。

#### 完整引入

在 main.js 中写入以下内容：

```javascript
import { createApp } from 'vue'
import YunUI from 'yunxiu-next'
import App from './App.vue'
import 'yunxiu-next/lib/styles/index.css'

const app = createApp(App)
app.use(YunUI)
// app.use(YunUI,{disabledDoc:true}) // 可以设置禁用doc地址log
app.mount('#app')
```

以上代码便完成了 yunxiu-next 的引入。需要注意的是，样式文件需要单独引入。

#### 按需引入

借助插件 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)我们可以只引入需要的组件，以达到减小项目体积的目的

```shell script
npm install babel-plugin-import --save-dev
```

然后，将 .babelrc 或 babel.config.js 修改为：

```javascript
module.exports = {
  presets: [
    [
      '@vue/app',
      {
        useBuiltIns: 'entry',
      },
    ],
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'yunxiu-next',
        libraryDirectory: 'src/components',
      },
    ],
  ],
}
```

如果你只希望引入部分组件，比如 Button 和 Icon，那么需要在 main.js 中写入以下内容

```javascript
import { createApp } from 'vue'
import { YunButton } from 'yunxiu-next'
import App from './App.vue'
import 'yunxiu-next/lib/styles/components/button.css'

const app = createApp(App)
app.use(YunButton)
app.mount('#app')
```

**特别提醒:按需引用仍然需要导入样式，即在 main.js 或根组件 import 'yunxiu-next/lib/styles/index.css';**

完整组件列表参考源代码
