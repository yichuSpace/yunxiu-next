<template>
  <tr>
    <template v-for="(cell, index) in row" :key="`tr3-${index}`">
      <template v-if="descriptions.border">
        <yun-desc-cell :cell="cell" tag="td" type="label" />
        <yun-desc-cell :cell="cell" tag="td" type="content" />
      </template>
      <yun-desc-cell v-else :cell="cell" tag="td" type="both" />
    </template>
  </tr>
</template>

<script>
import { inject } from 'vue'
import YunDescCell from './descriptions-cell'

export default {
  name: 'YunDescRow',
  components: { YunDescCell },
  props: {
    row: {
      type: Array,
    },
  },
  setup() {
    const descriptions = inject('YunDesc', {})

    return {
      descriptions,
    }
  },
}
</script>
