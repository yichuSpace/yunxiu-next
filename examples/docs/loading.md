## 加载进度

获取数据或加载中时显示，提示用户正在等待中。

### 基础用法

最简单的 Loading

:::demo

```html
<template>
  <div class="demo-loading">
    <yun-loading></yun-loading>
  </div>
</template>
```

:::

### 居中固定

可以在父级元素中居中固定 默认是剧中固定的，fix 设置为 false 后用于加载类似下拉加载的功能

:::demo

```html
<template>
  <div class="demo-loading">
    <div>我是后面的段落我是后面的段落我是后面的段落我是后面的段落</div>
    <yun-loading fix></yun-loading>
  </div>
</template>
```

:::

### 自定义内容

可以自定义文字和内容

:::demo

```html
<template>
  <div class="demo-loading">
    <yun-loading fix>加载中</yun-loading>
  </div>
  <div class="demo-loading">
    <yun-loading fix show-text="loading"></yun-loading>
  </div>
  <div class="demo-loading">
    <yun-loading fix show-text="loading" show-icon="loading2"></yun-loading>
  </div>
</template>
```

:::

### 切换显示状态

切换显示状态

:::demo

```html
<template>
  <div flex>
    <div>
      <p>普通使用</p>
      <div class="demo-loading">
        <div>我是后面的段落我是后面的段落我是后面的段落我是后面的段落</div>
        <yun-loading fix v-if="loading1"></yun-loading>
      </div>
      <div>
        <yun-button @click="loading1=true">加载</yun-button>
        <yun-button type="danger" @click="loading1=false">停止</yun-button>
      </div>
    </div>
    <!-- <div>
      <p>指令调用</p>
      <div class="demo-loading" v-loading:[loadingText]="loading2">
        <div>我是后面的段落我是后面的段落我是后面的段落我是后面的段落</div>
      </div>
      <div>
        <yun-button @click="loading2=true">加载</yun-button>
        <yun-button type="danger" @click="loading2=false">停止</yun-button>
      </div>
    </div> -->
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loading1: true,
        loading2: true,
        loadingText: '正在努力加载中',
      }
    },
  }
</script>
```

:::

### Props

| 参数     | 说明               | 类型    | 可选值  | 默认值 |
| -------- | ------------------ | ------- | ------- | ------ |
| showIcon | 显示加载图标       | String  | loading | —      |
| showText | 显示加载的文字     | String  | loading | —      |
| fix      | 是否固定于父级中心 | Boolean | —       | false  |
| size     | 文字显示的大小     | Number  | —       | —      |
