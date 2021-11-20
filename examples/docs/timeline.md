## Timeline 时间线

时间线组件

### 基础用法

简单定义一个时间轴的方法

::: demo

```html
<template>
  <yun-timeline>
    <yun-timeline-item>
      <p class="time">2021年7月1日</p>
      <p class="content">初始化yunxiu-next</p>
    </yun-timeline-item>
    <yun-timeline-item>
      <p class="time">2021年11月20日</p>
      <p class="content">发布1.0.0版本，新增几个基础组件</p>
    </yun-timeline-item>
  </yun-timeline>
</template>
```

:::

### 可以设置不同类型或者自定义颜色

用各种颜色来标识不同状态，可以使用 success、info、warning, danger 或自定义的颜色，默认是 primary 。

::: demo

```html
<template>
  <yun-timeline>
    <yun-timeline-item color="primary">发布1.0版本</yun-timeline-item>
    <yun-timeline-item color="info">发布1.5版本</yun-timeline-item>
    <yun-timeline-item color="warning">错误修复</yun-timeline-item>
    <yun-timeline-item color="danger">严重故障</yun-timeline-item>
    <yun-timeline-item color="success">发布2.0版本</yun-timeline-item>
    <yun-timeline-item color="#ff30b5">里程碑发布</yun-timeline-item>
  </yun-timeline>
</template>
```

:::

### 最后一个节点设置

通过添加 pending 属性来标记最后一个为节点

::: demo

```html
<template>
  <yun-timeline pending>
    <yun-timeline-item>发布1.0版本</yun-timeline-item>
    <yun-timeline-item>发布1.5版本</yun-timeline-item>
    <yun-timeline-item>发布2.0版本</yun-timeline-item>
    <yun-timeline-item>持续更新...</yun-timeline-item>
  </yun-timeline>
</template>
```

:::

### 自定义节点图标

默认是空心远点，可以自定义轴点图标

::: demo

```html
<template>
  <yun-timeline>
    <yun-timeline-item color="success" dot-top="10px">
      <template #dot>
        <yun-icon name="heart-fill" size="20"></yun-icon>
      </template>
      <span>正式版上线</span>
    </yun-timeline-item>
    <yun-timeline-item>发布2.0版本</yun-timeline-item>
    <yun-timeline-item>发布1.5版本</yun-timeline-item>
    <yun-timeline-item>发布1.0版本</yun-timeline-item>
  </yun-timeline>
</template>
```

:::

### Timeline Props

| 参数    | 说明                 | 类型    | 可选值 | 默认值 |
| ------- | -------------------- | ------- | ------ | ------ |
| pending | 指定是否最后一个节点 | Boolean | —      | false  |

### TimelineItem Props

| 参数    | 说明         | 类型   | 可选值                                               | 默认值  |
| ------- | ------------ | ------ | ---------------------------------------------------- | ------- |
| color   | 圆圈颜色     | String | primary,success,info,warning,danger,或者自定义颜色值 | primary |
| dot-top | dot 顶部偏移 | String | 自定义 dot 距离顶部的偏移量                          | —       |

### TimelineItem Slot

| 名称    | 说明               |
| ------- | ------------------ |
| default | 基本内容           |
| dot     | 自定义时间轴点内容 |
