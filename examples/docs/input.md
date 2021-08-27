## Input 输入框

基本表单组件，支持 input 和 textarea

### 基础用法

::: demo

```html
<template>
  <div>
    <div style="margin-bottom: 10px;">输入的内容：{{value}}</div>
    <yun-input v-model="value" placeholder="请输入一些文字..." class="input-item"></yun-input>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: '',
      }
    },
  }
</script>
```

:::

### 图标和清空

设置 `clearable` 可以开启清空按钮,icon 设置 icon 图标名称

::: demo

```html
<template>
  <div>
    <yun-input v-model="value" icon="eye-fill" class="input-item"></yun-input>
    <yun-input v-model="value1" clearable class="input-item"></yun-input>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: '',
        value1: '我可以被清空',
      }
    },
  }
</script>
```

:::

### 组合使用

提供两种方式来进行插入图标

::: demo

```html
<template>
  <p>Props：</p>
  <div>
    <yun-input prefix="bulyun-fill" clearable placeholder="Enter name" style="width: auto"></yun-input>
    &nbsp;
    <yun-input suffix="search" clearable placeholder="Enter text" style="width: auto"></yun-input>
  </div>
  <p>Slots：</p>
  <div style="margin-top: 6px">
    <yun-input placeholder="Enter name" style="width: auto">
      <template #prefix>
        <yun-icon name="bulyun-fill"></yun-icon>
      </template>
    </yun-input>
    &nbsp;
    <yun-input placeholder="Enter text" clearable style="width: auto">
      <template #suffix>
        <yun-icon name="search"></yun-icon>
      </template>
    </yun-input>
  </div>
  <p>prepend/append：</p>
  <div style="margin-top: 6px">
    <yun-input placeholder="Enter text" style="width: auto" clearable>
      <template #prepend>
        <yun-button>prepend</yun-button>
      </template>
    </yun-input>
    &nbsp;
    <yun-input placeholder="Enter name" style="width: auto" clearable>
      <template #append>
        <yun-button>append</yun-button>
      </template>
    </yun-input>
    &nbsp;
    <yun-input placeholder="Enter name" style="width: auto" clearable>
      <template #prepend>
        <yun-select v-model="type" clearable style="width: 100px;">
          <yun-option lable="email" value="email"></yun-option>
          <yun-option lable="phone" value="phone"></yun-option>
        </yun-select>
      </template>
      <template #append>
        <yun-button>append</yun-button>
      </template>
    </yun-input>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        type: '',
      }
    },
  }
</script>
```

:::

### 设置 search

可以设置查询和禁用状态

::: demo

```html
<template>
  <div>
    <yun-input search placeholder="Enter something..." class="input-item"></yun-input>
    <yun-input disabled placeholder="Enter something..." class="input-item"></yun-input>
  </div>
</template>
```

:::

### 密码框

输入密码的时候默认需要隐藏显示，这里会开启图标提示

::: demo

```html
<template>
  <div>
    <yun-input v-model="value" show-password-toggle type="password" class="input-item"></yun-input>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: '',
      }
    },
  }
</script>
```

:::

### 不同尺寸

提供额外 3 种尺寸进行配置 `large` `small` 或 `mini`三种尺寸

::: demo

```html
<template>
  <yun-row :gutter="10">
    <yun-col span="6">
      <yun-input size="large" clearable placeholder="large input"></yun-input>
    </yun-col>
    <yun-col span="6">
      <yun-input clearable placeholder="default input"></yun-input>
    </yun-col>
    <yun-col span="6">
      <yun-input size="small" clearable placeholder="small input"></yun-input>
    </yun-col>
    <yun-col span="6">
      <yun-input size="mini" clearable placeholder="mini input"></yun-input>
    </yun-col>
  </yun-row>
</template>
```

:::

### 设置 textarea

可以设置 `type="textarea"`开启文本域模式

::: demo

```html
<template>
  <div flex="box:mean">
    <div class="input-item">
      <yun-input
        type="textarea"
        :autosize="{minRows:2,maxRows:6}"
        placeholder="自动大小，可拖动，最大行数6"
      ></yun-input>
    </div>
    <div class="input-item">
      <yun-input type="textarea" :rows="4" placeholder="禁用拖动，默认4行" no-resize></yun-input>
    </div>
  </div>
</template>
```

