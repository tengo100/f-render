<script>
import fRenderMixin from "f-render/utils/fRenderMixin.js";
export default {
  mixins: [fRenderMixin],
  props: {
    submitFn: {
      type: Function,
      default: () => {}
    },
    beforeSubmit: {
      type: Function,
      default: () => {}
    },
    formatter: {
      type: Function,
      default: data => {
        return data;
      }
    },
    dialogDesc: {
      type: Object,
      default: () => {
        return {};
      }
    },
    dialogConfig: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>
