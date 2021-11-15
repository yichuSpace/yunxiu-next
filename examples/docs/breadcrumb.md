## Breadcrumb 面包屑

显示当前页面的路径，快速返回之前的任意页面或者跳转链接

### 基础用法

面包屑的用法，separator 设置分隔符 不设置 to 属性，一切都需要自行在插槽中灵活运用

::: demo

```html
<template>
  <yun-breadcrumb separator="/">
    <yun-breadcrumb-item>首页</yun-breadcrumb-item>
    <yun-breadcrumb-item>组件</yun-breadcrumb-item>
    <yun-breadcrumb-item>面包屑</yun-breadcrumb-item>
  </yun-breadcrumb>
  <yun-divider />
  <yun-breadcrumb separator="/">
    <yun-breadcrumb-item>
      <yun-dropdown>
        <a
          >Dashboard
          <yun-icon name="down"></yun-icon>
        </a>
        <template #dropdown>
          <yun-dropdown-menu>
            <yun-dropdown-item>操作台</yun-dropdown-item>
            <yun-dropdown-item>分析页</yun-dropdown-item>
          </yun-dropdown-menu>
        </template>
      </yun-dropdown>
    </yun-breadcrumb-item>
    <yun-breadcrumb-item>组件</yun-breadcrumb-item>
    <yun-breadcrumb-item>面包屑</yun-breadcrumb-item>
  </yun-breadcrumb>
</template>
```

:::

### 分隔符

可以设置分隔符

::: demo

```html
<template>
  <yun-breadcrumb separator-icon="right">
    <yun-breadcrumb-item><a href="/">首页</a></yun-breadcrumb-item>
    <yun-breadcrumb-item><a href="/">组件</a></yun-breadcrumb-item>
    <yun-breadcrumb-item>面包屑</yun-breadcrumb-item>
  </yun-breadcrumb>
  <br />
  <yun-breadcrumb separator-icon="caret-right">
    <yun-breadcrumb-item><a href="/">首页</a></yun-breadcrumb-item>
    <yun-breadcrumb-item><a href="/">组件</a></yun-breadcrumb-item>
    <yun-breadcrumb-item>面包屑</yun-breadcrumb-item>
  </yun-breadcrumb>
</template>
```

:::

### Breadcrumb Props

| 参数           | 说明            | 类型   | 可选值 | 默认值 |
| -------------- | --------------- | ------ | ------ | ------ |
| separator      | 分隔            | string | —      | '/'    |
| separator-icon | 图标分隔符 icon | string | —      | —      |
