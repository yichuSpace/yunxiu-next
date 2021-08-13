## Message 通知

轻量级的信息反馈组件，在顶部居中显示，并自动消失。有多种不同的提示状态可选择。

### 基础用法

基本用法，默认在 3 秒后关闭

:::demo

```html
<template>
  <yun-button @click="$message('普通的消息提示')">info</yun-button>
  <yun-button @click="open1">render函数</yun-button>
</template>
<script>
  import { h } from 'vue'

  export default {
    methods: {
      open1() {
        this.$message.info({
          message: h('i', { style: 'color: red' }, '我是render函数渲染出来的内容'),
        })
      },
    },
  }
</script>
```

:::