:::

### 字数统计

可以设置 `show-word-count`开启字数统计

::: demo

```html
<template>
  <div flex="box:mean">
    <div class="input-item">
      <yun-input :maxlength="10" show-word-count></yun-input>
    </div>
    <div class="input-item">
      <yun-input type="textarea" :rows="2" no-resize show-word-count></yun-input>
    </div>
  </div>
</template>
```

:::

### Props

| 参数            | 说明                                                                                | 类型                        | 可选值                                                  | 默认值  |
| --------------- | ----------------------------------------------------------------------------------- | --------------------------- | ------------------------------------------------------- | ------- |
| type            | 输入框类型                                                                          | string                      | text、password、textarea、url、email、date、number、tel | —       |
| value           | 绑定的值，可使用 v-model 双向绑定                                                   | String / Number             | —                                                       | —       |
| size            | 输入框尺寸                                                                          | large、small、default、mini | —                                                       | default |
| placeholder     | 占位文本                                                                            | String                      | —                                                       | —       |
| clearable       | 是否显示清空按钮                                                                    | Boolean                     | —                                                       | false   |
| disabled        | 禁用状态                                                                            | Boolean                     | —                                                       | false   |
| readonly        | 只读模式                                                                            | Boolean                     | —                                                       | false   |
| maxlength       | 最大输入长度                                                                        | Number                      | —                                                       | —       |
| icon            | 输入框尾部图标，仅在 text 类型下有效                                                | String                      | —                                                       | —       |
| prefix          | 输入框头部图标                                                                      | String                      | —                                                       | —       |
| suffix          | 输入框尾部图标                                                                      | String                      | —                                                       | —       |
| search          | 是否显示为搜索型输入框                                                              | Boolean                     | —                                                       | false   |
| rows            | 文本域默认行数，仅在 textarea 类型下有效                                            | Number                      | —                                                       | 2       |
| autosize        | 自适应内容高度，仅在 textarea 类型下有效，可传入对象，如 { minRows: 2, maxRows: 6 } | Boolean/Object              | —                                                       | false   |
| number          | 将用户的输入转换为 Number 类型                                                      | Boolean                     | —                                                       | false   |
| autofocus       | 自动获取焦点                                                                        | Boolean                     | —                                                       | false   |
| autocomplete    | 原生的自动完成功能，可选值为 off 和 on                                              | String                      | —                                                       | off     |
| element-id      | 给表单元素设置 id，详见 Form 用法。                                                 | String                      | —                                                       | —       |
| wrap            | 原生的 wrap 属性，可选值为 hard 和 soft，仅在 textarea 下生效                       | String                      | —                                                       | soft    |
| no-resize       | 禁用文本域 resize ，仅在 textarea 下生效                                            | Boolean                     | —                                                       | false   |
| show-word-count | 显示文本字数统计，仅在 textarea 下生效                                              | Boolean                     | —                                                       | false   |
| validateEvent   | 是否触发校验，主要为 form 表单使用，选择框等也使用到 input 的内部设置为 false       | Boolean                     | —                                                       | true    |

### Input events

| 方法名   | 说明                                           | 返回值 |
| -------- | ---------------------------------------------- | ------ |
| enter    | 按下回车键时触发                               | 无     |
| click    | 设置 icon 属性后，点击图标时触发               | 无     |
| change   | 数据改变时触发                                 | event  |
| focus    | 输入框聚焦时触发                               | 无     |
| blur     | 输入框失去焦点时触发                           | 无     |
| keyup    | 原生的 keyup 事件                              | event  |
| keydown  | 原生的 keydown 事件                            | event  |
| keypress | 原生的 keypress 事件                           | event  |
| search   | 开启 search 时可用，点击搜索或按下回车键时触发 | value  |
| clear    | 开启 clearable 时可用，点击清空按钮时触发      | 无     |

### Input slot

| 名称    | 说明                           |
| ------- | ------------------------------ |
| prepend | 前置内容，仅在 text 类型下有效 |
| append  | 后置内容，仅在 text 类型下有效 |
| prefix  | 输入框头部图标                 |
| suffix  | 输入框尾部图标                 |

### Input methods

| 方法名 | 说明           | 返回值 |
| ------ | -------------- | ------ |
| focus  | 手动聚焦输入框 | 无     |
