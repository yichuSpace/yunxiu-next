## Alert 警告提示

静态的展示一些区块，提示或者警告，可以动态的去删除

### 基础用法

基础的按钮用法

::: demo

```html
<template>
  <yun-alert>info alert</yun-alert>
  <yun-alert type="success">success alert</yun-alert>
  <yun-alert type="warning">warning alert</yun-alert>
  <yun-alert type="error">error alert</yun-alert>
</template>
```

:::

### 包含描述信息

自定义`#desc`插入描述内容。

::: demo

```html
<template>
  <yun-alert
    >info alert
    <template #desc>我是描述信息...</template>
  </yun-alert>
  <yun-alert type="success"
    >success alert
    <template #desc>我是描述信息...</template>
  </yun-alert>
  <yun-alert type="warning"
    >warning alert
    <template #desc>我是描述信息...</template>
  </yun-alert>
  <yun-alert type="error"
    >error alert
    <template #desc>我是描述信息...</template>
  </yun-alert>
</template>
```

:::

### 图标

根据 `type` 属性自动添加不同图标，或者自定义图标 `slot` 。

::: demo

```html
<template>
  <yun-alert show-icon>info alert</yun-alert>
  <yun-alert type="success" show-icon>success alert</yun-alert>
  <yun-alert type="warning" show-icon>warning alert</yun-alert>
  <yun-alert type="error" show-icon
    >error alert
    <template #desc> Custom error description copywriting.</template>
  </yun-alert>
  <yun-alert show-icon>
    自定义icon
    <template #icon>
      <yun-icon name="smile"></yun-icon>
    </template>
    <template #desc>自定义icon描述</template>
  </yun-alert>
</template>
```

:::

### 可以关闭

设置属性 `banner` 可以应用顶部公告的样式。

::: demo

```html
<template>
  <yun-alert closable>An info prompt</yun-alert>
  <yun-alert type="success" show-icon closable>
    A success prompt
    <template #desc>Content of prompt. Content of prompt. Content of prompt. Content of prompt. </template>
  </yun-alert>
  <yun-alert type="warning" closable>
    Custom closing content
    <template #close>No longer prompt</template>
  </yun-alert>
</template>
```

:::

### 顶部公告样式

设置属性 `banner` 可以应用顶部公告的样式。

::: demo

```html
<template>
  <yun-alert banner>公告样式...</yun-alert>
  <yun-alert banner closable type="warning">公告样式...</yun-alert>
</template>
```

:::

### Props

| 参数      | 说明         | 类型    | 可选值                        | 默认值 |
| --------- | ------------ | ------- | ----------------------------- | ------ |
| type      | 警告提示样式 | string  | info、success、warning、error | info   |
| closable  | 是否可关闭   | boolean | —                             | false  |
| show-icon | 是否显示图标 | boolean | —                             | false  |

### Events

| 事件名 | 说明       | 返回值 |
| ------ | ---------- | ------ |
| close  | 关闭时触发 | event  |

### Slot

| 名称    | 说明                   |
| ------- | ---------------------- |
| default | 警告提示内容           |
| desc    | 警告提示辅助性文字介绍 |
| icon    | 自定义图标内容         |
| close   | 自定义关闭内容         |
