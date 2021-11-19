## Collapse 折叠面板

需要进行分段显示时使用折叠面板

### 基础用法

默认可以同时展开多个面板，可以设置默认展开第几个。

:::demo

```html
<template>
  <div style="width:500px;">
    <yun-collapse v-model="value1">
      <yun-collapse-panel title="面板一标题" name="1">
        <p v-for="i in 3" :key="i">我是内容我是内容...</p>
      </yun-collapse-panel>
      <yun-collapse-panel title="面板二标题" name="2">
        <p v-for="i in 3" :key="i">我是内容我是内容...</p>
      </yun-collapse-panel>
      <yun-collapse-panel title="面板三标题" name="3">
        <p v-for="i in 3" :key="i">我是内容我是内容...</p>
      </yun-collapse-panel>
    </yun-collapse>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value1: '1',
      }
    },
  }
</script>
```

:::

### 手风琴模式

手风琴模式默认只能开启一个

:::demo

```html
<template>
  <div style="width:500px;">
    <yun-collapse v-model="value2" accordion>
      <yun-collapse-panel title="面板一标题" name="1">
        <p v-for="i in 3" :key="i">我是内容我是内容...</p>
      </yun-collapse-panel>
      <yun-collapse-panel title="面板二标题" name="2">
        <p v-for="i in 3" :key="i">我是内容我是内容...</p>
      </yun-collapse-panel>
      <yun-collapse-panel title="面板三标题" name="3">
        <p v-for="i in 3" :key="i">我是内容我是内容...</p>
      </yun-collapse-panel>
    </yun-collapse>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value2: '1',
      }
    },
  }
</script>
```

:::

### 简单模式和自定义头

simple 设置简单模式

:::demo

```html
<template>
  <div style="width:500px;">
    <yun-collapse v-model="value3" simple>
      <yun-collapse-panel name="1">
        <template #title>
          面板一标题
          <yun-icon name="smile" size="18"></yun-icon>
        </template>
        <p v-for="i in 3" :key="i">我是内容我是内容...</p>
      </yun-collapse-panel>
      <yun-collapse-panel title="面板二标题" name="2">
        <p v-for="i in 3" :key="i">我是内容我是内容...</p>
      </yun-collapse-panel>
      <yun-collapse-panel title="面板三标题" name="3">
        <p v-for="i in 3" :key="i">我是内容我是内容...</p>
      </yun-collapse-panel>
    </yun-collapse>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value3: '1',
      }
    },
  }
</script>
```

:::

### 容器组件

使用`yun-collapse-wrap`组件可以单独使用独立的折叠面板

:::demo

```html
<template>
  <div>
    <yun-collapse-wrap title="标题栏" collapse>
      <div class="p5">
        <p v-for="i in 3" :key="i">我是内容我是内容...</p>
      </div>
    </yun-collapse-wrap>
    <yun-collapse-wrap title="收起附加右侧操作" collapse>
      <template #right>
        <yun-button type="primary" plain size="small">编辑</yun-button>
      </template>
      <div class="p5">
        <p v-for="i in 3" :key="i">我是内容我是内容...</p>
      </div>
    </yun-collapse-wrap>
    <yun-collapse-wrap v-model="value4" shadow="none">
      <template #title>
        <div style="font-size: 16px;padding: 10px;">自定义开关和标题</div>
      </template>
      <template #right>
        <yun-button type="text" @click="value4=!value4">{{ value4?'收起':'展开' }}</yun-button>
      </template>
      <div class="p5">
        <p v-for="i in 3" :key="i">我是内容我是内容...</p>
      </div>
    </yun-collapse-wrap>
    <yun-collapse-wrap title="标题栏" collapse shadow="none" arrow-icon="caret-down">
      <template #title><span class="title">自定义label标题</span></template>
      <div class="p5">
        <p v-for="i in 3" :key="i">我是内容我是内容...</p>
      </div>
    </yun-collapse-wrap>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value4: false,
      }
    },
  }
</script>
```

:::

### Props

| 参数       | 说明                                             | 类型         | 可选值 | 默认值 |
| ---------- | ------------------------------------------------ | ------------ | ------ | ------ |
| modelValue | 当前激活的面板的 name，可以使用 v-model 双向绑定 | Array/String | —      | —      |
| accordion  | 是否开启手风琴模式，开启后每次至多展开一个面板   | Boolean      | —      | false  |
| simple     | 是否开启简洁模式                                 | Boolean      | —      | false  |

### Events

| 事件名 | 说明                                                   | 返回值  |
| ------ | ------------------------------------------------------ | ------- |
| change | 切换面板时触发，返回当前已展开的面板的 key，格式为数组 | Array[] |

### Slot

| 名称  | 说明       |
| ----- | ---------- |
| title | 面板头内容 |

### collapse-wrap Props

| 参数     | 说明                                 | 类型    | 可选值             | 默认值 |
| -------- | ------------------------------------ | ------- | ------------------ | ------ |
| value    | 是否展开                             | Boolean | —                  | true   |
| title    | 标题                                 | String  | —                  | —      |
| collapse | 是否可以展开收起                     | Boolean | —                  | false  |
| shadow   | shadow，设置为 none 可以开启简单模式 | String  | none/自定义 shadow | —      |

### collapse-wrap Slot

| 名称  | 说明             |
| ----- | ---------------- |
| title | 面板头内容       |
| right | 右侧插入内容区域 |
