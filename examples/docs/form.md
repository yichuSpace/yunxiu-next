## Form 表单

由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据

### 基础用法

基础的表单使用，表单项，比如输入框、选择器、开关、单选框、多选框等。

::: demo

```html
<template>
  <yun-form ref="form" :model="form" label-width="80px">
    <yun-form-item label="姓名">
      <yun-input v-model="form.name" placeholder="输入姓名"></yun-input>
    </yun-form-item>
    <yun-form-item label="年龄">
      <yun-input-number v-model="form.age"></yun-input-number>
    </yun-form-item>
    <yun-form-item label="户籍地">
      <yun-select v-model="form.region" placeholder="请选择户籍地">
        <yun-option label="上海" value="shanghai"></yun-option>
        <yun-option label="北京" value="beijing"></yun-option>
        <yun-option label="南京" value="nanjing"></yun-option>
        <yun-option label="徐州" value="xuzhou"></yun-option>
      </yun-select>
    </yun-form-item>
    <yun-form-item label="学历">
      <yun-radio-group v-model="form.edu">
        <yun-radio label="高中"></yun-radio>
        <yun-radio label="大专"></yun-radio>
        <yun-radio label="本科"></yun-radio>
        <yun-radio label="硕士"></yun-radio>
      </yun-radio-group>
    </yun-form-item>
    <yun-form-item label="爱好">
      <yun-checkbox-group v-model="form.hobby">
        <yun-checkbox label="打游戏" name="hobby"></yun-checkbox>
        <yun-checkbox label="看电影" name="hobby"></yun-checkbox>
        <yun-checkbox label="打篮球/运动" name="hobby"></yun-checkbox>
        <yun-checkbox label="看书" name="hobby"></yun-checkbox>
      </yun-checkbox-group>
    </yun-form-item>
    <yun-form-item label="住址">
      <yun-input type="textarea" v-model="form.desc" placeholder="请输入住址..."></yun-input>
    </yun-form-item>
    <yun-form-item>
      <yun-button type="primary" @click="onSubmit">提交</yun-button>
      <yun-button>取消</yun-button>
    </yun-form-item>
  </yun-form>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          age: null,
          city: '',
          edu: '',
          hobby: [],
          address: '',
        },
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!')
      },
    },
  }
</script>
```

:::

### 行内表单

表单内容项比较少的情况可以使用行内模式

::: demo

```html
<template>
  <yun-form ref="form" :model="form" inline class="demo-form-inline">
    <yun-form-item label="姓名">
      <yun-input v-model="form.name" placeholder="输入姓名"></yun-input>
    </yun-form-item>
    <yun-form-item label="户籍地">
      <yun-select v-model="form.region" placeholder="请选择户籍地">
        <yun-option label="上海" value="shanghai"></yun-option>
        <yun-option label="北京" value="beijing"></yun-option>
        <yun-option label="南京" value="nanjing"></yun-option>
        <yun-option label="徐州" value="xuzhou"></yun-option>
      </yun-select>
    </yun-form-item>
    <yun-form-item>
      <yun-button type="primary" @click="onSubmit">提交</yun-button>
    </yun-form-item>
  </yun-form>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          city: '',
        },
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!')
      },
    },
  }
</script>
```

:::

### 对齐和尺寸

可以有三种不同的标签对齐方式,纯文字需要包裹 label 标签

::: demo

