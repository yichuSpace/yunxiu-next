## Badge 徽标

用于提示当前条目数量等

### 基础用法

基础的徽标用法

::: demo

```html
<template>
  <yun-badge :value="12" class="item">
    <yun-button>普通按钮</yun-button>
  </yun-badge>
  <yun-badge :value="3" class="item">
    <yun-button>回复</yun-button>
  </yun-badge>
  <yun-badge :value="1" class="item" type="primary">
    <yun-button>primary徽标</yun-button>
  </yun-badge>
  <yun-badge :value="2" class="item" type="warning">
    <yun-button>warning徽标</yun-button>
  </yun-badge>
  <yun-badge :value="200" :max="99" class="item">
    <yun-button>最大数值</yun-button>
  </yun-badge>
</template>
```

:::

### 自定义提示内容

可以提示非数字的徽标

::: demo

```html
<template>
  <yun-badge value="hot" class="item">
    <yun-button>热点</yun-button>
  </yun-badge>
  <yun-badge value="new" class="item">
    <yun-button>回复</yun-button>
  </yun-badge>
  <yun-badge is-dot class="item">红点模式</yun-badge>
</template>
```

:::

### Props

| 参数   | 说明                              | 类型           | 可选值                                      | 默认值 |
| ------ | --------------------------------- | -------------- | ------------------------------------------- | ------ |
| value  | 显示值                            | string, number | —                                           | —      |
| max    | 最大值，超过最大值会显示 '{max}+' | number         | —                                           | —      |
| is-dot | 小圆点                            | boolean        | —                                           | false  |
| hidden | 隐藏 badge                        | boolean        | —                                           | false  |
| type   | 类型                              | string         | primary / success / warning / danger / info | —      |
