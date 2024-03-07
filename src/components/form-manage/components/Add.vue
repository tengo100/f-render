<template>
  <el-dialog
    :title="title"
    :visible.sync="dialog.isShow"
    width="531px"
    top="70px"
    :close-on-click-modal="false"
    :modal="false"
    fullscreen
    @open="openDialog"
  >
    <div>
      <ele-form
        v-if="rendered"
        v-model="formData"
        v-bind="formConfig"
        :span="24"
        ref="form"
        :request-fn="handleRequest"
        @request-success="handleSuccess"
      ></ele-form>
    </div>
    <div slot="footer">
      <el-button type="primary" @click="addPosition">确 定</el-button>
      <el-button @click="dialog.isShow = false">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "Add",
  data() {
    return {
      dialog: {
        isShow: false
      },
      rendered: false,
      title: "新增",
      formData: { lngdataviewid: "" },
      formConfig: {}
    };
  },
  methods: {
    show() {
      this.dialog.isShow = true;
    },
    handleRequest() {
      return this.$axios
        .request({
          url: "http://127.0.0.1:9999/xlyk/xlykdesign/dataview/add",
          method: "post",
          data: this.formData
        })
        .then(res => {
          if (res.code === 1) {
            this.$message.success("操作成功");
            this.dialog.isShow = false;
            this.$emit("refresh");
          }
        });
    },
    handleSuccess() {
      // this.$message.success("提交成功");
    },
    getForm(lngdataviewid) {
      this.$axios
        .request({
          url: `http://127.0.0.1:9999/xlyk/xlykdesign/dataview/findbyid?lngdataviewid=${lngdataviewid}`,
          method: "get"
        })
        .then(res => {
          if (res.code === 1) {
            this.formConfig = JSON.parse(res.data[0].strformjson) || {};
            this.rendered = true;
          }
        });
    },
    // 新增
    addPosition() {
      this.$refs.form.handleSubmitForm();
    },
    resetForm() {},

    openDialog() {
      this.getForm(8);
    }
  }
};
</script>
