<template>
  <vxe-grid
    v-bind="computedAttrs"
    :class="desc.class"
    :style="desc.style"
    v-on="onEvents"
  >
  </vxe-grid>
</template>

<script>
import formMixin from "../vue-ele-form/mixins/formMixin";
export default {
  name: "EleFormVxeTable",
  mixins: [formMixin],
  computed: {
    computedAttrs() {
      return Object.assign(this.attrs, this.attrs.gridOption);
    }
  }
};
</script>

<style scoped></style>
