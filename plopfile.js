module.exports = plop => {
  plop.setGenerator('component', {
    description: 'create a custom component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name',
        default: 'MyComponent',
      },
      {
        type: 'checkbox',
        name: 'blocks',
        message: 'Blocks:',
        choices: [
          {
            name: 'state',
            value: 'state',
            checked: true,
          },
          {
            name: 'mutations',
            value: 'mutations',
            checked: true,
          },
          {
            name: 'actions',
            value: 'actions',
            checked: true,
          },
        ],
        validate(value) {
          if (!value.includes('state') || !value.includes('mutations')) {
            return 'store require at least state and mutations'
          }
          return true
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{name}}/{{name}}.vue',
        templateFile: 'plop-template/component/component.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{name}}/index.js',
        templateFile: 'plop-template/component/index.hbs',
      },
      {
        type: 'add',
        path: 'src/styles/components/{{name}}/index.scss',
        templateFile: 'plop-template/component/style.hbs',
      },
      {
        type: 'add',
        path: 'examples/docs/{{name}}.md',
        templateFile: 'plop-template/component/docs.hbs',
      },
    ],
  })
}
