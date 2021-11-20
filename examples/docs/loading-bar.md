## 顶部加载

<template>
    <div class="global-anchor">
      <yun-anchor :scroll-offset="100">
        <yun-anchor-link href="#shuo-ming" title="说明"></yun-anchor-link>
        <yun-anchor-link href="#dai-ma-shi-li" title="代码实例"></yun-anchor-link>
        <yun-anchor-link href="#api" title="API"></yun-anchor-link>
        <yun-anchor-link href="#attributes" title="Attributes"></yun-anchor-link>
      </yun-anchor>
    </div>
</template>

全局创建一个显示页面加载、异步请求、文件上传等的加载进度条。

### 说明

LoadingBar 只会在全局创建一个，因此在任何位置调用的方法都会控制这同一个组件。 主要使用场景是路由切换和 Ajax，因为这两者都不能拿到精确的进度，LoadingBar 会模拟进度， 当然也可以通过 update()
方法来传入一个精确的进度，比如在文件上传时会很有用，具体见 API。

#### 在路由中使用

```javascript
import YunxiuNext from '../../src/index'
Vue.use(YunxiuNext)

router.beforeEach((to, from, next) => {
  YunxiuNext.LoadingBar.start()
  next()
})
router.afterEach(() => {
  YunxiuNext.LoadingBar.finish()
})
```

### 代码实例

点击 Start 开始进度，点击 Done 结束。在调用 start()方法后，组件会自动模拟进度，当调用 done()或 error()时，补全进度并自动消失。

:::demo 点击 `Config` 之后再次查看配置项一般默认即可

```html
<template>
  <yun-button @click="start">Start</yun-button>
  <yun-button @click="update(50)">Update 50</yun-button>
  <yun-button @click="done">Done</yun-button>
  <yun-button @click="error">Error</yun-button>
  <yun-button @click="config">Config</yun-button>
</template>
<script>
  export default {
    methods: {
      start() {
        this.$loadingBar.start()
      },
      update(val) {
        this.$loadingBar.update(val)
      },
      done() {
        this.$loadingBar.done()
      },
      error() {
        this.$loadingBar.error()
      },
      config() {
        this.$loadingBar.config({
          color: '#5cb85c',
          failedColor: '#f0ad4e',
          height: 5,
          icon: 'loading2',
        })
      },
    },
  }
</script>
```

:::

### API

通过直接调用以下方法来使用组件：

    this.$loading.start()

    this.$loading.finish()

    this.$loading.error()

    this.$loading.update(percent)

以上方法隐式的创建及维护 Vue 组件。函数及参数说明如下：

### Options

| 函数        | 说明                                |
| ----------- | ----------------------------------- |
| color       | 默认颜色 ，primary                  |
| duration    | 动画执行时间 ，默认 800             |
| failedColor | 错误颜色，默认 error                |
| height      | 进度条高度，默认 2                  |
| icon        | 可以设置 icon 开启右侧 loading icon |
