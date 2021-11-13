## Popover 气泡弹窗

气泡类型的弹窗,用于放置更多信息或询问流程等

### 基础用法

::: demo

```html
<template>
  <div>
    <yun-popover trigger="hover" title="Title" content="这是一段内容这是一段内容这是一段内容">
      <yun-button>Hover</yun-button>
    </yun-popover>
    <yun-popover trigger="click" title="Title" content="这是一段内容这是一段内容这是一段内容">
      <yun-button>Click</yun-button>
    </yun-popover>
    <yun-popover trigger="focus" title="Title" content="这是一段内容这是一段内容这是一段内容">
      <yun-button>Focus</yun-button>
    </yun-popover>
  </div>
</template>
```

:::

### 多种悬停位置

::: demo

```html
<template>
  <div class="top">
    <yun-popover title="Title" content="Top Left text" placement="top-start">
      <yun-button>上左</yun-button>&nbsp;&nbsp;
    </yun-popover>
    <yun-popover title="Title" content="Top Center text" placement="top">
      <yun-button>上边</yun-button>&nbsp;&nbsp;
    </yun-popover>
    <yun-popover title="Title" content="Top Right text" placement="top-end">
      <yun-button>上右</yun-button>
    </yun-popover>
  </div>
  <div class="center">
    <div class="center-left">
      <yun-popover title="Title" content="Left Top text" placement="left-start">
        <yun-button>左上</yun-button>
      </yun-popover>
      <br /><br />
      <yun-popover title="Title" content="Left Center text" placement="left">
        <yun-button>左边</yun-button>
      </yun-popover>
      <br /><br />
      <yun-popover title="Title" content="Left Bottom text" placement="left-end">
        <yun-button>左下</yun-button>
      </yun-popover>
    </div>
    <div class="center-right">
      <yun-popover title="Title" content="Right Top text" placement="right-start">
        <yun-button>右上</yun-button>
      </yun-popover>
      <br /><br />
      <yun-popover title="Title" content="Right Center text" placement="right">
        <yun-button>右边</yun-button>
      </yun-popover>
      <br /><br />
      <yun-popover title="Title" content="Right Bottom text" placement="right-end">
        <yun-button>右下</yun-button>
      </yun-popover>
    </div>
  </div>
  <div class="bottom">
    <yun-popover title="Title" content="Bottom Left text" placement="bottom-start">
      <yun-button>下左</yun-button>&nbsp;&nbsp;
    </yun-popover>
    <yun-popover title="Title" content="Bottom Center text" placement="bottom">
      <yun-button>下边</yun-button>&nbsp;&nbsp;
    </yun-popover>
    <yun-popover title="Title" content="Bottom Right text" placement="bottom-end">
      <yun-button>下右</yun-button>
    </yun-popover>
  </div>
</template>
```

:::

### 浮层内关闭

::: demo

```html
<template>
  <yun-popover v-model:visible="visible">
    <yun-button type="text" @click="close">点我打开浮层</yun-button>
    <a style="margin-left: 30px;">Click</a>
    <template #content>
      <yun-button type="text" @click="close">关闭</yun-button>
    </template>
  </yun-popover>
</template>
<script>
  export default {
    data() {
      return {
        visible: false,
      }
    },
    methods: {
      close() {
        this.visible = false
      },
    },
  }
</script>
```

:::

### 更多内容

::: demo

```html
<template>
  <div>
    <yun-popover placement="top" width="200px">
      <yun-button>长文本</yun-button>
      <template #content>
        <div>这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长的描述</div>
      </template>
    </yun-popover>
    <yun-popover placement="right" width="300px">
      <yun-button>更多内容</yun-button>
      <template #content>
        <div>这是自定义内容~这是自定义内容~这是自定义内容~这是自定义内容~</div>
        <div>这是自定义内容~这是自定义内容~这是自定义内容~这是自定义内容~</div>
      </template>
    </yun-popover>
  </div>
</template>
```

:::

### 确认气泡框

通过设置属性 confirm 开启确认框模式。确认框只会以 click 的形式激活，并且只会显示 title 的内容，忽略 content。

::: demo

```html
<template>
  <div>
    <yun-popover v-model:visible="visible" :width="240">
      <yun-button type="danger" plain>确认气泡框</yun-button>
      <template #content>
        <p>
          <yun-icon name="question-circle" size="16" color="#f5222d"></yun-icon>
          Are you sure delete this item?
        </p>
        <div style="text-align: right; margin: 0">
          <yun-button size="mini" type="text" @click="cancel">取消</yun-button>
          <yun-button type="primary" size="mini" @click="ok">确定</yun-button>
        </div>
      </template>
    </yun-popover>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        visible: false,
      }
    },
    methods: {
      ok() {
        this.$message('点击了确定')
        this.visible = false
      },
      cancel() {
        this.$message('点击了取消')
        this.visible = false
      },
    },
  }
</script>
```

:::

### Props

| 参数            | 说明                                                | 类型          | 可选值                                                                                                    | 默认值                                                |
| --------------- | --------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| trigger         | 触发方式                                            | string        | hover（悬停）click（点击）focus（聚焦）                                                                   | click                                                 |
| title           | 标题                                                | string        | —                                                                                                         | —                                                     |
| content         | 显示的内容                                          | string        | —                                                                                                         | —                                                     |
| width           | 宽度                                                | string/number | —                                                                                                         | —                                                     |
| placement       | 提示框出现的位置                                    | string        | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | —                                                     |
| disabled        | 是否禁用提示框                                      | Boolean       | —                                                                                                         | false                                                 |
| v-model:visible | 状态是否可见                                        | Boolean       | —                                                                                                         | false                                                 |
| placement       | 提示框出现的位置                                    | string        | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | —                                                     |
| transition      | 自定义渐变动画                                      | string        | —                                                                                                         | fade-in-linear                                        |
| visible-arrow   | 是否显示箭头                                        | Boolean       | —                                                                                                         | true                                                  |
| popper-options  | popper.js 参数                                      | Object        | —                                                                                                         | { boundariesElement: 'body', gpuAcceleration: false } |
| show-after      | 延迟出现，单位毫秒                                  | number        | —                                                                                                         | 0                                                     |
| hide-after      | 延迟消失，单位毫秒                                  | number        | —                                                                                                         | 0                                                     |
| auto-close      | tooltip 出现后自动隐藏演示，单位毫秒，为 0 时不隐藏 | number        | —                                                                                                         | 0                                                     |
| manual          | 手动控制模式，true 时鼠标进入移出事件不生效         | Boolean       | —                                                                                                         | false                                                 |
| offset          | 出现位置的偏移量                                    | Number        | —                                                                                                         | 0                                                     |
| appendToBody    | 是否将弹层放置于 body 内                            | Boolean       | —                                                                                                         | true                                                  |
| options         | 自定义 popper.js 的配置项具体参考 popper.js         | Object        | —                                                                                                         | —                                                     |

### Slot

| 名称    | 说明                                                 |
| ------- | ---------------------------------------------------- |
| content | 提示框的内容，定义此 slot 时，会覆盖 props content。 |
