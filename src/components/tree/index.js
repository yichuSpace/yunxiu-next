import YunTree from './tree.vue'

YunTree.install = app => {
  app.component(YunTree.name, YunTree)
}

export default YunTree
