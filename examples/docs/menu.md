## Menu 导航菜单

为网站提供导航功能的菜单。

### 顶栏

导航菜单默认为垂直模式，通过`mode`属性可以使导航菜单变更为水平模式。另外，在菜单中通过`submenu`组件可以生成二级菜单。Menu 还提供了`background-color`、`text-color`
和`active-text-color`，分别用于设置菜单的背景色、菜单的文字颜色和当前激活菜单的文字颜色

:::demo

```html
<yun-menu :default-active="activeIndex" class="yun-menu-demo" mode="horizontal" @select="handleSelect">
  <yun-menu-item index="1">处理中心</yun-menu-item>
  <yun-submenu index="2">
    <template #title>我的工作台</template>
    <yun-menu-item index="2-1">选项1</yun-menu-item>
    <yun-menu-item index="2-2">选项2</yun-menu-item>
    <yun-menu-item index="2-3">选项3</yun-menu-item>
    <yun-submenu index="2-4">
      <template #title>选项4</template>
      <yun-menu-item index="2-4-1">选项1</yun-menu-item>
      <yun-menu-item index="2-4-2">选项2</yun-menu-item>
      <yun-menu-item index="2-4-3">选项3</yun-menu-item>
    </yun-submenu>
  </yun-submenu>
  <yun-menu-item index="3" disabled>消息中心</yun-menu-item>
  <yun-menu-item index="4">
    <a href="https://wangbin3162.gitee.io/bin-ui-next/" target="_blank">文档外链</a>
  </yun-menu-item>
</yun-menu>
<yun-divider />
<yun-menu
  :default-active="activeIndex2"
  class="yun-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#001529"
  text-color="#fff"
  active-text-color="#ffd04b"
>
  <yun-menu-item index="1">处理中心</yun-menu-item>
  <yun-submenu index="2">
    <template #title>我的工作台</template>
    <yun-menu-item index="2-1">选项1</yun-menu-item>
    <yun-menu-item index="2-2">选项2</yun-menu-item>
    <yun-menu-item index="2-3">选项3</yun-menu-item>
    <yun-submenu index="2-4">
      <template #title>选项4</template>
      <yun-menu-item index="2-4-1">选项1</yun-menu-item>
      <yun-menu-item index="2-4-2">选项2</yun-menu-item>
      <yun-menu-item index="2-4-3">选项3</yun-menu-item>
    </yun-submenu>
  </yun-submenu>
  <yun-menu-item index="3" disabled>消息中心</yun-menu-item>
  <yun-menu-item index="4">
    <a href="" target="_blank">文档外链</a>
  </yun-menu-item>
</yun-menu>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
      },
    },
  }
</script>
```

:::

### 侧栏

垂直菜单，可内嵌子菜单。

:::demo 通过`yun-menu-item-group`组件可以实现菜单进行分组，分组名可以通过`title`属性直接设定，也可以通过具名 slot 来设定。

```html
<yun-row class="tac">
  <yun-col :span="12">
    <h5 style="margin-bottom: 10px;">默认颜色</h5>
    <yun-menu default-active="2" class="yun-menu-vertical-demo border" @open="handleOpen" @close="handleClose">
      <yun-submenu index="1">
        <template #title>
          <yun-icon name="location-fill"></yun-icon>
          <span>导航一</span>
        </template>
        <yun-menu-item-group>
          <template #title>分组一</template>
          <yun-menu-item index="1-1">选项1</yun-menu-item>
          <yun-menu-item index="1-2">选项2</yun-menu-item>
        </yun-menu-item-group>
        <yun-menu-item-group title="分组2">
          <yun-menu-item index="1-3">选项3</yun-menu-item>
        </yun-menu-item-group>
        <yun-submenu index="1-4">
          <template #title>选项4</template>
          <yun-menu-item index="1-4-1">选项1</yun-menu-item>
        </yun-submenu>
      </yun-submenu>
      <yun-menu-item index="2">
        <yun-icon name="appstore-fill"></yun-icon>
        <template #title>导航二</template>
      </yun-menu-item>
      <yun-menu-item index="3" disabled>
        <yun-icon name="file-text"></yun-icon>
        <template #title>导航三</template>
      </yun-menu-item>
      <yun-menu-item index="4">
        <yun-icon name="setting-fill"></yun-icon>
        <template #title>导航四</template>
      </yun-menu-item>
    </yun-menu>
  </yun-col>
  <yun-col :span="12">
    <h5 style="margin-bottom: 10px;">自定义颜色</h5>
    <yun-menu
      :uniqueOpened="true"
      default-active="2"
      class="yun-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#495662"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <yun-submenu index="1">
        <template #title>
          <yun-icon name="location-fill"></yun-icon>
          <span>导航一</span>
        </template>
        <yun-menu-item-group>
          <template #title>分组一</template>
          <yun-menu-item index="1-1">选项1</yun-menu-item>
          <yun-menu-item index="1-2">选项2</yun-menu-item>
        </yun-menu-item-group>
        <yun-menu-item-group title="分组2">
          <yun-menu-item index="1-3">选项3</yun-menu-item>
        </yun-menu-item-group>
        <yun-submenu index="1-4">
          <template #title>选项4</template>
          <yun-menu-item index="1-4-1">选项1</yun-menu-item>
        </yun-submenu>
      </yun-submenu>
      <yun-menu-item index="2">
        <yun-icon name="appstore-fill"></yun-icon>
        <template #title>导航二</template>
      </yun-menu-item>
      <yun-menu-item index="3" disabled>
        <yun-icon name="file-text"></yun-icon>
        <template #title>导航三</template>
      </yun-menu-item>
      <yun-menu-item index="4">
        <yun-icon name="setting-fill"></yun-icon>
        <template #title>导航四</template>
      </yun-menu-item>
    </yun-menu>
  </yun-col>
</yun-row>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      },
    },
  }
</script>
```