```html

<template>
  <div flex>
    <p>对齐方式：
      <yun-radio-group v-model="labelPosition" type="button">
        <yun-radio label="left">左对齐</yun-radio>
        <yun-radio label="right">右对齐</yun-radio>
        <yun-radio label="top">顶部对齐</yun-radio>
      </yun-radio-group>
    </p>
    &nbsp;
    <p>尺寸大小：
      <yun-radio-group v-model="size" type="button">
        <yun-radio label="large">large</yun-radio>
        <yun-radio label="default">default</yun-radio>
        <yun-radio label="small">small</yun-radio>
        <yun-radio label="mini">mini</yun-radio>
      </yun-radio-group>
    </p>
    &nbsp;
    <p>纯文字：
    <div>
      <yun-switch v-model="onlyText"></yun-switch>
    </div>
    </p>
  </div>
  <div style="margin: 20px;"></div>
  <yun-form :label-position="labelPosition" label-width="80px" :model="form" :size="size" label-suffix=":">
    <yun-form-item label="姓名">
      <yun-input v-if="!onlyText" v-model="form.name" placeholder="输入姓名"></yun-input>
      <label v-else>{{ form.name }}</label>
    </yun-form-item>
    <yun-form-item label="年龄">
      <yun-input-number v-if="!onlyText" v-model="form.age" :size="size"></yun-input-number>
      <label v-else>{{ form.age }}</label>
    </yun-form-item>
    <yun-form-item label="户籍地">
      <yun-select v-if="!onlyText" v-model="form.city" placeholder="请选择户籍地" :size="size">
        <yun-option label="上海" value="shanghai"></yun-option>
        <yun-option label="北京" value="beijing"></yun-option>
        <yun-option label="南京" value="nanjing"></yun-option>
        <yun-option label="徐州" value="xuzhou"></yun-option>
      </yun-select>
      <label v-else>{{ form.city }}</label>
    </yun-form-item>
    <yun-form-item label="学历">
      <yun-radio-group v-if="!onlyText" v-model="form.edu">
        <yun-radio label="高中"></yun-radio>
        <yun-radio label="大专"></yun-radio>
        <yun-radio label="本科"></yun-radio>
        <yun-radio label="硕士"></yun-radio>
      </yun-radio-group>
      <span v-else>{{ form.edu }}</span>
    </yun-form-item>
    <yun-form-item label="爱好">
      <yun-checkbox-group v-if="!onlyText" v-model="form.hobby">
        <yun-checkbox label="打游戏" name="hobby"></yun-checkbox>
        <yun-checkbox label="看电影" name="hobby"></yun-checkbox>
        <yun-checkbox label="打篮球/运动" name="hobby"></yun-checkbox>
        <yun-checkbox label="看书" name="hobby"></yun-checkbox>
      </yun-checkbox-group>
      <span v-else>{{ form.hobby }}</span>
    </yun-form-item>
    <yun-form-item label="住址">
      <yun-input v-if="!onlyText" type="textarea" v-model="form.address" placeholder="请输入住址..."></yun-input>
      <span v-else>{{ form.address }}</span>
    </yun-form-item>
    <yun-form-item v-if="!onlyText">
      <yun-button type="primary">提交</yun-button>
      <yun-button>取消</yun-button>
    </yun-form-item>
  </yun-form>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          name: '张三',
          age: 18,
          city: 'xuzhou',
          edu: '高中',
          hobby: ['打游戏', '看电影'],
          address: '徐州市鼓楼区'
        },
        labelPosition: 'right',
        size: 'default',
        onlyText: false
      }
    }
  }
</script>
```

:::

### 表单校验

