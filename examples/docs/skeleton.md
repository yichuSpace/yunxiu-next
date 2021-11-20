## Skeleton 骨架屏

在需要等待加载内容的位置设置一个骨架屏，某些场景下比 Loading 的视觉效果更好。

### 基础用法

基础的骨架效果

::: demo

```html
<template>
  <div>
    <yun-skeleton></yun-skeleton>
  </div>
</template>
```

:::

### 更多参数

可以配置骨架屏段落数量，以便更接近真实渲染效果。显示的数量会比传入的数量多 1，首行会被渲染一个长度 33% 的段首。

::: demo

```html
<template>
  <div>
    <yun-skeleton :rows="5"></yun-skeleton>
  </div>
</template>
```

:::

### 动画效果

可以显示动画效果

::: demo

```html
<template>
  <div>
    <yun-skeleton animation></yun-skeleton>
  </div>
</template>
```

:::

### 自定义

可以使用 slot 插槽来自己设定模板，可以根据真实 dom 来构建差不多的骨架

::: demo

```html
<template>
  <yun-skeleton style="width: 240px">
    <template #template>
      <yun-skeleton-item variant="image" style="width: 240px; height: 240px;" />
      <div style="padding: 14px;">
        <yun-skeleton-item variant="p" style="width: 50%" />
        <div flex="main:justify cross:center">
          <yun-skeleton-item variant="text" style="margin-right: 16px;" />
          <yun-skeleton-item variant="text" style="width: 30%;" />
        </div>
      </div>
    </template>
  </yun-skeleton>
</template>
```

:::

### Loading 加载

loading 结束后加载真实的 ui，通过 slot 设置之后的 ui

::: demo

```html
<template>
  <div class="myun-15">
    <label style="margin-right: 16px;">切换 Loading</label>
    <yun-switch v-model="loading" />
  </div>
  <yun-skeleton style="width: 350px;" :loading="loading">
    <template #template>
      <div flex="cross:center" style="margin-bottom: 8px;">
        <yun-skeleton-item variant="circle" style="width: 36px;margin-right: 8px;" />
        <div style="width: 200px;">
          <div flex="main:justify cross:center">
            <yun-skeleton-item variant="text" style="margin-right: 16px;" />
            <yun-skeleton-item variant="text" style="width: 30%;" />
          </div>
        </div>
      </div>
      <yun-skeleton />
    </template>
    <template #default>
      <div style="width: 350px;border: 1px solid #eee;">
        <div flex="cross:center" style="margin-bottom: 8px;">
          <yun-skeleton-item variant="circle" style="width: 36px;margin-right: 8px;" />
          <div style="width: 200px;">用户信息</div>
        </div>
        <p>用户信息内容</p>
        <p>用户信息内容</p>
        <p>用户信息内容</p>
        <p>{{currentDate}}</p>
      </div>
    </template>
  </yun-skeleton>
</template>
<script>
  const dayjs = require('dayjs')

  export default {
    data() {
      return {
        loading: true,
        currentDate: dayjs().format('YYYY-MM-DD'),
      }
    },
  }
</script>
```

:::

### Skeleton Props

| 参数     | 说明                                        | 类型    | 可选值       | 默认值 |
| -------- | ------------------------------------------- | ------- | ------------ | ------ |
| animated | 是否使用动画                                | boolean | true / false | false  |
| count    | 渲染多少个 template, 建议使用尽可能小的数字 | number  | integer      | 1      |
| loading  | 是否显示真实的 DOM 结构                     | boolean | true / false | false  |
| rows     | 骨架屏段落数量                              | number  | 正整数       | 3      |
| throttle | 延迟占位 DOM 渲染的时间, 单位是毫秒         | number  | 正整数       | 0      |

### Skeleton Item Attributes

| 参数    | 说明                     | 类型         | 可选值                                                                    | 默认值 |
| ------- | ------------------------ | ------------ | ------------------------------------------------------------------------- | ------ |
| variant | 当前显示的占位元素的样式 | Enum(string) | p / text / h1 / h2 / h5 / text / caption / button / image / circle / rect | text   |

### Skeleton Slots

| name     | description          |
| -------- | -------------------- |
| default  |  用来展示真实 UI     |
| template | 用来展示自定义占位符 |
