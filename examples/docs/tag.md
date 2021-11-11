## Tag 标签

显示标签

### 基础用法

由`type`属性来选择`tag`的类型，也可以通过`color`属性来自定义背景色。 由于标签原有高度和按钮类似，因此去除 size 设置

::: demo

```html
<template>
  <div>
    <yun-tag>default</yun-tag>
    <yun-tag type="primary">primary</yun-tag>
    <yun-tag type="success">success</yun-tag>
    <yun-tag type="info">info</yun-tag>
    <yun-tag type="warning">warning</yun-tag>
    <yun-tag type="danger">danger</yun-tag>
  </div>
</template>
```

:::

### 多种颜色

由`dark`属性来设置深色模式,并可以设置更多颜色类型的标签

::: demo

```html
<template>
  <div>
    <yun-tag>default</yun-tag>
    <yun-tag type="primary" dark>primary</yun-tag>
    <yun-tag type="success" dark>success</yun-tag>
    <yun-tag type="info" dark>info</yun-tag>
    <yun-tag type="warning" dark>warning</yun-tag>
    <yun-tag type="danger" dark>danger</yun-tag>
    <yun-tag type="magenta">magenta</yun-tag>
    <yun-tag type="red">red</yun-tag>
    <yun-tag type="volcano">volcano</yun-tag>
    <yun-tag type="orange">orange</yun-tag>
    <yun-tag type="gold">gold</yun-tag>
    <yun-tag type="cyan">cyan</yun-tag>
    <yun-tag type="blue">blue</yun-tag>
    <yun-tag type="geekblue">geekblue</yun-tag>
    <yun-tag type="purple">purple</yun-tag>
  </div>
</template>
```

:::

### 可选择标签

设置`checkable`属性可以定义一个标签是否可可选择。

::: demo

```html
<template>
  <div class="myun-10">
    <yun-tag type="primary" dark checkable><span>primary</span></yun-tag>
    <yun-tag type="success" dark checkable>success</yun-tag>
    <yun-tag type="info" dark checkable>info</yun-tag>
    <yun-tag type="warning" dark checkable>warning</yun-tag>
    <yun-tag type="danger" dark checkable>danger</yun-tag>
    <yun-tag type="magenta" dark checkable>magenta</yun-tag>
    <yun-tag type="red" dark checkable>red</yun-tag>
    <yun-tag type="volcano" dark checkable>volcano</yun-tag>
    <yun-tag type="orange" dark checkable>orange</yun-tag>
    <yun-tag type="gold" dark checkable>gold</yun-tag>
    <yun-tag type="cyan" dark checkable>cyan</yun-tag>
    <yun-tag type="blue" dark checkable>blue</yun-tag>
    <yun-tag type="geekblue" dark checkable>geekblue</yun-tag>
    <yun-tag type="purple" dark checkable>purple</yun-tag>
  </div>
  <div>
    <yun-tag type="primary" checkable><span>primary</span></yun-tag>
    <yun-tag type="success" checkable>success</yun-tag>
    <yun-tag type="info" checkable>info</yun-tag>
    <yun-tag type="warning" checkable>warning</yun-tag>
    <yun-tag type="danger" checkable>danger</yun-tag>
    <yun-tag type="magenta" checkable>magenta</yun-tag>
    <yun-tag type="red" checkable>red</yun-tag>
    <yun-tag type="volcano" checkable>volcano</yun-tag>
    <yun-tag type="orange" checkable>orange</yun-tag>
    <yun-tag type="gold" checkable>gold</yun-tag>
    <yun-tag type="cyan" checkable>cyan</yun-tag>
    <yun-tag type="blue" checkable>blue</yun-tag>
    <yun-tag type="geekblue" checkable>geekblue</yun-tag>
    <yun-tag type="purple" checkable>purple</yun-tag>
  </div>
</template>
```

:::

### 可移除标签

设置`closable`属性可以定义一个标签是否可移除。

::: demo

