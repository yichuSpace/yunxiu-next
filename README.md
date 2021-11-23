# Yunxiu-next 指南

Hi! 首先感谢你使用 Yunxiu-next。

Yunxiu-next 是一套基于 Vue 3.x 开发的开源组件库，旨在快速搭建页面。

## 文档

您可以在上找到更多详细信息、API 和其他文档https://yichuspace.github.io/yunxiu-next

[国内加速镜像站点](https://gitee.com/yichu-gitee/yunxiu-next)

## 安装

推荐使用 `npm` 或 `yarn` 进行安装，它能更好地和 `webpack` 打包工具配合使用。而且可以更好的和 `es6` `typescript` 配合使用。并且支持按需引入

```shell
npm i yunxiu-next -S
# or
yarn add yunxiu-next
```

## 快速上手

### 引入

你可以引入整个 yunxiu-next，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 yunxiu-next。

#### 完整引入

在 main.js 中写入以下内容：

```javascript
import { createApp } from 'vue'
import YunxiuNext from 'yunxiu-next'
import App from './App.vue'
import 'yunxiu-next/lib/styles/index.css'

const app = createApp(App)
app.use(YunxiuNext)
// app.use(YunxiuNext,{disabledDoc:true}) // 可以设置禁用doc地址log
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
