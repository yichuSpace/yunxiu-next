## Notice 通知

### 基础用法

Notice 组件提供通知功能，组件注册了\$notify 方法，设置 title 字段和 message 字段用于直接调用

::: demo

```html
<template>
  <yun-button @click="open(false)">提醒</yun-button>
  <yun-button @click="open(true)">打开提醒(仅标题)</yun-button>
  <yun-button @click="open1">render函数渲染</yun-button>
  <yun-button @click="time">自定义时长</yun-button>
</template>
<script>
  import { h } from 'vue'

  export default {
    methods: {
      open1() {
        console.log(this.$notice({}))
        this.$notice({
          title: '标题名称',
          message: h('i', { style: 'color: red' }, '我是render函数渲染出来的内容'),
        })
      },
      open(hasMessage) {
        this.$notice({
          title: 'Notice 标题',
          message: hasMessage ? '' : '这是通知内容,这是通知内容. 这是通知内容,这是通知内容.',
        })
      },
      time() {
        this.$notice({
          title: 'Notice 标题',
          message: 'duration设置为0则不会自动关闭',
          duration: 0,
        })
      },
    },
  }
</script>
```

:::

### 带图标

可以附带提示性的图标进行使用

::: demo

```html
<template>
  <div>
    <div style="padding: 5px 0;">带描述</div>
    <yun-button type="primary" plain @click="info(false)">Info</yun-button>
    <yun-button type="success" plain @click="success(false)">Success</yun-button>
    <yun-button type="warning" plain @click="warning(false)">Warning</yun-button>
    <yun-button type="danger" plain @click="error(false)">error</yun-button>
    <div style="padding: 5px 0;">仅标题</div>
    <yun-button type="primary" plain @click="info(true)">Info</yun-button>
    <yun-button type="success" plain @click="success(true)">Success</yun-button>
    <yun-button type="warning" plain @click="warning(true)">Warning</yun-button>
    <yun-button type="danger" plain @click="error(true)">error</yun-button>
  </div>
</template>
<script>
  export default {
    methods: {
      info(message) {
        this.$notice.info({
          title: 'Notice 标题',
          message: message ? '' : '这是通知内容,这是通知内容. 这是通知内容,这是通知内容.',
        })
      },
      success(message) {
        this.$notice.success({
          title: 'Notice 标题',
          message: message ? '' : '这是通知内容,这是通知内容. 这是通知内容,这是通知内容.',
        })
      },
      warning(message) {
        this.$notice.warning({
          title: 'Notice 标题',
          message: message ? '' : '这是通知内容,这是通知内容. 这是通知内容,这是通知内容.',
        })
      },
      error(message) {
        this.$notice.error({
          title: 'Notice 标题',
          message: message ? '' : '这是通知内容,这是通知内容. 这是通知内容,这是通知内容.',
        })
      },
    },
  }
</script>
```

:::

### 4 个方向

可以设置其他参数控制 notice 位置和显示

:::demo

```html
<template>
  <yun-button @click="$notice.info({title:'右上角',message:'右上角弹出notice',position:'top-right'})">
    右上角
  </yun-button>
  <yun-button @click="$notice.info({title:'左上角',message:'左上角弹出notice',position:'top-left'})">
    左上角
  </yun-button>
  <yun-button @click="$notice.info({title:'右下角',message:'右下角弹出notice',position:'bottom-right'})">
    右下角
  </yun-button>
  <yun-button @click="$notice.info({title:'左下角',message:'左下角弹出notice',position:'bottom-left'})">
    左下角
  </yun-button>
</template>
```

:::

### 其他参数

可以设置其他参数控制 notice 位置和显示

:::demo

```html
<template>
  <yun-button @click="$notice.info({title:'标题',useHTML:true,message:'我是<i>html</i>片段插入的内容'})">
    HTML片段
  </yun-button>
  <yun-button @click="$notice.info({title:'标题',showClose:false,message:'隐藏关闭按钮内容'})">
    隐藏关闭按钮
  </yun-button>
  <yun-button @click="$notice({title: '偏移',message: '这是一条带有偏移的提示消息',offset: 200})">
    偏移位置
  </yun-button>
</template>
```

:::

### API

组件注册了\$notice 已方便快速调用函数如下

```javascript
this.$notice(options)
this.$notice.info(options)
this.$notice.success(options)
this.$notice.warning(options)
this.$notice.error(options)
```

在 vue3 中你也可以手动引入并使用

```javascript
import { Notice } from 'yunxiu-next'

Notice(options)
Notice.info(options)
Notice.success(options)
Notice.warning(options)
Notice.error(options)
```

### Options

函数及参数说明如下：

| 函数      | 说明                                                          | 类型     | 默认值    |
| --------- | ------------------------------------------------------------- | -------- | --------- |
| title     | 通知提醒的标题                                                | String   | —         |
| message   | 通知提醒的内容，为空或不填时，自动应用仅标题模式下的样式      | String   | —         |
| duration  | 自动关闭的延时，单位秒，不关闭可以写 0                        | Number   | 4.5       |
| position  | 弹出位置 可选 top-right 、top-left、bottom-right、bottom-left | String   | top-right |
| onClose   | 关闭时的回调                                                  | Function | —         |
| showClose | 是否显示关闭按钮                                              | Boolean  | true      |
| useHTML   | 是否将 message 转换成 HTML 片段插入，此操作需谨慎             | Boolean  | false     |
| offset    | 偏移量                                                        | Number   | —         |
| zIndex    | 层级，默认 2000 以后追加                                      | Number   | —         |
