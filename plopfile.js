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
