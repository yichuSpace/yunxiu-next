## Space 间距组件

可以设置组件和不同 dom 之间的间距，用于设置相同间隔，方便使用

### 基础用法

::: demo

```html
<template>
  <yun-space>
    space
    <yun-button type="primary">Button</yun-button>
    <yun-button icon="upload">Button</yun-button>
    <yun-button type="danger">Delete</yun-button>
  </yun-space>
</template>
```

:::

### 垂直间距

::: demo

```html
<template>
  <yun-space direction="vertical">
    <yun-card width="480px" head-tip header="Card">
      <p>card content</p>
      <p>card content</p>
    </yun-card>
    <yun-card width="480px" head-tip header="Card">
      <p>card content</p>
      <p>card content</p>
    </yun-card>
  </yun-space>
</template>
```

:::

### 控制间距的大小

通过调整 `size` 的值来控制间距的大小

可供选择的内建的值有 `mini`, `small`, `medium`, `large`, 分别对应 `4px`, `8px`, `12px`, `16px`. 默认的间距大小为 `small` 也就是 `8px`

您也可以通过自定义的 `size` 来控制大小，详见下一部分
:::demo 使用 `size` 属性控制大小

```html
<template>
  <yun-space direction="vertical" alignment="start" :size="30">
    <yun-radio-group v-model="size">
      <yun-radio :label="'mini'">迷你</yun-radio>
      <yun-radio :label="'small'">小</yun-radio>
      <yun-radio :label="'default'">默认</yun-radio>
      <yun-radio :label="'large'">大号</yun-radio>
    </yun-radio-group>

    <yun-space :size="size">
      space
      <yun-button type="primary">Button</yun-button>
      <yun-button icon="upload">Button</yun-button>
      <yun-button type="danger">Delete</yun-button>
    </yun-space>
  </yun-space>
</template>

<script>
  export default {
    data() {
      return {
        size: 'default',
      }
    },
  }
</script>
```

:::

### 自定义 Size

很多时候, 内建的大小不满足设计师的要求, 我们可以通过传入自己定义的大小 (数字类型) 来设置

:::demo

```html
<template>
  <yun-slider v-model="size" />
  <yun-space wrap :size="size">
    <yun-card class="box-card" style="width: 250px" v-for="i in 2" :key="i">
      <template #header>
        <div class="card-header">
          <span>Card name</span>
          <yun-button class="button" type="text">Operation button</yun-button>
        </div>
      </template>
      <div v-for="o in 4" :key="o" class="text item">
        {{ 'List item ' + o }}
      </div>
    </yun-card>
  </yun-space>
</template>

<script>
  export default {
    data() {
      return {
        size: 20,
      }
    },
  }
</script>
```

:::

### 自动换行

在水平 (horizontal)模式下,通过控制 `wrap` (布尔类型)来控制是否自动换行

:::demo 利用 `wrap` 控制换行

```html
<yun-space wrap>
  <div v-for="i in 20" :key="i">
    <yun-button type="text">文字按钮</yun-button>
  </div>
</yun-space>
```

:::

### 行间分隔符

有时候, 仅仅在行间加空白, 并不能满足我们的日常需求, 此时分隔符 (spacer) 就可以发挥非常好的作用了.

:::demo 字符串 或 数字类型的分隔符

```html
<template>
  <yun-space :size="size" spacer="|">
    <div v-for="i in 2" :key="i">
      <yun-button>button {{ i }}</yun-button>
    </div>
  </yun-space>
  <yun-space :size="size" :spacer="spacer">
    <div v-for="i in 2" :key="i">
      <yun-button>button {{ i }}</yun-button>
    </div>
  </yun-space>
</template>

<script>
  import { h } from 'vue'

  export default {
    data() {
      return {
        size: 10,
        spacer: h('span', { style: { color: '#999' } }, '|'),
      }
    },
  }
</script>
```

:::

### 对齐方式

设置该值可以调整所有子节点在容器内的对齐方式, 可设置的值与 [align-items](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items) 一致

:::demo 用 alignment 来控制对齐

```html
<template>
  <yun-space>
    <div style="width: 240px;margin-bottom: 20px;padding: 8px;border: 1px solid #ccc;">
      <yun-space>
        string
        <yun-button>
          button
        </yun-button>
        <yun-card>
          <template #header>
            header
          </template>
          body
        </yun-card>
      </yun-space>
    </div>
    <div style="width: 240px;margin-bottom: 20px;padding: 8px;border: 1px solid #ccc;">
      <yun-space alignment="flex-start">
        string
        <yun-button>
          button
        </yun-button>
        <yun-card>
          <template #header>
            header
          </template>
          body
        </yun-card>
      </yun-space>
    </div>
    <div style="width: 240px;margin-bottom: 20px;padding: 8px;border: 1px solid #ccc;">
      <yun-space alignment="flex-end">
        string
        <yun-button>
          button
        </yun-button>
        <yun-card>
          <template #header>
            header
          </template>
          body
        </yun-card>
      </yun-space>
    </div>
  </yun-space>
</template>
```

:::

### Space Props

| 参数      | 说明                      | 类型                                      | 可选值              | 默认值     |
| --------- | ------------------------- | ----------------------------------------- | ------------------- | ---------- |
| alignment | 对齐的方式                | string                                    | -                   | 'center'   |
| class     | 类名                      | string / Array<Object \| String> / Object | -                   | -          |
| direction | 排列的方向                | string                                    | vertical/horizontal | horizontal |
| prefixCls | 给 space-items 的类名前缀 | string                                    | bin-space           | -          |
| style     | 额外样式                  | string / Array<Object \| String> / Object | -                   | -          |
| spacer    | 间隔符                    | string / number / VNode                   | -                   | -          |
| size      | 间隔大小                  | string / number / [number, number]        | -                   | 'small'    |
| wrap      | 设置是否自动折行          | boolean                                   | true / false        | false      |

### Space Slot

| name    | 说明               |
| ------- | ------------------ |
| default | 需要添加间隔的元素 |