提供基础的校验规则，校验规则参考 [async-validator](https://github.com/yiminghe/async-validator)

::: demo

```html
<template>
  <yun-form ref="ruleForm" :model="form" status-icon label-width="85px" :rules="ruleValidate">
    <yun-form-item prop="name" label="名称">
      <yun-input v-model="form.name" placeholder="用户名"></yun-input>
    </yun-form-item>
    <yun-form-item prop="mail" label="邮箱">
      <yun-input v-model="form.mail" placeholder="邮箱" clearable></yun-input>
    </yun-form-item>
    <yun-row>
      <yun-col :span="12">
        <yun-form-item prop="age" label="年龄">
          <yun-input-number style="width: 100%;" v-model="form.age"></yun-input-number>
        </yun-form-item>
      </yun-col>
      <yun-col :span="12">
        <yun-form-item label="户籍地" prop="region">
          <yun-select v-model="form.region" placeholder="请选择户籍地" clearable>
            <yun-option label="上海" value="shanghai"></yun-option>
            <yun-option label="北京" value="beijing"></yun-option>
            <yun-option label="南京" value="nanjing"></yun-option>
            <yun-option label="徐州" value="xuzhou"></yun-option>
          </yun-select>
        </yun-form-item>
      </yun-col>
    </yun-row>
    <yun-form-item label="出生日期" prop="birthday">
      <yun-date-picker v-model="form.birthday" type="date" placeholder="出生日期"></yun-date-picker>
    </yun-form-item>
    <yun-form-item label="爱好" prop="hobby">
      <yun-checkbox-group v-model="form.hobby">
        <yun-checkbox label="打游戏" name="hobby"></yun-checkbox>
        <yun-checkbox label="看电影" name="hobby"></yun-checkbox>
        <yun-checkbox label="打篮球/运动" name="hobby"></yun-checkbox>
        <yun-checkbox label="看书" name="hobby"></yun-checkbox>
      </yun-checkbox-group>
    </yun-form-item>
    <yun-form-item label="性别" prop="sex">
      <yun-radio-group v-model="form.sex">
        <yun-radio label="男" value="male"></yun-radio>
        <yun-radio label="女" value="female"></yun-radio>
      </yun-radio-group>
    </yun-form-item>
    <yun-form-item label="状态" prop="status">
      <yun-switch v-model="form.status" true-value="enable" false-value="disable" size="large">
        <template #open><span>启用</span></template>
        <template #close><span>禁用</span></template>
      </yun-switch>
    </yun-form-item>
    <yun-form-item>
      <yun-button type="primary" @click="submitForm('ruleForm')">提交</yun-button>
      <yun-button @click="resetForm('ruleForm')">重置</yun-button>
    </yun-form-item>
  </yun-form>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          age: null,
          mail: '',
          region: '',
          hobby: [],
          sex: '',
          status: 'disable',
          birthday: '',
        },
        ruleValidate: {
          name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
          region: [{ required: true, message: '户籍地不能为空', trigger: 'change' }],
          age: [
            { required: true, type: 'number', message: '年龄不为空', trigger: 'change' },
            { type: 'number', min: 18, trigger: 'change', message: '年龄必须在18以上' },
          ],
          hobby: [{ type: 'array', required: true, message: '请至少选择一个爱好', trigger: 'change' }],
          sex: [{ required: true, message: '性别必选', trigger: 'change' }],
          birthday: [{ required: true, type: 'date', message: '出生日期必选', trigger: 'blur' }],
          mail: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
          ],
        },
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
    },
  }
</script>
```

:::

### 自定义校验规则

可以自定义校验函数来实现更多的校验判定

::: demo

```html
<template>
  <yun-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <yun-form-item label="密码" prop="pass">
      <yun-input type="password" v-model="ruleForm.pass" autocomplete="off"></yun-input>
    </yun-form-item>
    <yun-form-item label="确认密码" prop="checkPass">
      <yun-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></yun-input>
    </yun-form-item>
    <yun-form-item label="年龄" prop="age">
      <yun-input v-model.number="ruleForm.age" type="number"></yun-input>
    </yun-form-item>
    <yun-form-item>
      <yun-button type="primary" @click="submitForm('ruleForm')">提交</yun-button>
      <yun-button @click="resetForm('ruleForm')">重置</yun-button>
    </yun-form-item>
  </yun-form>
</template>
<script>
  export default {
    data() {
      const checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'))
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'))
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'))
            } else {
              callback()
            }
          }
        }, 1000)
      }
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass')
          }
          callback()
        }
      }
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          age: '',
        },
        rules: {
          pass: [{ validator: validatePass, trigger: 'blur' }],
          checkPass: [{ validator: validatePass2, trigger: 'blur' }],
          age: [{ validator: checkAge, trigger: 'blur' }],
        },
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
    },
  }
</script>
```

:::

### 动态增加校验

可以动态的配置校验规则

::: demo

```html
<template>
  <yun-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
    <yun-form-item
      v-for="(domain, index) in dynamicValidateForm.domains"
      :label="'域名' + index"
      :key="domain.key"
      :prop="'domains.' + index + '.value'"
      :rules="{
      required: true, message: '域名不能为空', trigger: 'blur'
    }"
    >
      <div flex="box:last">
        <yun-input v-model="domain.value"></yun-input>
        <yun-button @click="removeDomain(domain)">删除</yun-button>
      </div>
    </yun-form-item>
    <yun-form-item>
      <yun-button type="primary" @click="submitForm('dynamicValidateForm')">提交</yun-button>
      <yun-button @click="addDomain">新增域名</yun-button>
      <yun-button @click="resetForm('dynamicValidateForm')">重置</yun-button>
    </yun-form-item>
  </yun-form>
</template>
<script>
  export default {
    data() {
      return {
        dynamicValidateForm: {
          domains: [
            {
              value: '',
            },
          ],
        },
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      removeDomain(item) {
        const index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now(),
        })
      },
    },
  }
</script>
```

:::

### Form Props

| 参数                    | 说明                                                                                    | 类型           | 可选值                   | 默认值 |
| ----------------------- | --------------------------------------------------------------------------------------- | -------------- | ------------------------ | ------ |
| model                   | 表单数据对象                                                                            | object         | —                        | —      |
| rules                   | 表单验证规则                                                                            | object         | —                        | —      |
| inline                  | 行内表单模式                                                                            | boolean        | —                        | false  |
| label-position          | 标签的位置，如果值为 left 或者 right 时，则需要设置 label-width                         | right/left/top | —                        | right  |
| label-width             | 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。 | —              | —                        | right  |
| label-suffix            | 表单域标签的后缀                                                                        | string         | —                        | —      |
| hide-required-asterisk  | 是否隐藏必填字段的标签旁边的红色\*                                                      | boolean        | —                        | false  |
| show-message            | 是否显示校验错误信息                                                                    | boolean        | —                        | true   |
| inline-message          | 是否以行内形式展示校验信息,此时右侧需要留出校验信息的显示宽度才可以正常使用             | boolean        | —                        | false  |
| status-icon             | 是否在输入框中显示校验结果反馈图标                                                      | boolean        | —                        | false  |
| validate-on-rule-change | 是否在 rules 属性改变后立即触发一次验证                                                 | boolean        | —                        | true   |
| size                    | 用于控制该表单内组件的尺寸                                                              | string         | large,default,small,mini | —      |
| disabled                | 是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效       | —              | false                    |

### Form Methods

| 方法名        | 说明                                                                                                                                                                 | 返回值                                        |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| validate      | 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise | Function(callback: Function(boolean, object)) |
| validateField | 对部分表单字段进行校验的方法                                                                                                                                         | Function(props: array                         | string, callback: Function(errorMessage: string)) |
| resetFields   | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果                                                                                                           | —                                             |
| clearValidate | 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果                                                             | Function(props: array                         | string) |

### Form Events

| 方法名   | 说明                   | 返回值                                                     |
| -------- | ---------------------- | ---------------------------------------------------------- |
| validate | 任一表单项被校验后触发 | 被校验的表单项 prop 值，校验是否通过，错误消息（如果存在） |

### FormItem Props

| 参数           | 说明                                                                         | 类型    | 可选值                          | 默认值 |
| -------------- | ---------------------------------------------------------------------------- | ------- | ------------------------------- | ------ |
| prop           | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string  | 传入 Form 组件的 model 中的字段 | —      |
| label          | 标签文本                                                                     | string  | —                               | —      |
| label-width    | 表单域标签的的宽度，例如 '80px'。支持 auto。                                 | string  | —                               | —      |
| required       | 是否必填，如不设置，则会根据校验规则自动生成                                 | boolean | —                               | false  |
| rules          | 表单验证规则                                                                 | object  | —                               | —      |
| error          | 表单域验证错误信息, 设置该值会使表单验证状态变为 error，并显示该错误信息     | string  | —                               | —      |
| show-message   | 是否显示校验错误信息                                                         | boolean | —                               | true   |
| inline-message | 以行内形式展示校验信息                                                       | boolean | —                               | false  |
| size           | 用于控制该表单域下组件的尺寸                                                 | string  | large,default,small,mini        | —      |

### FormItem Slot

| 名称    | 说明           |
| ------- | -------------- |
| default | 默认内容       |
| label   | 标签文本的内容 |

### FormItem Scoped Slot

| 名称  | 说明                                           |
| ----- | ---------------------------------------------- |
| error | 自定义表单校验信息的显示方式，参数为 { error } |

### FormItem Methods

| 名称          | 说明                                                 |
| ------------- | ---------------------------------------------------- |
| resetField    | 对该表单项进行重置，将其值重置为初始值并移除校验结果 |
| clearValidate | 移除该表单项的校验结果                               |
