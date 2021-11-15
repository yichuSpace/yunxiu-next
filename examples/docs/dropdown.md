## Dropdown 下拉菜单

### 基础用法

::: demo

```html
<template>
  <div>
    <yun-dropdown>
      <a href="javascript:void(0)">
        下拉菜单
        <yun-icon name="down"></yun-icon>
      </a>
      <template #dropdown>
        <yun-dropdown-menu>
          <yun-dropdown-item selected>驴肉火烧</yun-dropdown-item>
          <yun-dropdown-item disabled>炸酱面</yun-dropdown-item>
          <yun-dropdown-item>牛肉板面</yun-dropdown-item>
          <yun-dropdown-item divided>地锅鸡</yun-dropdown-item>
          <yun-dropdown-item>街边烧烤</yun-dropdown-item>
        </yun-dropdown-menu>
      </template>
    </yun-dropdown>

    <yun-dropdown style="margin-left: 20px;">
      <yun-button type="primary">
        下拉菜单
        <yun-icon name="down"></yun-icon>
      </yun-button>
      <template #dropdown>
        <yun-dropdown-menu>
          <yun-dropdown-item>驴肉火烧</yun-dropdown-item>
          <yun-dropdown-item disabled>炸酱面</yun-dropdown-item>
          <yun-dropdown-item>牛肉板面</yun-dropdown-item>
          <yun-dropdown-item divided>地锅鸡</yun-dropdown-item>
          <yun-dropdown-item>街边烧烤</yun-dropdown-item>
        </yun-dropdown-menu>
      </template>
    </yun-dropdown>
  </div>
</template>
```

:::

### 触发方式

::: demo

```html
<template>
  <div>
    <yun-dropdown>
      <a href="javascript:void(0)">
        hover 触发
        <yun-icon name="down"></yun-icon>
      </a>
      <template #dropdown>
        <yun-dropdown-menu>
          <yun-dropdown-item name="驴肉火烧" selected>驴肉火烧</yun-dropdown-item>
          <yun-dropdown-item name="炸酱面" disabled>炸酱面</yun-dropdown-item>
          <yun-dropdown-item name="牛肉板面">牛肉板面</yun-dropdown-item>
          <yun-dropdown-item name="地锅鸡" divided>地锅鸡</yun-dropdown-item>
          <yun-dropdown-item name="街边烧烤">街边烧烤</yun-dropdown-item>
        </yun-dropdown-menu>
      </template>
    </yun-dropdown>
    <yun-dropdown trigger="click" style="margin-left: 20px;">
      <a href="javascript:void(0)">
        click 触发
        <yun-icon name="down"></yun-icon>
      </a>
      <template #dropdown>
        <yun-dropdown-menu>
          <yun-dropdown-item selected>驴肉火烧</yun-dropdown-item>
          <yun-dropdown-item disabled>炸酱面</yun-dropdown-item>
          <yun-dropdown-item>牛肉板面</yun-dropdown-item>
          <yun-dropdown-item divided>地锅鸡</yun-dropdown-item>
          <yun-dropdown-item>街边烧烤</yun-dropdown-item>
        </yun-dropdown-menu>
      </template>
    </yun-dropdown>
    <yun-dropdown trigger="contextmenu" style="margin-left: 20px;">
      <a href="javascript:void(0)">
        右键 触发
        <yun-icon name="down"></yun-icon>
      </a>
      <template #dropdown>
        <yun-dropdown-menu>
          <yun-dropdown-item>返回</yun-dropdown-item>
          <yun-dropdown-item style="color: #ed4014;">删除</yun-dropdown-item>
        </yun-dropdown-menu>
      </template>
    </yun-dropdown>
  </div>
</template>
```

:::

### 指令事件

::: demo

