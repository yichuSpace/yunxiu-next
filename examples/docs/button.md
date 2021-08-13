## Button 按钮

常用的操作按钮。

### 基础用法

默认按钮，可设置`dashed`虚线和`background`拟物按钮

::: demo

```html
<template>
  <div class="demo-button" flex="cross:center">
    <yun-button>Default</yun-button>
    <yun-button dashed>Dashed</yun-button>
    <yun-button background>Background</yun-button>
  </div>
</template>
```

:::

### 不同的按钮效果

可以另外给按钮设置不同的按钮效果，如`plain`简约按钮，`round`圆角按钮，`dashed`虚线按钮和`transparent`透明按钮四种不同种类的按钮

::: demo

```html
<template>
  <yun-divider align="left">[plain]简约按钮</yun-divider>
  <div class="demo-button">
    <yun-button type="primary" plain>Primary</yun-button>
    <yun-button type="success" plain>Success</yun-button>
    <yun-button type="info" plain>Info</yun-button>
    <yun-button type="warning" plain>Warning</yun-button>
    <yun-button type="danger" plain>Danger</yun-button>
  </div>
  <yun-divider align="left">[round]圆角按钮</yun-divider>
  <div class="demo-button">
    <yun-button type="primary" round>Primary</yun-button>
    <yun-button type="success" round>Success</yun-button>
    <yun-button type="info" round>Info</yun-button>
    <yun-button type="warning" round>Warning</yun-button>
    <yun-button type="danger" round>Danger</yun-button>
  </div>
  <yun-divider align="left">[round]圆角按钮</yun-divider>
  <div class="demo-button">
    <yun-button type="primary" dashed>Primary</yun-button>
    <yun-button type="success" dashed>Success</yun-button>
    <yun-button type="info" dashed>Info</yun-button>
    <yun-button type="warning" dashed>Warning</yun-button>
    <yun-button type="danger" dashed>Danger</yun-button>
  </div>
  <yun-divider align="left">[transparent]透明按钮</yun-divider>
  <div class="demo-button" style="background: #cad4d4;padding: 10px 6px;">
    <yun-button type="primary" transparent size="small">Primary</yun-button>
    <yun-button type="success" transparent size="small">Success</yun-button>
    <yun-button type="info" transparent size="small">Info</yun-button>
    <yun-button type="warning" transparent size="small">Warning</yun-button>
    <yun-button type="danger" transparent size="small">Danger</yun-button>
  </div>
</template>
```

:::

### 不同状态

使用`type`可以设置不同状态的按钮样式

::: demo

```html
<template>
  <div class="demo-button">
    <yun-button type="primary">Primary</yun-button>
    <yun-button type="success">Success</yun-button>
    <yun-button type="info">Info</yun-button>
    <yun-button type="warning">Warning</yun-button>
    <yun-button type="danger">Danger</yun-button>
  </div>
</template>
```

:::

### 不同的按钮效果

可以另外给按钮设置不同的按钮效果，如`plain`简约按钮，`round`圆角按钮，`dashed`虚线按钮和`transparent`透明按钮四种不同种类的按钮

::: demo

```html
<template>
  <yun-divider align="left">[plain]简约按钮</yun-divider>
  <div class="demo-button">
    <yun-button type="primary" plain>Primary</yun-button>
    <yun-button type="success" plain>Success</yun-button>
    <yun-button type="info" plain>Info</yun-button>
    <yun-button type="warning" plain>Warning</yun-button>
    <yun-button type="danger" plain>Danger</yun-button>
  </div>
  <yun-divider align="left">[round]圆角按钮</yun-divider>
  <div class="demo-button">
    <yun-button type="primary" round>Primary</yun-button>
    <yun-button type="success" round>Success</yun-button>
    <yun-button type="info" round>Info</yun-button>
    <yun-button type="warning" round>Warning</yun-button>
    <yun-button type="danger" round>Danger</yun-button>
  </div>
  <yun-divider align="left">[round]圆角按钮</yun-divider>
  <div class="demo-button">
    <yun-button type="primary" dashed>Primary</yun-button>
    <yun-button type="success" dashed>Success</yun-button>
    <yun-button type="info" dashed>Info</yun-button>
    <yun-button type="warning" dashed>Warning</yun-button>
    <yun-button type="danger" dashed>Danger</yun-button>
  </div>
  <yun-divider align="left">[transparent]透明按钮</yun-divider>
  <div class="demo-button" style="background: #cad4d4;padding: 10px 6px;">
    <yun-button type="primary" transparent size="small">Primary</yun-button>
    <yun-button type="success" transparent size="small">Success</yun-button>
    <yun-button type="info" transparent size="small">Info</yun-button>
    <yun-button type="warning" transparent size="small">Warning</yun-button>
    <yun-button type="danger" transparent size="small">Danger</yun-button>
  </div>
</template>
```

