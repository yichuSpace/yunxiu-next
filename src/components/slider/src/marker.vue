<script>
import { computed, h } from 'vue'

export default {
  name: 'YunMarker',
  props: {
    mark: {
      type: [String, Object],
      default: () => undefined,
    },
  },
  setup(props) {
    const label = computed(() => (typeof props.mark === 'string' ? props.mark : props.mark.label))

    return {
      label,
    }
  },
  render() {
    return h(
      'div',
      {
        class: 'yun-slider__marks-text',
        style: this.mark?.style,
      },
      this.label,
    )
  },
}
</script>
