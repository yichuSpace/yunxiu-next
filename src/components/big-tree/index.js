import YunBigTree from '../tree/big-tree.vue'

YunBigTree.install = app => {
  app.component(YunBigTree.name, YunBigTree)
}

export default YunBigTree
