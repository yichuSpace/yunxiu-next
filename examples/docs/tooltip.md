## Tooltip 提示

文字提示气泡框，在鼠标悬停时显示，代替了系统的 title 提示。tooltip 的 default slot 应该保证是一个 dom 或者一个 component

### 基础用法

::: demo

```html
<template>
  <yun-tooltip content="这是tooltip悬停文字">
    <span>这是一段文字，鼠标经过其上时会显示tooltip</span>
  </yun-tooltip>
</template>
```

:::

### 多种悬停位置

::: demo

```html
<template>
  <div class="top">
    <yun-tooltip content="Top Left text" placement="top-start"> <yun-button>上左</yun-button>&nbsp;&nbsp; </yun-tooltip>
    <yun-tooltip content="Top Center text" placement="top"> <yun-button>上边</yun-button>&nbsp;&nbsp; </yun-tooltip>
    <yun-tooltip content="Top Right text" placement="top-end">
      <yun-button>上右</yun-button>
    </yun-tooltip>
  </div>
  <div class="center">
    <div class="center-left">
      <yun-tooltip content="Left Top text" placement="left-start">
        <yun-button>左上</yun-button>
      </yun-tooltip>
      <br /><br />
      <yun-tooltip content="Left Center text" placement="left">
        <yun-button>左边</yun-button>
      </yun-tooltip>
      <br /><br />
      <yun-tooltip content="Left Bottom text" placement="left-end">
        <yun-button>左下</yun-button>
      </yun-tooltip>
    </div>
    <div class="center-right">
      <yun-tooltip content="Right Top text" placement="right-start">
        <yun-button>右上</yun-button>
      </yun-tooltip>
      <br /><br />
      <yun-tooltip content="Right Center text" placement="right">
        <yun-button>右边</yun-button>
      </yun-tooltip>
      <br /><br />
      <yun-tooltip content="Right Bottom text" placement="right-end">
        <yun-button>右下</yun-button>
      </yun-tooltip>
    </div>
  </div>
  <div class="bottom">
    <yun-tooltip content="Bottom Left text" placement="bottom-start">
      <yun-button>下左</yun-button>&nbsp;&nbsp;
    </yun-tooltip>
    <yun-tooltip content="Bottom Center text" placement="bottom">
      <yun-button>下边</yun-button>&nbsp;&nbsp;
    </yun-tooltip>
    <yun-tooltip content="Bottom Right text" placement="bottom-end">
      <yun-button>下右</yun-button>
    </yun-tooltip>
  </div>
</template>
```

:::

### 不同主题

::: demo

```html
<template>
  <yun-tooltip content="light" theme="light">
    <yun-button>light</yun-button>
  </yun-tooltip>
  <yun-tooltip content="Dark" theme="dark">
    <yun-button>Dark(default)</yun-button>
  </yun-tooltip>
</template>
```

:::

### 多行

::: demo

```html
<template>
  <yun-tooltip placement="top">
    <yun-button>多行</yun-button>
    <template #content>
      <div>这是多行文字</div>
      <div>这是多行文字</div>
    </template>
  </yun-tooltip>
  <yun-tooltip
    placement="top"
    content="我是一段长文本，我是一段长文本，我是一段长文本，我是一段长文本，我是一段长文本，我是一段长文本"
  >
    <yun-button>长文本</yun-button>
  </yun-tooltip>
</template>
```

:::

### 延时，触发时机和禁用提示

::: demo

```html
<template>
  <yun-tooltip content="延时一秒显示悬停文字" :open-delay="1000">
    <yun-button>延时一秒</yun-button>
  </yun-tooltip>
  <yun-tooltip content="点击显示" trigger="click">
    <yun-button>点击显示</yun-button>
  </yun-tooltip>
  <yun-tooltip content="关闭和隐藏提示" :disabled="disabled">
    <yun-button @click="disabled=!disabled">{{ disabled ? '关闭提示':'开启提示'}}</yun-button>
  </yun-tooltip>
</template>
<script>
  export default {
    data() {
      return {
        disabled: false,
      }
    },
  }
</script>
```

:::

### Props

| 参数            | 说明                     | 类型    | 可选值                                                                                                    | 默认值         |
| --------------- | ------------------------ | ------- | --------------------------------------------------------------------------------------------------------- | -------------- |
| v-model:visible | 状态是否可见             | Boolean | —                                                                                                         | false          |
| content         | 显示的内容               | string  | —                                                                                                         | —              |
| placement       | 提示框出现的位置         | string  | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | —              |
| disabled        | 是否禁用提示框           | Boolean | —                                                                                                         | false          |
| transition      | 自定义渐变动画           | string  | —                                                                                                         | fade-in-linear |
| visible-arrow   | 是否显示箭头             | Boolean | —                                                                                                         | true           |
| theme           | 主题                     | string  | dark 或 light                                                                                             | dark           |
| open-delay      | 延迟出现，单位毫秒       | number  | —                                                                                                         | 0              |
| hide-delay      | 延迟消失，单位毫秒       | number  | —                                                                                                         | 0              |
| offset          | 出现位置的偏移量         | Number  | —                                                                                                         | 12             |
| appendToBody    | 是否将弹层放置于 body 内 | Boolean | —                                                                                                         | true           |

### Slot

| 名称    | 说明                                                 |
| ------- | ---------------------------------------------------- |
| content | 提示框的内容，定义此 slot 时，会覆盖 props content。 |
