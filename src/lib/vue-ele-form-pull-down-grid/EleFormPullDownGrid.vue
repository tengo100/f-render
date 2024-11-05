<template>
  <PullDownGrid
    v-model="newValue"
    v-bind="computedAttrs"
    :class="desc.class"
    :style="desc.style"
    v-on="onEvents"
  ></PullDownGrid>
</template>

<script>
import formMixin from "../vue-ele-form/mixins/formMixin";
export default {
  name: "EleFormPullDownGrid",
  mixins: [formMixin],
  computed: {
    computedAttrs() {
      const pullGridAttrs = {};
      if (typeof this.desc.options === "function") {
        pullGridAttrs.selectApi = this.desc.options;
        pullGridAttrs.options = [];
      } else if (Array.isArray(this.desc.options)) {
        pullGridAttrs.options = this.desc.options;
      }
      // 处理options未promise不在linkfield里面也调接口的问题
      this.$set(this.desc, "_options", []);
      return {
        ...this.attrs,
        ...pullGridAttrs
      };
    }
  }
};
</script>
