## InputNumber 数字输入

用于输入数字

### 基础用法

::: demo

```html
<template>
  <yun-input-number :max="10" :min="1" v-model="value1"></yun-input-number>
  &nbsp;
  <yun-input-number :max="10" :min="1" v-model="value1" always></yun-input-number>
</template>
<script>
  export default {
    data() {
      return {
        value1: 1,
      }
    },
  }
</script>
```

:::

### 小数

::: demo

```html
<template>
  小数步长：
  <yun-input-number :max="10" :min="1" v-model="value2" :step="0.2"></yun-input-number>
  精度范围：
  <yun-input-number v-model="value3" :precision="2"></yun-input-number>
</template>
<script>
  export default {
    data() {
      return {
        value2: 1,
        value3: null,
      }
    },
  }
</script>
```

:::

### 可以格式化

::: demo

```html
<template>
  <div>
    <yun-input-number
      :max="10000"
      v-model="value3"
      :formatter="value => `$ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')"
      :parser="value => value.replace(/$s?|(,*)/g, '')"
    ></yun-input-number
    >&nbsp;&nbsp;
    <yun-input-number
      :max="100"
      v-model="value4"
      :formatter="value => `${value}%`"
      :parser="value => value.replace('%', '')"
    ></yun-input-number>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value3: 1,
        value4: 1,
      }
    },
  }
</script>
```

:::

### 不同尺寸

提供三种额外不同尺寸

::: demo

```html
<template>
  <div>
    <yun-input-number v-model="value5" size="mini"></yun-input-number>&nbsp;
    <yun-input-number v-model="value5" size="small"></yun-input-number>&nbsp;&nbsp;
    <yun-input-number v-model="value5"></yun-input-number>&nbsp;&nbsp;
    <yun-input-number v-model="value5" size="large"></yun-input-number>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value5: 1,
      }
    },
  }
</script>
```

:::

### 多种状态

禁用，只读和不可编辑三种状态

::: demo

```html
<template>
  <div>
    <yun-input-number v-model="value6" disabled></yun-input-number>&nbsp;&nbsp;
    <yun-input-number v-model="value6" readonly></yun-input-number>&nbsp;&nbsp;
    <yun-input-number v-model="value6" :editable="false"></yun-input-number>
  </div>
  <yun-divider></yun-divider>
  <div>
    <yun-input-number v-model="value6" disabled always></yun-input-number>&nbsp;&nbsp;
    <yun-input-number v-model="value6" readonly always></yun-input-number>&nbsp;&nbsp;
    <yun-input-number v-model="value6" :editable="false" always></yun-input-number>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value6: 1,
      }
    },
  }
</script>
```

:::

### Props

| 参数          | 说明                                                       | 类型     | 可选值                         | 默认值   |
| ------------- | ---------------------------------------------------------- | -------- | ------------------------------ | -------- |
| max           | 最大值                                                     | Number   | -                              | Infinity |
| min           | 最小值                                                     | Number   | -                              | Infinity |
| modelValue    | 当前值，可以使用 v-model 双向绑定数据                      | Number   | -                              | 1        |
| step          | 每次改变的步伐，可以是小数                                 | Number   | -                              | 1        |
| size          | 输入框尺寸                                                 | String   | large、small、default 或者不填 | -        |
| disabled      | 设置禁用状态                                               | Boolean  | -                              | false    |
| placeholder   | 占位文本                                                   | String   | -                              | -        |
| formatter     | 指定输入框展示值的格式                                     | Function | -                              | -        |
| parser        | 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用 | Function | -                              | -        |
| readonly      | 是否设置为只读                                             | Boolean  | -                              | false    |
| editable      | 是否可编辑                                                 | Boolean  |                                | true     |
| precision     | 数值精度                                                   | Number   |                                | -        |
| active-change | 是否实时响应数据                                           | Boolean  |                                | true     |
| always        | 是否始终显示控制器                                         | Boolean  | true                           | -        |

### Events

| 事件名 | 说明             | 返回值            |
| ------ | ---------------- | ----------------- |
| change | 数值改变时的回调 | 返回当前值 当前值 |
| focus  | 聚焦时触发       | event             |
| blur   | 失焦时触发       | -                 |
