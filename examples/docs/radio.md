## Radio 单选框

基本组件-单选框。主要用于一组可选项单项选择，或者单独用于切换到选中状态。

### 基础用法

::: demo

```html
<template>
  <yun-radio v-model="single">Radio</yun-radio>
  <span style="color:#ff4511;">{{single}}</span>
</template>
<script>
  export default {
    data() {
      return {
        single: false,
      }
    },
  }
</script>
```

:::

### 组合使用

::: demo

```html
<template>
  <yun-radio-group v-model="social">
    <yun-radio label="twitter">
      <span>Twitter</span>
    </yun-radio>
    <yun-radio label="facebook">
      <span>Facebook</span>
    </yun-radio>
    <yun-radio label="github">
      <span>Github</span>
    </yun-radio>
    <yun-radio label="snapchat">
      <span>Snapchat</span>
    </yun-radio>
  </yun-radio-group>
  <p style="color:#ff4511;margin: 5px 0;">{{social}}</p>
  <yun-radio-group v-model="fruit">
    <yun-radio label="香蕉"></yun-radio>
    <yun-radio label="苹果"></yun-radio>
    <yun-radio label="西瓜"></yun-radio>
  </yun-radio-group>
  <p style="color:#ff4511;margin: 5px 0;">{{fruit}}</p>
</template>
<script>
  export default {
    data() {
      return {
        social: 'facebook',
        fruit: '苹果',
      }
    },
  }
</script>
```

:::

### 禁用

::: demo

```html
<template>
  <yun-radio v-model="disabledSingle" disabled>Checkbox</yun-radio>
  <yun-radio-group v-model="disabledGroup">
    <yun-radio label="香蕉" disabled></yun-radio>
    <yun-radio label="苹果" disabled></yun-radio>
    <yun-radio label="西瓜"></yun-radio>
  </yun-radio-group>
</template>
<script>
  export default {
    data() {
      return {
        disabledSingle: true,
        disabledGroup: '苹果',
      }
    },
  }
</script>
```

:::

### 按钮模式

::: demo

```html
<template>
  <div flex>
    <div>
      <yun-radio-group v-model="fruit" type="button">
        <yun-radio label="香蕉"></yun-radio>
        <yun-radio label="苹果"></yun-radio>
        <yun-radio label="西瓜"></yun-radio>
      </yun-radio-group>
      <br />
      <yun-radio-group v-model="fruit" type="button" size="small">
        <yun-radio label="香蕉"></yun-radio>
        <yun-radio label="苹果"></yun-radio>
        <yun-radio label="西瓜"></yun-radio>
      </yun-radio-group>
      <br />
      <yun-radio-group v-model="fruit" type="button" size="mini">
        <yun-radio label="香蕉"></yun-radio>
        <yun-radio label="苹果"></yun-radio>
        <yun-radio label="西瓜"></yun-radio>
      </yun-radio-group>
    </div>
    <div style="margin-left: 24px;">
      <yun-radio-group v-model="fruit" type="button">
        <yun-radio label="香蕉" disabled></yun-radio>
        <yun-radio label="苹果"></yun-radio>
        <yun-radio label="西瓜"></yun-radio>
      </yun-radio-group>
      <br />
      <yun-radio-group v-model="fruit" type="button" disabled>
        <yun-radio label="香蕉" disabled></yun-radio>
        <yun-radio label="苹果"></yun-radio>
        <yun-radio label="西瓜"></yun-radio>
      </yun-radio-group>
    </div>
  </div>

  <span style="color:#ff4511;margin: 5px 0;">{{fruit}}</span>
</template>
<script>
  export default {
    data() {
      return {
        fruit: '',
      }
    },
  }
</script>
```

:::

### Props

| 参数     | 说明                                                            | 类型                  | 可选值 | 默认值 |
| -------- | --------------------------------------------------------------- | --------------------- | ------ | ------ |
| value    | 只在单独使用时有效。可以使用 v-model 双向绑定数据               | Boolean               | —      | false  |
| label    | 组合使用时有效。指定当前选项的 value 值，组合会自动判断是否选中 | String/Number/Boolean | —      | —      |
| disabled | 是否禁用当前项                                                  | Boolean               | —      | false  |

### Radio events

| 事件名 | 说明                                                                     | 返回值 |
| ------ | ------------------------------------------------------------------------ | ------ |
| change | 在选项状态发生改变时触发，返回当前状态。通过修改外部的数据改变时不会触发 | ...    |

### RadioGroup props

| 参数     | 说明                                              | 类型           | 可选值                | 默认值 |
| -------- | ------------------------------------------------- | -------------- | --------------------- | ------ |
| value    | 指定选中项目的集合，可以使用 v-model 双向绑定数据 | String/ Number | —                     | ''     |
| disabled | 是否禁用所有选项                                  | Boolean        | —                     | false  |
| type     | 是否开启 button 模式                              | String         | button                | false  |
| size     | 按钮模式单选组的尺寸                              | String         | large、small、default | —      |

### RadioGroup events

| 事件名 | 说明                                                                         | 返回值 |
| ------ | ---------------------------------------------------------------------------- | ------ |
| change | 在选项状态发生改变时触发，返回已选中的数组。通过修改外部的数据改变时不会触发 | ...    |
