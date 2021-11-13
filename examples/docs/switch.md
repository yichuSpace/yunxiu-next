## Switch 开关

在两种状态间切换时用到的开关选择器。

### 基础用法

::: demo

```html
<template>
  <yun-switch v-model="switch1" @change="change"></yun-switch>
</template>
<script>
  export default {
    data() {
      return {
        switch1: false,
      }
    },
    methods: {
      change(status) {
        this.$message('开关状态：' + status)
      },
    },
  }
</script>
```

:::

### 大小及颜色

::: demo

```html
<template>
  <yun-switch size="large"></yun-switch>&nbsp; <yun-switch></yun-switch>&nbsp;
  <yun-switch size="small"></yun-switch>&nbsp;
  <yun-switch active-color="#13ce66" inactive-color="#ff4949"></yun-switch>
</template>
```

:::

### 文字或图标

::: demo

```html
<template>
  <yun-switch>
    <template #open><span>开</span></template>
    <template #close><span>关</span></template> </yun-switch
  >&nbsp;
  <yun-switch>
    <template #open>
      <yun-icon name="check"></yun-icon>
    </template>
    <template #close>
      <yun-icon name="close"></yun-icon>
    </template>
  </yun-switch>
  <br /><br />
  <yun-switch size="large">
    <template #open><span>开启</span></template>
    <template #close><span>关闭</span></template> </yun-switch
  >&nbsp;
  <yun-switch size="large">
    <template #open><span>ON</span></template>
    <template #close><span>OFF</span></template>
  </yun-switch>
</template>
```

:::

### 禁用

::: demo

```html
<template>
  <yun-switch v-model="value1" disabled size="large"></yun-switch>&nbsp;
  <yun-switch v-model="value1" disabled></yun-switch>&nbsp;
  <yun-switch v-model="value1" disabled size="small"></yun-switch>&nbsp;
  <yun-switch v-model="value2" disabled size="large"></yun-switch>&nbsp;
  <yun-switch v-model="value2" disabled></yun-switch>&nbsp;
  <yun-switch v-model="value2" disabled size="small"></yun-switch>&nbsp;
</template>
<script>
  export default {
    data() {
      return {
        value1: true,
        value2: false,
      }
    },
  }
</script>
```

:::

### loading

::: demo

```html
<template>
  <yun-switch v-model="value1" loading size="large"></yun-switch>&nbsp;
  <yun-switch v-model="value1" loading></yun-switch>&nbsp;
  <yun-switch v-model="value1" loading size="small"></yun-switch>&nbsp;
  <yun-switch v-model="value2" loading size="large"></yun-switch>&nbsp;
  <yun-switch v-model="value2" loading></yun-switch>&nbsp;
  <yun-switch v-model="value2" loading size="small"></yun-switch>&nbsp;
</template>
<script>
  export default {
    data() {
      return {
        value1: true,
        value2: false,
      }
    },
  }
</script>
```

:::

### 切换前拦截

可以通过设置`confirm`来设置切换前拦截，并通过`confirm-txt`来自定义切换文字提示。

::: demo

```html
<template>
  <yun-switch confirm></yun-switch>
</template>
```

:::

### 阻止切换

可以配合 loading 和 confirm 一级 before-change 函数 props 来配合实现阻止切换

::: demo

```html
<template>
  <yun-switch confirm v-model="value1" :loading="loading1" :before-change="beforeChange1"></yun-switch>
  &nbsp;
  <yun-switch confirm v-model="value2" :loading="loading2" :before-change="beforeChange2"></yun-switch>
</template>
<script>
  import { reactive, toRefs } from 'vue'

  export default {
    setup() {
      const status1 = reactive({
        value1: false,
        loading1: false,
      })
      const beforeChange1 = () => {
        status1.loading1 = true
        return new Promise(resolve => {
          setTimeout(() => {
            status1.loading1 = false
            return resolve(true)
          }, 1000)
        })
      }
      const status2 = reactive({
        value2: false,
        loading2: false,
      })

      const beforeChange2 = () => {
        status2.loading2 = true
        return new Promise((_, reject) => {
          setTimeout(() => {
            status2.loading2 = false
            return reject(new Error('调用出错！'))
          }, 1000)
        })
      }
      return {
        ...toRefs(status1),
        ...toRefs(status2),
        beforeChange1,
        beforeChange2,
      }
    },
  }
</script>
```

:::

### Props

| 参数           | 说明                                                        | 类型                    | 可选值                | 默认值  |
| -------------- | ----------------------------------------------------------- | ----------------------- | --------------------- | ------- |
| modelValue     | 指定当前是否选中，可以使用 v-model 双向绑定数据             | Boolean                 | —                     | false   |
| size           | 开关的尺寸。建议开关如果使用了 2 个汉字的文字，使用 large。 | String                  | large、small、default | default |
| disabled       | 禁用开关                                                    | Boolean                 | —                     | false   |
| true-value     | 选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用      | String, Number, Boolean | —                     | true    |
| false-value    | 没有选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用  | String, Number, Boolean | —                     | false   |
| active-color   | switch 打开时的背景色                                       | string                  | —                     | —       |
| inactive-color | switch 关闭时的背景色                                       | string                  | —                     | —       |
| confirm        | 开启切换前拦截功能                                          | Boolean                 | —                     | false   |
| confirm-txt    | 切换拦截文字                                                | string                  | —                     | —       |
| loading        | 加载中状态                                                  | Boolean                 | —                     | —       |
| beforeChange   | 改变状态前拦截函数，return type Promise or boolean          | Function                | —                     | —       |

### Events

| 事件名 | 说明                           | 返回值      |
| ------ | ------------------------------ | ----------- |
| change | 开关变化时触发，返回当前的状态 | true、false |

### Slot

| 事件名 | 说明                   |
| ------ | ---------------------- |
| open   | 自定义显示打开时的内容 |
| close  | 自定义显示关闭时的内容 |
