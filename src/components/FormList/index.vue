<template>
  <card>
    <template #header>
      <FormHeader ref="FormHeader" :header-btns="headerBtns">
        <template slot="headermore">
          <slot name="headermore" />
        </template>
      </FormHeader>
    </template>
    <template #filter>
      <FormFilter
        ref="FormFilter"
        :form-desc="formDesc"
        :form-config="formConfig"
        @search="searchEvent"
      />
    </template>
    <FormTable
      ref="FormTable"
      :table-desc="tableDesc"
      :query-fn="queryFn"
      @selection-change="handleSelectionChange"
    />
    <FormDialog
      ref="FormDialog"
      :dialog-desc="dialogDesc"
      :dialog-config="dialogConfig"
      :submit-fn="submitFn"
      :before-submit="beforeSubmit"
      :formatter="formatter"
      @refresh="refreshEvent"
      @close="closeEvent"
      @opened="openedEvent"
    >
      <template slot="dialogmore">
        <slot name="dialogmore" v-bind="attrs" />
      </template>
    </FormDialog>
  </card>
</template>
<script>
import FormHeader from "./FormHeader";
import FormFilter from "./FormFilter";
import FormTable from "./FormTable";
import FormDialog from "./FormDialog";
export default {
  name: "FormList",
  componentName: "FormList",
  components: {
    FormHeader,
    FormFilter,
    FormTable,
    FormDialog
  },
  props: {
    headerBtns: {
      type: Array,
      default: () => []
    },
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
    },
    tableDesc: {
      type: Object,
      default: () => {
        return {};
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
    },
    queryFn: {
      type: Function,
      default: () => {}
    },
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
    }
  },
  data() {
    return {
      attrs: {}
    };
  },
  mounted() {
    this.attrs = this.$refs.FormDialog.formData;
  },
  methods: {
    // 查询列表
    searchEvent(searchForm) {
      this.$refs.FormTable.query(searchForm);
    },
    // 刷新
    refreshEvent() {
      this.$refs.FormTable.queryListByPage();
    },
    // 关闭弹窗事件
    closeEvent() {
      this.$emit("close");
    },
    // 打开弹窗后事件
    openedEvent() {
      this.$emit("opened");
    },
    // 改变table选择事件
    handleSelectionChange(val) {
      this.$emit("selection-change", val);
    },
    // 重新查询加载table
    reloadTableData() {
      this.refreshEvent();
    },
    // 显示弹窗
    dialogShow() {
      this.$refs.FormDialog.show();
    },
    // filter 查询事件
    async query() {
      await this.$refs.FormFilter.$refs.fForm.handleSubmitForm();
    },
    // 重置dialog字段
    resetDialog() {
      Object.keys(this.dialogDesc).forEach(p => {
        this.$set(
          this.$refs.FormDialog.formData,
          p,
          this.dialogDesc[p].default
        );
      });
    },
    fillDialog(data) {
      Object.keys(this.dialogDesc).forEach(p => {
        this.$set(this.$refs.FormDialog.formData, p, data[p]);
      });
    }
  }
};
</script>
<style scoped>
.reset-card {
  overflow: hidden;
}
</style>