:::

### 带图标的按钮

使用`icon`给按钮配置图标

::: demo

```html
<template>
  <div class="demo-button">
    <yun-button icon="search">search</yun-button>
    <yun-button icon="plus-circle">create</yun-button>
    <yun-button icon="check-circle" type="primary">check</yun-button>
    <yun-button icon="delete" type="danger">delete</yun-button>
  </div>
</template>
```

:::

### 禁用按钮

你可以使用`disabled`属性来定义按钮是否可用，它接受一个`Boolean`值。

::: demo

```html
<template>
  <div class="demo-button" flex="cross:center">
    <yun-button disabled>Default</yun-button>
    <yun-button dashed disabled>Dashed</yun-button>
    <yun-button background disabled>Background</yun-button>
  </div>
  <div class="demo-button">
    <yun-button type="primary" disabled>Primary</yun-button>
    <yun-button type="success" disabled>Success</yun-button>
    <yun-button type="info" disabled>Info</yun-button>
    <yun-button type="warning" disabled>Warning</yun-button>
    <yun-button type="danger" disabled>Danger</yun-button>
  </div>
  <div class="demo-button">
    <yun-button type="primary" plain disabled>Primary</yun-button>
    <yun-button type="success" plain disabled>Success</yun-button>
    <yun-button type="info" plain disabled>Info</yun-button>
    <yun-button type="warning" plain disabled>Warning</yun-button>
    <yun-button type="danger" plain disabled>Danger</yun-button>
  </div>
  <div class="demo-button">
    <yun-button type="primary" round disabled>Primary</yun-button>
    <yun-button type="success" round disabled>Success</yun-button>
    <yun-button type="info" round disabled>Info</yun-button>
    <yun-button type="warning" round disabled>Warning</yun-button>
    <yun-button type="danger" round disabled>Danger</yun-button>
  </div>
  <div class="demo-button">
    <yun-button type="primary" dashed disabled>Primary</yun-button>
    <yun-button type="success" dashed disabled>Success</yun-button>
    <yun-button type="info" dashed disabled>Info</yun-button>
    <yun-button type="warning" dashed disabled>Warning</yun-button>
    <yun-button type="danger" dashed disabled>Danger</yun-button>
  </div>
  <div class="demo-button" style="background: #cad4d4;padding: 10px;">
    <yun-button type="primary" transparent size="small" disabled>Primary</yun-button>
    <yun-button type="success" transparent size="small" disabled>Success</yun-button>
    <yun-button type="info" transparent size="small" disabled>Info</yun-button>
    <yun-button type="warning" transparent size="small" disabled>Warning</yun-button>
    <yun-button type="danger" transparent size="small" disabled>Danger</yun-button>
  </div>
</template>
```

:::

### 文字按钮

没有边框和背景色的按钮。

::: demo 注意，文字按钮无法使用样式变量进行覆盖，可自主设置颜色值来改变

