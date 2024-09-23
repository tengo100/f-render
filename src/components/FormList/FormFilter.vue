<template>
  <ele-form
    ref="fForm"
    :is-show-submit-btn="false"
    :is-show-back-btn="false"
    :form-data="formData"
    :form-desc="formDesc"
    label-position="left"
    :request-fn="handleRequest"
    inline
  />
</template>
<script>
export default {
  props: {
    formDesc: {
      type: Object,
      default: () => {
        return {};
      }
    },
    formConfig: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      formData: {}
    };
  },
  mounted() {
    if (!this.formConfig.noInitSearch) {
      this.$emit("search", this.formData);
    }
  },
  methods: {
    handleRequest(data) {
      this.$emit("search", data);
    }
  }
};
</script>
