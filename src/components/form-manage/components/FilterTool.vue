<template>
  <el-form
    label-position="left"
    label-width="80px"
    :model="formInline"
    class="demo-form-inline"
    size="small"
    inline
  >
    <el-form-item label="表单名称">
      <el-input
        v-model="formInline.strdataviewname"
        placeholder="请输入表单名称"
      />
    </el-form-item>
    <el-form-item class="drawerBtn">
      <el-button type="primary" icon="el-icon-search" @click="onSubmit"
        >查询</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: "FilterTool",
  data() {
    return {
      formInline: {
        strdataviewname: ""
      }
    };
  },
  created() {},
  methods: {
    onSubmit() {
      this.$emit("search", this.formInline);
    }
  }
};
</script>
