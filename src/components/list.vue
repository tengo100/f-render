<template>
  <div>
    <FormList
      ref="FormList"
      v-if="isRendered"
      :header-btns="headerBtns"
      :form-desc="formDesc"
      :table-desc="tableDesc"
      :dialog-desc="dialogDesc"
      :dialog-config="dialogConfig"
      :query-fn="queryFn"
      :submit-fn="submitFn"
      :formatter="formatterFn"
    >
      <!-- 这里可以传dialog的额外内容 在按钮上 表单下 -->
      <!-- <template slot="headermore">
      </template> -->
    </FormList>
  </div>
</template>
<script>
import FormList from "f-render/components/FormList";
const componentName = "Comment";
export default {
  name: componentName,
  componentName: componentName,
  components: { FormList },
  provide() {
    return {
      componentName
    };
  },
  data() {
    return {
      isRendered: false,
      submitFn: () => {},
      queryFn: () => {},
      delFn: () => {},
      // 按钮
      headerBtns: [
        {
          title: "新增",
          icon: "el-icon-plus",
          loading: false,
          customEvent: {
            name: "add",
            cb: this.addEvent
          }
        }
      ],
      // 查询条件
      formDesc: {},
      // 表格
      tableDesc: {
        selection: false,
        pagination: true,
        offset: 110,
        status: false,
        tableItems: [],
        btns: [
          {
            title: "编辑",
            customEvent: {
              name: "edit",
              cb: this.editEvent
            }
          },
          {
            title: "删除",
            customEvent: {
              name: "del",
              cb: this.delEvent
            }
          }
        ]
      },
      // dialog
      dialogConfig: {
        width: "500px",
        pageType: "",
        primary: {
          key: "lngindextypeid",
          value: ""
        },
        extra: {
          key: "inttype",
          value: 0
        }
      },
      dialogDesc: {}
    };
  },
  computed: {
    primaryKey() {
      return this.dialogConfig.primary.key;
    }
  },
  created() {
    this.headerBtns.concat(this.tableDesc.btns).forEach(item => {
      this.$on(item.customEvent.name, item.customEvent.cb);
    });
    // 启用停用
    this.$on("changeState", this.changeState);
    this.getForm(20);
  },
  destroyed() {
    this.$off("changeState", this.changeState);
    this.headerBtns.concat(this.tableDesc.btns).forEach(item => {
      this.$off(item.customEvent.name, item.customEvent.cb);
    });
  },
  methods: {
    getForm(lngdataviewid) {
      this.$axios
        .request({
          url:
            this.$BaseUrl +
            "/xlyk/xlykdesign/dataview/findbyid?lngdataviewid=" +
            lngdataviewid,
          method: "get"
        })
        .then(res => {
          if (res.code === 1) {
            const data = res.data[0];
            const strformjson = eval(`(${data.strformjson})`);
            this.submitFn = strformjson.requestFn;
            this.queryFn = strformjson.queryFn;
            this.formDesc = Object.assign(
              { ...strformjson.formDesc },
              {
                query: {
                  type: "button",
                  label: "查询",
                  title: "查询",
                  style: { width: "80px" },
                  layout: 1,
                  isShowLabel: false,
                  attrs: {
                    type: "primary",
                    icon: "el-icon-search"
                  },
                  on: {
                    // 按钮事件触发
                    click: async () => {
                      await this.$refs.FormList.query();
                    }
                  }
                }
              }
            );
            this.tableDesc.tableItems = data.dataviewfield.map(item => {
              return {
                prop: item.strdataviewfieldcode,
                label: item.strdataviewfieldname,
                sortable: true
              };
            });
            this.dialogDesc = Object.assign(
              { ...strformjson.formDesc },
              {
              }
            );
            this.isRendered = true;
          }
        });
    },
    dialogShow() {
      this.$refs.FormList.$refs.FormDialog.show();
    },
    formatterFn(data) {
      return data;
    },
    changeState() {
      // const { row } = scope;
      // updateBlnisinactiveFn(row).then(res => {
      //   if (res.code === 20000) {
      //     this.$message.success(res.message);
      //     this.$refs.FormList.reloadTableData();
      //   }
      // });
    },
    async addEvent() {
      this.$refs.FormList.resetDialog();
      this.dialogConfig.primary.value = "";
      this.dialogConfig.extra.value = 0;
      this.dialogConfig.pageType = "add";
      // const list = await getIndextypeTree({
      //   blnisinactive: this.dialogConfig.pageType === "add" ? 0 : ""
      // });
      // this.dialogDesc.lngparentid.options = list.data;
      this.dialogShow();
    },
    async editEvent(scope) {
      const { row } = scope;
      row["lngparentid"] = row["lngparentid"] === 0 ? "" : row["lngparentid"];
      this.$refs.FormList.fillDialog(row);
      this.$refs.FormList.$refs.FormDialog.formData.blnisdetail =
        row.blnisdetail;
      this.dialogDesc.lngparentid.disabled = true;
      this.dialogConfig.primary.value = row[this.dialogConfig.primary.key];
      this.dialogConfig.extra.value = 1;
      this.dialogConfig.pageType = "edit";
      // const list = await getIndextypeTree({
      //   blnisinactive: this.dialogConfig.pageType === "add" ? 0 : ""
      // });
      // this.dialogDesc.lngparentid.options = list.data;
      this.dialogShow();
    },
    delEvent() {
      this.$confirm("确认要删除该指标类别吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // deleteFn(scope.row[this.dialogConfig.primary.key]).then(res => {
          //   if (res.code === 20000) {
          //     this.$message.success(res.message);
          //     this.$refs.FormList.reloadTableData();
          //   }
          // });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style>
.el-col-md-33 {
  display: none;
}
</style>