```html
<template>
  <div>
    <yun-dropdown @command="handleClick">
      <a href="javascript:void(0)">
        下拉菜单
        <yun-icon name="down"></yun-icon>
      </a>
      <template #dropdown>
        <yun-dropdown-menu>
          <yun-dropdown-item name="驴肉火烧" selected>驴肉火烧</yun-dropdown-item>
          <yun-dropdown-item name="炸酱面" disabled>炸酱面</yun-dropdown-item>
          <yun-dropdown-item name="牛肉板面">牛肉板面</yun-dropdown-item>
          <yun-dropdown-item :name="['徐州美食','地锅鸡']" divided>地锅鸡</yun-dropdown-item>
          <yun-dropdown-item :name="{type:'info',name:'街边烧烤'}">街边烧烤</yun-dropdown-item>
        </yun-dropdown-menu>
      </template>
    </yun-dropdown>
  </div>
</template>
<script>
  export default {
    methods: {
      handleClick(name) {
        this.$message('click on item: ' + JSON.stringify(name))
      },
    },
  }
</script>
```

:::

### 嵌套用法

可嵌套实现级联效果，注意嵌套时候的展开方向

::: demo

```html
<template>
  <div>
    <yun-dropdown>
      <a href="javascript:void(0)">
        徐州小吃
        <yun-icon name="down"></yun-icon>
      </a>
      <template #dropdown>
        <yun-dropdown-menu>
          <yun-dropdown-item>驴肉火烧</yun-dropdown-item>
          <yun-dropdown-item>牛肉板面</yun-dropdown-item>
          <yun-dropdown placement="right-start">
            <yun-dropdown-item>
              特色菜系
              <yun-icon name="right"></yun-icon>
            </yun-dropdown-item>
            <template #dropdown>
              <yun-dropdown-menu>
                <yun-dropdown-item>地锅鸡</yun-dropdown-item>
                <yun-dropdown-item>狗肉</yun-dropdown-item>
                <yun-dropdown-item>把子肉</yun-dropdown-item>
              </yun-dropdown-menu>
            </template>
          </yun-dropdown>
          <yun-dropdown-item>过桥米线</yun-dropdown-item>
        </yun-dropdown-menu>
      </template>
    </yun-dropdown>
  </div>
</template>
```

:::

### Dropdown props

| 参数          | 说明                                                                                                                  | 类型    | 可选值                                                                                                    | 默认值 |
| ------------- | --------------------------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------- | ------ |
| trigger       | 触发方式                                                                                                              | string  | hover（悬停）click（点击）contextMenu（右键）                                                             | hover  |
| placement     | 下拉菜单出现的位置                                                                                                    | String  | top top-start top-end bottom bottom-start bottom-end left left-start left-end right right-start right-end | bottom |
| appendToBody  | 是否放置于 body 内, 在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果 | Boolean |                                                                                                           | false  |
| hide-on-click | 是否在点击菜单项后隐藏菜单                                                                                            | Boolean | -                                                                                                         | true   |
| show-timeout  | 展开下拉菜单的延时（仅在 trigger 为 hover 时有效）                                                                    | Number  | -                                                                                                         | 150    |
| hide-timeout  | 是否在点击菜单项后隐藏菜单                                                                                            | Number  | -                                                                                                         | 150    |
| tabindex      | Dropdown 组件的 tabindex                                                                                              | Number  | -                                                                                                         | 0      |

### Dropdown events

| 事件名         | 说明                   | 返回值                                               |
| -------------- | ---------------------- | ---------------------------------------------------- |
| command        | 点击菜单项时触发       | DropdownItem 的 name 值,需要设置 name 才可以统一监听 |
| visible-change | 菜单显示状态改变时调用 | visible                                              |

### Dropdown Slot

| 名称     | 说明                                    |
| -------- | --------------------------------------- |
| default  | 主体内容                                |
| dropdown | 列表内容，一般由 yun-dropdown-menu 填充 |

### Dropdown Item props

| 参数     | 说明               | 类型                   | 可选值 | 默认值 |
| -------- | ------------------ | ---------------------- | ------ | ------ |
| name     | 用来标识这一项     | Object, String, Number | -      | -      |
| disabled | 禁用该项           | Boolean                | -      | false  |
| divided  | 显示分割线         | Boolean                | -      | false  |
| selected | 标记该项为选中状态 | Boolean                | -      | false  |
| icon     | 图标               | String                 | -      | -      |
