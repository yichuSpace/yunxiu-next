<template>
  <div :class="wrapClasses" :style="wrapStyles" ref="containerRef">
    <div :class="classes" v-loading:[loadingText]="loading">
      <div :class="['yun-table-header']" v-if="showHeader" ref="headerRef" @mousewheel="handleMouseWheel">
        <table-head
          prefix-cls="yun-table"
          :styleObject="tableHeaderStyle"
          :columns="cloneColumns"
          :column-rows="columnRows"
          :obj-data="objData"
          :columns-width="columnsWidth"
          :data="rebuildData"
        ></table-head>
      </div>
      <div
        :class="['yun-table-body']"
        ref="bodyRef"
        :style="bodyStyle"
        @scroll="handleBodyScroll"
        v-show="!(!!noDataText && (!data || data.length === 0))"
      >
        <table-body
          ref="tbodyRef"
          prefix-cls="yun-table"
          :draggable="draggable"
          :styleObject="tableStyle"
          :columns="cloneColumns"
          :data="rebuildData"
          :row-key="rowKey"
          :columns-width="columnsWidth"
          :obj-data="objData"
        ></table-body>
      </div>
      <div :class="['yun-table-tip']" :style="bodyStyle" @scroll="handleBodyScroll" v-show="!data || data.length === 0">
        <table cellspacing="0" cellpadding="0" border="0">
          <tbody>
            <tr>
              <td :style="{ height: bodyStyle.height, width: `${headerWidth}px` }">
                <yun-empty v-if="!data || data.length === 0">{{ noDataText }}</yun-empty>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div :class="['yun-table-fixed']" :style="fixedTableStyle" v-if="isLeftFixed">
        <div :class="fixedHeaderClasses" v-if="showHeader">
          <table-head
            fixed="left"
            prefix-cls="yun-table"
            :styleObject="fixedTableStyle"
            :columns="leftFixedColumns"
            :column-rows="columnRows"
            :fixed-column-rows="leftFixedColumnRows"
            :obj-data="objData"
            :columns-width="columnsWidth"
            :data="rebuildData"
          ></table-head>
        </div>
        <div
          :class="['yun-table-fixed-body']"
          :style="fixedBodyStyle"
          ref="fixedBodyRef"
          @mousewheel="handleFixedMousewheel"
          @DOMMouseScroll="handleFixedMousewheel"
        >
          <table-body
            fixed="left"
            :draggable="draggable"
            prefix-cls="yun-table"
            :styleObject="fixedTableStyle"
            :columns="leftFixedColumns"
            :data="rebuildData"
            :row-key="rowKey"
            :columns-width="columnsWidth"
            :obj-data="objData"
          ></table-body>
        </div>
      </div>
      <div :class="['yun-table-fixed-right']" :style="fixedRightTableStyle" v-if="isRightFixed">
        <div :class="fixedHeaderClasses" v-if="showHeader">
          <table-head
            fixed="right"
            prefix-cls="yun-table"
            :styleObject="fixedRightTableStyle"
            :columns="rightFixedColumns"
            :column-rows="columnRows"
            :fixed-column-rows="rightFixedColumnRows"
            :obj-data="objData"
            :columns-width="columnsWidth"
            :data="rebuildData"
          ></table-head>
        </div>
        <div
          :class="['yun-table-fixed-body']"
          :style="fixedBodyStyle"
          ref="fixedRightBodyRef"
          @mousewheel="handleFixedMousewheel"
          @DOMMouseScroll="handleFixedMousewheel"
        >
          <table-body
            fixed="right"
            :draggable="draggable"
            prefix-cls="yun-table"
            :styleObject="fixedRightTableStyle"
            :columns="rightFixedColumns"
            :data="rebuildData"
            :row-key="rowKey"
            :columns-width="columnsWidth"
            :obj-data="objData"
          ></table-body>
        </div>
      </div>
      <div :class="['yun-table-fixed-right-header']" :style="fixedRightHeaderStyle" v-if="isRightFixed"></div>
    </div>
  </div>
</template>