:::

### 折叠

:::demo

```html
<yun-button-group v-model="isCollapse" style="margin-bottom: 20px;">
  <yun-button :type="isCollapse?'default':'primary'" @click="isCollapse = false">展开</yun-button>
  <yun-button :type="isCollapse?'primary':'default'" @click="isCollapse = true">收起</yun-button>
</yun-button-group>
<yun-menu
  default-active="1-4-1"
  class="yun-menu-vertical-demo border"
  @open="handleOpen"
  @close="handleClose"
  :collapse="isCollapse"
>
  <yun-submenu index="1">
    <template #title>
      <yun-icon name="location-fill"></yun-icon>
      <span>导航一</span>
    </template>
    <yun-menu-item-group>
      <template #title>分组一</template>
      <yun-menu-item index="1-1">选项1</yun-menu-item>
      <yun-menu-item index="1-2">选项2</yun-menu-item>
    </yun-menu-item-group>
    <yun-menu-item-group title="分组2">
      <yun-menu-item index="1-3">选项3</yun-menu-item>
    </yun-menu-item-group>
    <yun-submenu index="1-4">
      <template #title>选项4</template>
      <yun-menu-item index="1-4-1">选项1</yun-menu-item>
    </yun-submenu>
  </yun-submenu>
  <yun-menu-item index="2">
    <yun-icon name="appstore-fill"></yun-icon>
    <template #title>导航二</template>
  </yun-menu-item>
  <yun-menu-item index="3" disabled>
    <yun-icon name="file-text"></yun-icon>
    <template #title>导航三</template>
  </yun-menu-item>
  <yun-menu-item index="4">
    <yun-icon name="setting-fill"></yun-icon>
    <template #title>导航四</template>
  </yun-menu-item>
</yun-menu>

<script>
  export default {
    data() {
      return {
        isCollapse: true,
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      },
    },
  }
</script>
```

:::

### Menu Props

| 参数                | 说明                                                                                | 类型    | 可选值                | 默认值          |
| ------------------- | ----------------------------------------------------------------------------------- | ------- | --------------------- | --------------- |
| mode                | 模式                                                                                | string  | horizontal / vertical | vertical        |
| collapse            | 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）                                | boolean | —                     | false           |
| background-color    | 菜单的背景色（仅支持 hex 格式）                                                     | string  | —                     | #ffffff         |
| text-color          | 菜单的文字颜色（仅支持 hex 格式）                                                   | string  | —                     | rgba(0,0,0,.65) |
| active-text-color   | 当前激活菜单的文字颜色（仅支持 hex 格式）                                           | string  | —                     | #1089ff         |
| default-active      | 当前激活菜单的 index                                                                | string  | —                     | —               |
| default-openeds     | 当前打开的 suyun-menu 的 index 的数组                                               | Array   | —                     | —               |
| unique-opened       | 是否只保持一个子菜单的展开                                                          | boolean | —                     | false           |
| menu-trigger        | 子菜单打开的触发方式(只在 mode 为 horizontal 时有效)                                | string  | hover / click         | hover           |
| router              | 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 | boolean | —                     | false           |
| collapse-transition | 是否开启折叠动画                                                                    | boolean | —                     | true            |

### Menu Methods

| 方法名称 | 说明                  | 参数                                  |
| -------- | --------------------- | ------------------------------------- |
| open     | 展开指定的 suyun-menu | index: 需要打开的 suyun-menu 的 index |
| close    | 收起指定的 suyun-menu | index: 需要收起的 suyun-menu 的 index |

### Menu Events

| 事件名称 | 说明                  | 回调参数                                                                       |
| -------- | --------------------- | ------------------------------------------------------------------------------ |
| select   | 菜单激活回调          | index: 选中菜单项的 index, indexPath: 选中菜单项的 index path                  |
| open     | suyun-menu 展开的回调 | index: 打开的 suyun-menu 的 index， indexPath: 打开的 suyun-menu 的 index path |
| close    | suyun-menu 收起的回调 | index: 收起的 suyun-menu 的 index， indexPath: 收起的 suyun-menu 的 index path |

### SubMenu Props

| 参数                  | 说明                                                                     | 类型        | 可选值 | 默认值                                 |
| --------------------- | ------------------------------------------------------------------------ | ----------- | ------ | -------------------------------------- |
| index                 | 唯一标志                                                                 | string/null | —      | null                                   |
| popper-class          | 弹出菜单的自定义类名                                                     | string      | —      | —                                      |
| show-timeout          | 展开 suyun-menu 的延时                                                   | number      | —      | 300                                    |
| hide-timeout          | 收起 suyun-menu 的延时                                                   | number      | —      | 300                                    |
| disabled              | 是否禁用                                                                 | boolean     | —      | false                                  |
| popper-append-to-body | 是否将弹出菜单插入至 body 元素。在菜单的定位出现问题时，可尝试修改该属性 | boolean     | —      | 一级子菜单：true / 非一级子菜单：false |

### Menu-Item Props

| 参数     | 说明                | 类型    | 可选值 | 默认值 |
| -------- | ------------------- | ------- | ------ | ------ |
| index    | 唯一标志            | string  | —      | —      |
| route    | Vue Router 路径对象 | Object  | —      | —      |
| disabled | 是否禁用            | boolean | —      | false  |

### Menu-Group Props

| 参数  | 说明     | 类型   | 可选值 | 默认值 |
| ----- | -------- | ------ | ------ | ------ |
| title | 分组标题 | string | —      | —      |
