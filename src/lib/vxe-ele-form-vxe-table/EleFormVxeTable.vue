<template>
  <vxe-grid
    ref="grid"
    v-bind="computedAttrs"
    :class="desc.class"
    :style="desc.style"
    v-on="onEvents"
  >
    <template #crud_header="{}">
      <span style="cursor:pointer;color:red;" title="清空" @click="resetRow">
        <i class="el-icon-remove-outline" />
      </span>
      <span
        style="cursor:pointer;color:#00A99D;margin-left:5px;"
        title="添加"
        @click="addRow"
      >
        <i class="el-icon-circle-plus-outline" />
      </span>
    </template>
    <template #crud_default="{row, rowIndex }">
      <span style="cursor:pointer;color:red;" @click="delRow(row, rowIndex)">
        <i class="el-icon-remove-outline" />
      </span>
      <span
        style="cursor:pointer;color:#00A99D;margin-left:5px;"
        @click="addRow"
      >
        <i class="el-icon-circle-plus-outline" />
      </span>
    </template>
  </vxe-grid>
</template>

<script>
import formMixin from "../vue-ele-form/mixins/formMixin";
import { defaultGridOption } from "./default-grid-option";
export default {
  name: "EleFormVxeTable",
  mixins: [formMixin],
  computed: {
    computedAttrs() {
      return Object.assign(
        this.attrs,
        defaultGridOption,
        this.attrs.gridOption
      );
    }
  },
  methods: {
    async addRow() {
      const { tableData } = this.$refs.grid.getTableData();
      const intnum = tableData.length + 1;
      const { row: newRow } = await this.$refs.grid.insertAt(
        { intnum, ...this.$attrs["add-fields"] },
        -1
      );
      await this.$refs.grid.setActiveRow(newRow);
      this.$emit("addRow");
    },
    delRow(row) {
      this.$refs.grid.remove(row);
      this.$emit("delRow", row);
    },
    resetRow() {
      this.$confirm("确定要清空数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$refs.grid.remove();
          this.$emit("resetRow");
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped></style>