<script>
import { deepCopy } from '../../utils/util'
import { getStyle, on, off, getScrollBarWidth } from '../../utils/dom'
import { getAllColumns, convertToRows, convertColumnOrder, getRandomStr } from './main/util'
import { addResizeListener, removeResizeListener } from '../../utils/resizeEvent'
import Sortable from 'sortablejs'
import { computed, nextTick, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'
import TableHead from './table-head'
import TableBody from './table-body'
import YunEmpty from '../empty/empty'
import { generateId } from '../../utils/utilsHelper'

const prefixCls = 'yun-table'

let rowKey = 1
let columnKey = 1

export default {
  name: 'YunTable',
  components: { YunEmpty, TableBody, TableHead },
  props: {
    data: {
      type: Array,
      default() {
        return []
      },
    },
    columns: {
      type: Array,
      default() {
        return []
      },
    },
    size: {
      validator(value) {
        return ['small', 'large', 'default'].includes(value)
      },
      default: 'default',
    },
    width: {
      type: [Number, String],
    },
    height: {
      type: [Number, String],
    },
    maxHeight: {
      type: [Number, String],
    },
    stripe: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    highlightRow: {
      type: Boolean,
      default: false,
    },
    rowClassName: {
      type: Function,
      default() {
        return ''
      },
    },
    context: {
      type: Object,
    },
    noDataText: {
      type: String,
      default: '暂无数据',
    },
    disabledHover: {
      type: Boolean,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    dragHandle: String,
    tooltipTheme: {
      type: String,
      validator(value) {
        return ['dark', 'light'].includes(value)
      },
    },
    rowKey: {
      type: Boolean,
      default: false,
    },
    mergeMethod: {
      type: Function,
    },
    loadingText: {
      type: String,
      default: '正在加载',
    },
  },
  emits: [
    'sort-change',
    'current-change',
    'row-click',
    'row-dblclick',
    'select',
    'select-cancel',
    'selection-change',
    'select-all',
    'select-all-cancel',
    'selection-change',
    'expand',
    'drag-drop',
    'update:data',
  ],
  setup(props, { emit, slots }) {
    const containerRef = ref(null)
    const titleRef = ref(null)
    const headerRef = ref(null)
    const bodyRef = ref(null)
    const tbodyRef = ref(null)
    const footerRef = ref(null)
    const fixedBodyRef = ref(null)
    const fixedRightBodyRef = ref(null)
    // 基础数据
    const colsWithId = makeColumnsId(deepCopy(props.columns))
    // data
    const read = ref(false)
    const cloneColumns = ref(makeColumns(colsWithId))
    const columnRows = ref(makeColumnRows(false, colsWithId))
    const leftFixedColumnRows = ref(makeColumnRows('left', colsWithId))
    const rightFixedColumnRows = ref(makeColumnRows('right', colsWithId))
    const allColumns = ref(getAllColumns(colsWithId))
    const tableWidth = ref(0)
    const headerWidth = ref(0)
    const headerHeight = ref(0)
    const bodyHeight = ref(0)
    const columnsWidth = ref({})

    const cloneData = ref(deepCopy(props.data))
    const rebuildData = ref(makeDataWithSort())
    const objData = ref(makeObjData())

    const showVerticalScrollBar = ref(false)
    const showHorizontalScrollBar = ref(false)
    const scrollBarWidth = ref(getScrollBarWidth())

    // computed
    const wrapClasses = computed(() => {
      return [
        `${prefixCls}-wrapper`,
        {
          [`${prefixCls}-hide`]: !read.value,
          [`${prefixCls}-wrapper-with-border`]: props.border,
        },
      ]
    })
    const wrapStyles = computed(() => {
      const height = props.height
      const maxHeight = props.maxHeight
      const width = props.width

      let style = {}
      if (height) style.height = `${parseInt(height)}px`

      if (maxHeight) style.maxHeight = `${parseInt(maxHeight)}px`

      if (width) style.width = `${parseInt(width)}px`

      return style
    })
    const classes = computed(() => {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${props.size}`]: !!props.size,
          [`${prefixCls}-border`]: props.border,
          [`${prefixCls}-stripe`]: props.stripe,
          [`${prefixCls}-with-fixed-top`]: !!props.height,
        },
      ]
    })
    const bodyStyle = computed(() => {
      let style = {}
      const _bodyHeight = bodyHeight.value
      if (_bodyHeight !== 0) {
        const height = _bodyHeight
        if (props.height) {
          style.height = `${height}px`
        } else if (props.maxHeight) {
          style.maxHeight = `${height}px`
        }
      }
      return style
    })
    const tableHeaderStyle = computed(() => {
      const _tableWidth = tableWidth.value
      let style = {}
      if (_tableWidth !== 0) {
        style.width = `${_tableWidth}px`
      }
      return style
    })
    const tableStyle = computed(() => {
      let style = {}
      const _tableWidth = tableWidth.value
      const _bodyHeight = bodyHeight.value
      if (_tableWidth !== 0) {
        let width = ''
        if (_bodyHeight === 0) {
          width = _tableWidth
        } else {
          width = _tableWidth - (showVerticalScrollBar.value ? scrollBarWidth.value : 0)
        }
        style.width = `${width}px`
      }
      return style
    })

    let sortInstance = null

    // fixed table
    const isLeftFixed = computed(() => props.columns.some(col => col.fixed && col.fixed === 'left'))
    const isRightFixed = computed(() => props.columns.some(col => col.fixed && col.fixed === 'right'))
    const leftFixedColumns = computed(() => convertColumnOrder(cloneColumns.value, 'left'))
    const rightFixedColumns = computed(() => convertColumnOrder(cloneColumns.value, 'right'))
    const fixedTableStyle = computed(() => {
      let style = {}
      let width = 0
      leftFixedColumns.value.forEach(col => {
        if (col.fixed && col.fixed === 'left') width += col._width
      })
      style.width = `${width - 1}px`
      style.left = `1px`
      return style
    })
    const fixedRightTableStyle = computed(() => {
      let style = {}
      let width = 0
      rightFixedColumns.value.forEach(col => {
        if (col.fixed && col.fixed === 'right') width += col._width
      })
      // width += this.scrollBarWidth;
      style.width = `${width}px`
      style.right = `${showVerticalScrollBar.value ? scrollBarWidth.value : 0}px`
      return style
    })
    const fixedRightHeaderStyle = computed(() => {
      let style = {}
      let width = 0
      let height = headerHeight.value + 1
      if (showVerticalScrollBar.value) {
        width = scrollBarWidth.value
      }
      style.width = `${width}px`
      style.height = `${height}px`
      return style
    })
    const fixedBodyStyle = computed(() => {
      let style = {}
      const _bodyHeight = bodyHeight.value
      const _showHorizontalScrollBar = showHorizontalScrollBar.value
      if (_bodyHeight !== 0) {
        let height = _bodyHeight - (_showHorizontalScrollBar ? scrollBarWidth.value : 0)
        style.height = _showHorizontalScrollBar ? `${height}px` : `${height - 1}px`
      }
      return style
    })
    const fixedHeaderClasses = computed(() => {
      return [`${prefixCls}-fixed-header`, { [`${prefixCls}-fixed-header-with-empty`]: !rebuildData.value.length }]
    })

    // methods
    // 修改列，设置一个隐藏的 id，便于后面的多级表头寻找对应的列，否则找不到
    function makeColumnsId(columns) {
      return columns.map(item => {
        if ('children' in item) makeColumnsId(item.children)
        item.__id = getRandomStr(6)
        return item
      })
    }

    function makeColumns(cols) {
      // 在 data 时，this.allColumns 暂时为 undefined
      let columns = deepCopy(getAllColumns(cols))
      let left = []
      let right = []
      let center = []
      columns.forEach((column, index) => {
        column._index = index
        column._columnKey = columnKey++
        column.width = parseInt(column.width)
        column._width = column.width ? column.width : '' // update in handleResize()
        column._sortType = 'normal'
        if ('sortType' in column) {
          column._sortType = column.sortType
        }
        if (column.fixed && column.fixed === 'left') {
          left.push(column)
        } else if (column.fixed && column.fixed === 'right') {
          right.push(column)
        } else {
          center.push(column)
        }
      })
      return left.concat(center).concat(right)
    }

    // create a multiple table-head
    function makeColumnRows(fixedType, cols) {
      return convertToRows(cols, fixedType)
    }

    function makeData() {
      let data = deepCopy(props.data)
      data.forEach((row, index) => {
        row._index = index
        row._rowKey = generateId() + rowKey++
      })
      return data
    }

    function makeObjData() {
      let data = {}
      props.data.forEach((row, index) => {
        const newRow = deepCopy(row) // todo 直接替换
        newRow._isHover = false
        if (newRow._disabled) {
          newRow._isDisabled = newRow._disabled
        } else {
          newRow._isDisabled = false
        }
        if (newRow._checked) {
          newRow._isChecked = newRow._checked
        } else {
          newRow._isChecked = false
        }
        if (newRow._expanded) {
          newRow._isExpanded = newRow._expanded
        } else {
          newRow._isExpanded = false
        }
        if (newRow._highlight) {
          newRow._isHighlight = newRow._highlight
        } else {
          newRow._isHighlight = false
        }
        data[index] = newRow
      })
      return data
    }

    // 排序函数
    function sortData(data, type, index) {
      const key = cloneColumns.value[index].key
      data.sort((a, b) => {
        const method = cloneColumns.value[index]['sortMethod']
        if (method) {
          return method(a[key], b[key], type)
        } else {
          if (type === 'asc') {
            return a[key] > b[key] ? 1 : -1
          } else if (type === 'desc') {
            return a[key] < b[key] ? 1 : -1
          }
        }
      })
      return data
    }

    function makeDataWithSort() {
      let data = makeData()
      let sortType = 'normal'
      let sortIndex = -1
      let isCustom = false

      for (let i = 0; i < cloneColumns.value.length; i++) {
        const columnType = cloneColumns.value[i]['_sortType']
        if (columnType !== 'normal') {
          sortType = columnType
          sortIndex = i
          isCustom = columnType === 'custom'
          break
        }
      }
      if (sortType !== 'normal' && !isCustom) data = sortData(data, sortType, sortIndex)
      return data
    }

    function fixedHeader() {
      const height = props.height
      const maxHeight = props.maxHeight
      if (height || maxHeight) {
        nextTick(() => {
          const titleHeight = parseInt(getStyle(titleRef.value, 'height')) || 0
          const headerHeight = parseInt(getStyle(headerRef.value, 'height')) || 0
          const footerHeight = parseInt(getStyle(footerRef.value, 'height')) || 0
          if (height) {
            bodyHeight.value = height - titleHeight - headerHeight - footerHeight
          } else if (maxHeight) {
            bodyHeight.value = maxHeight - titleHeight - headerHeight - footerHeight
          }
          nextTick(() => fixedBody())
        })
      } else {
        bodyHeight.value = 0
        nextTick(() => fixedBody())
      }
    }

    function fixedBody() {
      const header = headerRef.value
      const tbody = tbodyRef.value
      if (header) {
        headerWidth.value = header.children[0].offsetWidth
        headerHeight.value = header.children[0].offsetHeight
      }
      if (!tbody || !props.data || props.data.length === 0) {
        showVerticalScrollBar.value = false
      } else {
        let bodyContentEl = tbody.$el
        let bodyEl = bodyContentEl.parentElement
        let bodyContentHeight = bodyContentEl.offsetHeight
        let offsetHeight = bodyEl.offsetHeight

        const showHBar = (showHorizontalScrollBar.value =
          bodyEl.offsetWidth < bodyContentEl.offsetWidth + (showVerticalScrollBar.value ? scrollBarWidth.value : 0))
        showVerticalScrollBar.value = bodyHeight.value
          ? offsetHeight - (showHBar ? scrollBarWidth.value : 0) < bodyContentHeight
          : false

        if (showVerticalScrollBar.value) {
          bodyEl.classList.add('yun-table-overflowY')
        } else {
          bodyEl.classList.remove('yun-table-overflowY')
        }
        if (showHorizontalScrollBar.value) {
          bodyEl.classList.add('yun-table-overflowX')
        } else {
          bodyEl.classList.remove('yun-table-overflowX')
        }
      }
    }

    function handleResize() {
      const cloneColumnsBuf = cloneColumns.value
      let offsetWidth = containerRef.value.offsetWidth
      let columnsWidthObj = {}
      let sumMinWidth = 0
      let hasWidthColumns = []
      let noWidthColumns = []
      let maxWidthColumns = []
      let noMaxWidthColumns = []
      cloneColumnsBuf.forEach(col => {
        if (col.width) {
          hasWidthColumns.push(col)
        } else {
          noWidthColumns.push(col)
          if (col.minWidth) {
            sumMinWidth += col.minWidth
          }
          if (col.maxWidth) {
            maxWidthColumns.push(col)
          } else {
            noMaxWidthColumns.push(col)
          }
        }
        col._width = null
      })

      let unUsableWidth = hasWidthColumns.map(cell => cell.width).reduce((a, b) => a + b, 0)
      let usableWidth =
        offsetWidth - unUsableWidth - sumMinWidth - (showVerticalScrollBar.value ? scrollBarWidth.value : 0) - 1
      let usableLength = noWidthColumns.length
      let columnWidth = 0
      if (usableWidth > 0 && usableLength > 0) {
        columnWidth = parseInt(usableWidth / usableLength)
      }

      for (let i = 0; i < cloneColumnsBuf.length; i++) {
        const column = cloneColumnsBuf[i]
        let width = columnWidth + (column.minWidth ? column.minWidth : 0)
        if (column.width) {
          width = column.width
        } else {
          if (column._width) {
            width = column._width
          } else {
            if (column.minWidth > width) {
              width = column.minWidth
            } else if (column.maxWidth < width) {
              width = column.maxWidth
            }
            if (usableWidth > 0) {
              usableWidth -= width - (column.minWidth ? column.minWidth : 0)
              usableLength--
              if (usableLength > 0) {
                columnWidth = parseInt(usableWidth / usableLength)
              } else {
                columnWidth = 0
              }
            } else {
              columnWidth = 0
            }
          }
        }

        column._width = width

        columnsWidthObj[column._index] = {
          width: width,
        }
      }

      if (usableWidth > 0) {
        usableLength = noMaxWidthColumns.length
        columnWidth = parseInt(usableWidth / usableLength)
        for (let i = 0; i < noMaxWidthColumns.length; i++) {
          const column = noMaxWidthColumns[i]
          let width = column._width + columnWidth
          if (usableLength > 1) {
            usableLength--
            usableWidth -= columnWidth
            columnWidth = parseInt(usableWidth / usableLength)
          } else {
            columnWidth = 0
          }

          column._width = width

          columnsWidthObj[column._index] = {
            width: width,
          }
        }
      }
      tableWidth.value =
        cloneColumnsBuf.map(cell => cell._width).reduce((a, b) => a + b, 0) +
        (showVerticalScrollBar.value ? scrollBarWidth.value : 0) +
        1
      columnsWidth.value = columnsWidthObj
      fixedHeader()
    }

    function GetOriginalIndex(_index) {
      return cloneColumns.value.findIndex(item => item._index === _index)
    }

    function handleSort(_index, type) {
      const index = GetOriginalIndex(_index)
      const columns = cloneColumns.value
      columns.forEach(col => {
        col._sortType = 'normal'
      })

      const key = columns[index].key
      if (columns[index].sortable !== 'custom') {
        // custom is for remote sort
        if (type === 'normal') {
          rebuildData.value = makeDataWithSort()
        } else {
          rebuildData.value = sortData(rebuildData.value, type, index)
        }
      }
      columns[index]._sortType = type

      emit('sort-change', {
        column: JSON.parse(JSON.stringify(allColumns.value[columns[index]._index])),
        key: key,
        order: type,
      })
    }

    function handleMouseIn(_index) {
      if (props.disabledHover) return
      if (objData.value[_index]._isHover) return
      objData.value[_index]._isHover = true
    }

    function handleMouseOut(_index) {
      if (props.disabledHover) return
      objData.value[_index]._isHover = false
    }

    function handleBodyScroll(event) {
      if (props.showHeader) headerRef.value.scrollLeft = event.target.scrollLeft
      if (isLeftFixed.value) fixedBodyRef.value.scrollTop = event.target.scrollTop
      if (isRightFixed.value) fixedRightBodyRef.value.scrollTop = event.target.scrollTop
    }

    function handleFixedMousewheel(e) {
      let deltaY = e.deltaY
      if (!deltaY && e.detail) {
        deltaY = e.detail * 40
      }
      if (!deltaY && e.wheelDeltaY) {
        deltaY = -e.wheelDeltaY
      }
      if (!deltaY && e.wheelDelta) {
        deltaY = -e.wheelDelta
      }
      if (!deltaY) return
      const body = bodyRef.value
      const currentScrollTop = body.scrollTop
      if (deltaY < 0 && currentScrollTop !== 0) {
        e.preventDefault()
      }
      if (deltaY > 0 && body.scrollHeight - body.clientHeight > currentScrollTop) {
        e.preventDefault()
      }
      // body.scrollTop += deltaY;
      let step = 0
      let timeId = setInterval(() => {
        step += 5
        if (deltaY > 0) {
          body.scrollTop += 2
        } else {
          body.scrollTop -= 2
        }
        if (step >= Math.abs(deltaY)) {
          clearInterval(timeId)
        }
      }, 5)
    }

    function handleMouseWheel(e) {
      const deltaX = e.deltaX
      const $body = bodyRef.value
      if (deltaX > 0) {
        $body.scrollLeft = $body.scrollLeft + 10
      } else {
        $body.scrollLeft = $body.scrollLeft - 10
      }
    }

    // 通用处理 highlightCurrentRow 和 clearCurrentRow
    function handleCurrentRow(type, _index) {
      let oldIndex = -1
      const _objData = objData.value
      const _cloneData = cloneData.value
      for (let i in _objData) {
        if (_objData[i]._isHighlight) {
          oldIndex = parseInt(i)
          _objData[i]._isHighlight = false
        }
      }
      if (type === 'highlight') _objData[_index]._isHighlight = true
      const oldData = oldIndex < 0 ? null : JSON.parse(JSON.stringify(_cloneData[oldIndex]))
      const newData = type === 'highlight' ? JSON.parse(JSON.stringify(_cloneData[_index])) : null
      emit('current-change', newData, oldData, _index)
    }

    function highlightCurrentRow(_index) {
      if (!props.highlightRow || objData.value[_index]._isHighlight) return
      handleCurrentRow('highlight', _index)
    }

    function clearCurrentRow() {
      if (!props.highlightRow) return
      handleCurrentRow('clear')
    }

    function clickCurrentRow(_index) {
      const _cloneData = cloneData.value
      if (_index === _cloneData.length) return
      highlightCurrentRow(_index)
      emit('row-click', JSON.parse(JSON.stringify(_cloneData[_index])), _index)
    }

    function dblclickCurrentRow(_index) {
      const _cloneData = cloneData.value
      highlightCurrentRow(_index)
      emit('row-dblclick', JSON.parse(JSON.stringify(_cloneData[_index])), _index)
    }

    function getSelection() {
      let selectionIndexes = []
      const _objData = objData.value
      for (let i in _objData) {
        if (_objData[i]._isChecked) selectionIndexes.push(parseInt(i))
      }
      return JSON.parse(JSON.stringify(props.data.filter((data, index) => selectionIndexes.indexOf(index) > -1)))
    }

    function toggleSelect(_index) {
      let data = {}
      const _objData = objData.value
      for (let i in _objData) {
        if (parseInt(i) === _index) {
          data = _objData[i]
          break
        }
      }
      const status = !data._isChecked

      _objData[_index]._isChecked = status

      const selection = getSelection()
      emit(status ? 'select' : 'select-cancel', selection, JSON.parse(JSON.stringify(props.data[_index])))
      emit('selection-change', selection)
    }

    function toggleExpand(_index) {
      let data = {}
      const _objData = objData.value
      for (let i in _objData) {
        if (parseInt(i) === _index) {
          data = _objData[i]
          break
        }
      }
      const status = !data._isExpanded
      data._isExpanded = status
      emit('expand', JSON.parse(JSON.stringify(cloneData.value[_index])), status)
      if (props.height || props.maxHeight) {
        nextTick(() => fixedBody())
      }
    }

    function selectAll(status) {
      for (const data of rebuildData.value) {
        const _objData = objData.value
        if (_objData[data._index]._isDisabled) {
          continue
        }
        _objData[data._index]._isChecked = status
      }
      const selection = getSelection()
      if (status) {
        emit('select-all', selection)
      } else {
        emit('select-all-cancel', selection)
      }
      emit('selection-change', selection)
    }

    function dragAndDrop(list, newIndex, oldIndex) {
      emit('update:data', list)
      emit('drag-drop', list, newIndex, oldIndex)
    }

    provide('YunTable', {
      props,
      showVerticalScrollBar,
      scrollBarWidth,
      objData,
      handleSort,
      handleMouseIn,
      handleMouseOut,
      handleCurrentRow,
      highlightCurrentRow,
      clickCurrentRow,
      dblclickCurrentRow,
      slots,
      toggleSelect,
      selectAll,
      toggleExpand,
    })
    // 钩子函数
    onMounted(() => {
      handleResize()
      on(window, 'resize', handleResize)
      if (containerRef.value) {
        addResizeListener(containerRef.value.parentElement, handleResize)
      }
      nextTick(() => {
        read.value = true
      })
      if (props.draggable) {
        setSort()
      }
    })

    // 初始化拖拽
    function setSort() {
      if (sortInstance) sortInstance.destroy()
      const el = tbodyRef.value.$el.querySelector('.yun-table-tbody')
      if (!el) {
        console.error('dom width class yun-table-tbody is not find')
        return
      }
      sortInstance = Sortable.create(el, {
        animation: 150,
        ghostClass: 'yun-table-ghost-class',
        handle: props.dragHandle,
        onUpdate: ({ newIndex, oldIndex }) => {
          const $li = el.children[newIndex]
          const $oldLi = el.children[oldIndex]
          // 先删除移动的节点
          el.removeChild($li)
          // 再插入移动的节点到原有节点，还原了移动的操作
          if (newIndex > oldIndex) {
            el.insertBefore($li, $oldLi)
          } else {
            el.insertBefore($li, $oldLi.nextSibling)
          }
          // 更新items数组
          const targetRow = cloneData.value.splice(oldIndex, 1)[0]
          cloneData.value.splice(newIndex, 0, targetRow)
        },
        onEnd: ({ newIndex, oldIndex }) => {
          // 下一个tick就会走patch更新
          dragAndDrop(cloneData.value, newIndex, oldIndex)
        },
      })
    }

    onBeforeUnmount(() => {
      if (sortInstance) sortInstance.destroy()
      off(window, 'resize', handleResize)
      if (containerRef.value) {
        removeResizeListener(containerRef.value.parentElement, handleResize)
      }
    })

    watch(
      () => props.data,
      newData => {
        // 缓存原始list-data，用于拖拽时更新数据
        const oldDataLen = rebuildData.value.length
        objData.value = makeObjData()
        rebuildData.value = makeDataWithSort()
        if (!oldDataLen) fixedHeader()
        cloneData.value = deepCopy(newData)
        nextTick(() => {
          handleResize()
        })
      },
      { deep: true },
    )

    watch(
      () => props.columns,
      newColumns => {
        const colsWithId = makeColumnsId(newColumns)
        allColumns.value = getAllColumns(colsWithId)
        cloneColumns.value = makeColumns(colsWithId)
        columnRows.value = makeColumnRows(false, colsWithId)
        leftFixedColumnRows.value = makeColumnRows('left', colsWithId)
        rightFixedColumnRows.value = makeColumnRows('right', colsWithId)
        rebuildData.value = makeDataWithSort()
        nextTick(() => {
          handleResize()
        })
      },
      { deep: true },
    )

    watch(
      () => [props.height, props.maxHeight, showHorizontalScrollBar, showVerticalScrollBar],
      () => {
        handleResize()
      },
    )

    return {
      containerRef,
      titleRef,
      headerRef,
      bodyRef,
      tbodyRef,
      footerRef,
      fixedBodyRef,
      fixedRightBodyRef,
      // data
      read,
      cloneColumns,
      columnRows,
      headerWidth,
      headerHeight,
      objData,
      bodyHeight,
      columnsWidth,
      tableWidth,
      rebuildData,
      cloneData,
      showVerticalScrollBar,
      scrollBarWidth,
      // computed
      wrapClasses,
      wrapStyles,
      classes,
      tableHeaderStyle,
      tableStyle,
      bodyStyle,
      isLeftFixed,
      isRightFixed,
      leftFixedColumns,
      rightFixedColumns,
      leftFixedColumnRows,
      rightFixedColumnRows,
      fixedTableStyle,
      fixedRightTableStyle,
      fixedHeaderClasses,
      fixedBodyStyle,
      fixedRightHeaderStyle,
      handleSort,
      handleMouseIn,
      handleMouseOut,
      handleCurrentRow,
      highlightCurrentRow,
      handleMouseWheel,
      handleBodyScroll,
      handleFixedMousewheel,
      clickCurrentRow,
      clearCurrentRow,
      selectAll,
      getSelection,
      toggleSelect,
      toggleExpand,
    }
  },
}
</script>