```html
<template>
  <div class="demo-button">
    <div>
      <yun-button type="text">文字按钮</yun-button>
      <yun-button type="text" text-color="primary">Primary</yun-button>
      <yun-button type="text" text-color="success">Success</yun-button>
      <yun-button type="text" text-color="info">Info</yun-button>
      <yun-button type="text" text-color="warning">Warning</yun-button>
      <yun-button type="text" text-color="danger">Danger</yun-button>
      <yun-button type="text" text-color="#b37feb">多彩按钮</yun-button>
      <yun-button type="text" text-color="#f759ab">多彩按钮2</yun-button>
    </div>
    <div>
      <yun-button type="text" disabled>禁用按钮</yun-button>
      <yun-button type="text" text-color="primary" disabled>Primary</yun-button>
      <yun-button type="text" text-color="success" disabled>Success</yun-button>
      <yun-button type="text" text-color="info" disabled>Info</yun-button>
      <yun-button type="text" text-color="warning" disabled>Warning</yun-button>
      <yun-button type="text" text-color="danger" disabled>Danger</yun-button>
      <yun-button type="text" text-color="#f759ab" disabled>多彩按钮</yun-button>
      <yun-button type="text" text-color="#f759ab" disabled>多彩按钮2</yun-button>
    </div>
  </div>
</template>
```

:::

### 按钮组

以按钮组的方式出现，常用于多项类似操作。使用`<yun-button-group>`标签来嵌套你的按钮。

::: demo

```html
<template>
  <div class="demo-button">
    <yun-button-group>
      <yun-button type="primary" icon="left">上一页</yun-button>
      <yun-button type="primary">下一页<i class="yun-iconfont yun-icon-right"></i></yun-button>
    </yun-button-group>
    <yun-button-group>
      <yun-button>上一页</yun-button>
      <yun-button>下一页</yun-button>
    </yun-button-group>
    <yun-button-group>
      <yun-button type="success" icon="star"></yun-button>
      <yun-button type="info" icon="heatmap"></yun-button>
      <yun-button type="danger" icon="edit"></yun-button>
    </yun-button-group>
  </div>
</template>
```

:::

### 不同尺寸

Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

::: demo

```html
<template>
  <div class="demo-button">
    <yun-button size="large">Large</yun-button>
    <yun-button>Default</yun-button>
    <yun-button size="small">Small</yun-button>
    <yun-button size="mini">Mini</yun-button>
  </div>
  <div class="demo-button">
    <yun-button size="large" round>Large</yun-button>
    <yun-button round>Default</yun-button>
    <yun-button size="small" round>Small</yun-button>
    <yun-button size="mini" round>Mini</yun-button>
  </div>
</template>
```

:::

### 加载状态

可以添加加载状态

::: demo

```html
<template>
  <div class="demo-button">
    <yun-button type="primary" :loading="loading" icon="reload" @click="loading=true">Click me! </yun-button>
    <yun-button type="primary" :loading="loading" loading-icon="loading1" @click="loading=true">Click me! </yun-button>
    <yun-button type="primary" :loading="loading" loading-icon="loading2" @click="loading=true">Click me! </yun-button>
    <yun-button @click="loading=false">stop</yun-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loading: false,
      }
    },
  }
</script>
```

:::

### Props

| 参数           | 说明                                                                          | 类型    | 可选值                                                          | 默认值 |
| -------------- | ----------------------------------------------------------------------------- | ------- | --------------------------------------------------------------- | ------ |
| size           | 尺寸                                                                          | string  | large / small / mini                                            | —      |
| type           | 类型                                                                          | string  | primary / success / warning / danger / info / text              | —      |
| plain          | 是否朴素按钮                                                                  | boolean | —                                                               | false  |
| round          | 是否圆角按钮                                                                  | boolean | —                                                               | false  |
| transparent    | 是否是透明按钮                                                                | boolean | —                                                               | false  |
| background     | 默认按钮是否带有拟物背景                                                      | boolean | —                                                               | false  |
| loading        | 是否加载中状态                                                                | boolean | —                                                               | false  |
| disabled       | 是否禁用状态                                                                  | boolean | —                                                               | false  |
| icon           | 图标类名                                                                      | string  | —                                                               | —      |
| text-color     | 文字按钮颜色，默认禁用文字颜色增加亮度区分                                    | string  | primary / success / warning / danger / info / text / 自定义色值 | —      |
| icon-style     | 图标样式,可设置图标大小，字体对其等，可依托 text-color 设置颜色，也可以自定义 | Object  | —                                                               | —      |
| autofocus      | 是否默认聚焦                                                                  | boolean | —                                                               | false  |
| native-type    | 原生 type 属性                                                                | string  | button / submit / reset                                         | button |
| animation-type | 点击动画                                                                      | string  | click / waves                                                   | click  |