```html
<template>
  <yun-tag type="primary" closable>标签一</yun-tag>
  <yun-tag type="success" closable>标签二</yun-tag>
  <yun-tag type="info" closable>标签三</yun-tag>
  <yun-tag type="warning" closable>标签四</yun-tag>
  <yun-tag type="danger" closable>标签五</yun-tag>
</template>
```

:::

### dot 模式

dot 模式可以简单显示带有提示小圆点等内容

::: demo

```html
<template>
  <yun-tag type="default" dot><span>default</span></yun-tag>
  <yun-tag type="primary" dot><span>primary</span></yun-tag>
  <yun-tag type="success" dot>success</yun-tag>
  <yun-tag type="info" dot>info</yun-tag>
  <yun-tag type="warning" dot>warning</yun-tag>
  <yun-tag type="danger" dot>danger</yun-tag>
  <yun-tag type="magenta" dot>magenta</yun-tag>
  <yun-tag type="red" dot>red</yun-tag>
  <yun-tag type="volcano" dot>volcano</yun-tag>
  <yun-tag type="orange" dot>orange</yun-tag>
  <yun-tag type="gold" dot>gold</yun-tag>
  <yun-tag type="cyan" dot>cyan</yun-tag>
  <yun-tag type="blue" dot>blue</yun-tag>
  <yun-tag type="geekblue" dot>geekblue</yun-tag>
  <yun-tag type="purple" dot>purple</yun-tag>
</template>
```

:::

### 动态编辑标签

::: demo

```html
<template>
  <div>
    <yun-button class="button-new-tag" @click="addOne">+ New Tag</yun-button>
    <p>
      <yun-tag :key="tag" v-for="tag in dynamicTags" type="primary" closable @close="handleCloseTag(tag)">
        {{tag}}
      </yun-tag>
    </p>
  </div>
</template>
<script>
  import { reactive, toRefs } from 'vue'

  export default {
    setup() {
      const data = reactive({
        dynamicTags: ['标签一', '标签二', '标签三'],
        count: 0,
      })
      const handleCloseTag = tag => {
        data.dynamicTags.splice(data.dynamicTags.indexOf(tag), 1)
      }
      const addOne = () => {
        data.count++
        data.dynamicTags.push('new tag' + data.count)
      }
      return {
        ...toRefs(data),
        handleCloseTag,
        addOne,
      }
    },
  }
</script>
```

:::

### 自定义样式

具有多种自定义样式的方式可供选择

::: demo

```html
<template>
  <yun-tag color="#ffa2d3">Custom Color</yun-tag>
  <yun-tag type="primary" no-border font-size="14px">No Border</yun-tag>
  <yun-tag :tag-style="{backgroundColor: '#5AFAFC',color:'#606266'}">Style</yun-tag>
  <yun-tag closable>Default</yun-tag>
</template>
```

:::

### Props

| 参数       | 说明                              | 类型    | 可选值                      | 默认值 |
| ---------- | --------------------------------- | ------- | --------------------------- | ------ |
| closable   | 是否可关闭                        | boolean | —                           | false  |
| type       | 主题                              | string  | success/info/warning/danger | —      |
| dot        | 是否显示是小圆点                  | boolean | —                           | false  |
| no-border  | 是否关闭边框                      | boolean | —                           | false  |
| color      | 背景颜色(可自定义)                | String  | —                           | —      |
| fontSize   | 字体大小                          | String  | —                           | —      |
| tag-style  | 标签样式(完全控制，尽量不要设置)  | String  | —                           | —      |
| checkable  | 是否可选中                        | Boolean | —                           | false  |
| modelValue | 选中状态可以使用 v-model 双向绑定 | Boolean | —                           | true   |

### Events

| 事件名 | 说明                                | 返回值       |
| ------ | ----------------------------------- | ------------ |
| close  | 关闭事件回调                        | event        |
| click  | 点击事件回调                        | event        |
| change | 选中事件回调,第二项需要设置 name 值 | checked,name |
