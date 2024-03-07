<template>
  <div class="tool">
    <el-button icon="el-icon-plus" size="small" type="primary" @click="Add"
      >新增</el-button
    >
  </div>
</template>
<script>
export default {
  name: "Header",
  methods: {
    Add() {
      this.$emit("add");
    }
  }
};
</script>
