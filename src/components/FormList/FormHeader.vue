<template>
  <div>
    <el-button
      v-for="(item, index) in headerBtns"
      :key="index"
      :icon="item.icon || ''"
      :type="item.type || 'primary'"
      :loading="item.loading"
      @click="
        item.customEvent
          ? dispatch(componentName, item.customEvent.name, item)
          : noop
      "
      >{{ item.title }}</el-button
    >
    <slot name="headermore" />
  </div>
</template>
<script>
import emitter from "f-render/utils/emitter.js";
export default {
  mixins: [emitter],
  inject: ["componentName"],
  props: {
    headerBtns: {
      type: Array,
      default: () => []
    }
  },
  mounted() {}
};
</script>
