<template>
  <div v-if="showSizer || showElevator" class="yun-page-options">
    <div v-if="showSizer" class="yun-page-options-sizer">
      <yun-select
        v-model="currentPageSize"
        :size="isSmall ? 'mini' : 'default'"
        :placement="placement"
        :append-to-body="appendToBody"
        @change="changeSize"
      >
        <yun-option
          v-for="item in pageSizeOpts"
          :key="item"
          :value="item"
          :label="`${item} 条/页`"
          style="text-align:center;"
        >
        </yun-option>
      </yun-select>
    </div>
    <div v-if="showElevator" class="yun-page-options-elevator">
      跳至
      <label>
        <input type="text" :value="currentTo" autocomplete="off" spellcheck="false" @keyup.enter="changePage" />
      </label>
      页
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import YunSelect from '../select'
import YunOption from '../option'

function isValueNumber(value) {
  return /^[1-9][0-9]*$/.test(value + '')
}

export default {
  name: 'PageOption',
  components: { YunSelect, YunOption },
  props: {
    pageSizeOpts: Array,
    showSizer: Boolean,
    showElevator: Boolean,
    current: Number,
    currentTo: Number,
    pageSize: Number,
    allPages: Number,
    isSmall: Boolean,
    placement: String,
    appendToBody: Boolean,
  },
  emits: ['page', 'size'],
  setup(props, ctx) {
    const currentPageSize = ref(props.pageSize)
    const changeSize = () => {
      ctx.emit('size', currentPageSize.value)
    }
    const changePage = e => {
      let val = e.target.value.trim()
      let page = 0

      if (isValueNumber(val)) {
        val = Number(val)
        if (val !== props.current) {
          const allPages = props.allPages

          if (val > allPages) {
            page = allPages
          } else {
            page = val
          }
        }
      } else {
        page = 1
      }

      if (page) {
        ctx.emit('page', page)
        e.target.value = page
      }
    }
    watch(
      () => props.pageSize,
      val => {
        currentPageSize.value = val
      },
    )
    return {
      currentPageSize,
      changeSize,
      changePage,
    }
  },
}
</script>
