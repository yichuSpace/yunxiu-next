<template>
  <div
    :class="[
      'yun-progress',
      status ? 'progress-' + status : '',
      {
        'yun-progress-text': !showText,
        'yun-progress-text-inside': textInside,
      },
    ]"
    role="progressbar"
    :aria-valuenow="percent"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div class="yun-progress-bar" :class="{ 'is-active': active }">
      <div class="yun-progress-bar__outer" :style="barOutStyle">
        <div class="yun-progress-bar__inner" :style="barStyle">
          <div class="yun-progress-bar__innerText" v-if="showText && textInside">{{ percent }}%</div>
        </div>
      </div>
    </div>
    <div class="yun-progress__text" v-if="showText && !textInside" :style="{ fontSize: progressTextSize + 'px' }">
      <template v-if="!status">{{ percent }}%</template>
      <template v-else>
        <slot v-if="status === 'text'"></slot>
        <yun-icon v-else :name="iconClass"></yun-icon>
      </template>
    </div>
  </div>
</template>

<script>
import YunIcon from '../icon/icon'

export default {
  name: 'YunProgress',
  components: { YunIcon },
  props: {
    percent: {
      type: Number,
      default: 0,
      required: true,
      validator: val => val >= 0 && val <= 100,
    },
    status: {
      type: String,
      validator: value => ['text', 'success', 'exception'].includes(value),
    },
    strokeWidth: Number,
    textInside: Boolean,
    showText: {
      type: Boolean,
      default: true,
    },
    bgColor: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    radius: String,
    active: Boolean,
  },
  computed: {
    barOutStyle() {
      return {
        height: this.strokeWidth + 'px',
        borderRadius: this.radius,
        backgroundColor: this.bgColor,
      }
    },
    barStyle() {
      return {
        width: this.percent + '%',
        backgroundColor: this.color,
        borderRadius: this.radius,
      }
    },
    iconClass() {
      return this.status === 'success' ? 'check-circle' : 'close-circle'
    },
    progressTextSize() {
      let size = 12 + this.strokeWidth * 0.4
      return size > 16 ? 16 : size
    },
  },
}
</script>
