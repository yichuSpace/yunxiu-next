# Yunxiu-next 指南

Hi! 首先感谢你使用 Yunxiu-next。

Yunxiu-next 是一套基于 Vue 3.0 开发的开源组件库，旨在快速搭建页面。

## 文档

您可以在上找到更多详细信息、API 和其他文档https://yichuspace.github.io/yunxiu-next

[国内加速镜像站点](https://gitee.com/yichu-gitee/yunxiu-next)

加入我们的纷争，开始与每个人沟通。

## Pull Request 规范

- 请先 fork 一份到自己的项目下，不要直接在仓库下建分支。

- commit 信息要以`[组件名]: 描述信息` 的形式填写，例如 `Button: fix xxx bug`。

- **不要提交** `lib` 里面打包的文件。

- 执行 `npm run build` 后可以正确打包文件。

- 提交 PR 前请 rebase，确保 commit 记录的整洁。

- 确保 PR 是提交到 `dev` 分支，而不是 `master` 分支。

- 如果是修复 bug，请在 PR 中给出描述信息。

- 合并代码需要两名维护人员参与：一人进行 review 后 approve，另一人再次 review，通过后即可合并。

## 开发环境搭建

首先你需要 Node.js 4+，yarn 和 npm 3+。注意：我们使用 yarn 进行依赖版本的锁定，所以请不要使用 `npm install` 安装依赖。

```shell
git clone https://github.com/yichuSpace/yunxiu-next.git
npm run dev

# open http://localhost:8088
```

打包代码：

```shell
npm run build
```

## 组件开发规范

- 通过 `plop` 创建组件目录结构，包含测试代码、入口文件、文档
- 如果包含父子组件，需要更改目录结构，参考 `Button`
- 组件内如果依赖了其他组件，需要在当前组件内引入，参考 `Select`

## 代码规范

遵循饿了么前端的 [ESLint](https://github.com/ElemeFE/eslint-config-elemefe) 即可
