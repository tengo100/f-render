export default {
  data() {
    return {
      formData: {},
      order: [],
      isLoading: false,
      saveLoading: false,
      visible: false,
      title: "新增",
      disabled: false
    };
  },
  mounted() {
    // 模拟异步加载
  },
  watch: {
    visible(val) {
      if (!val) {
        this.$refs.fForm.resetForm();
      }
    },
    "dialogConfig.pageType": {
      handler(val) {
        switch (val) {
          case "add":
            (() => {
              this.title = "新增";
              this.disabled = false;
            })();
            break;
          case "edit":
            (() => {
              this.title = "编辑";
              this.disabled = false;
            })();
            break;
          case "detail":
            (() => {
              this.title = "查看";
              this.disabled = true;
            })();
            break;
          case "other":
            (() => {
              this.title = this.dialogConfig.title;
            })();
            break;
        }
      }
    }
  },
  methods: {
    handleSubmit(data) {
      if (this.isLoading) return;
      if (this.beforeSubmit(data) === false) {
        return false;
      }
      this.isLoading = true;
      this.saveLoading = true;
      const { key, value } = this.dialogConfig.primary;
      data[key] = value;
      if (this.dialogConfig.extra) {
        data[this.dialogConfig.extra.key] = this.dialogConfig.extra.value;
      }
      const submitData = this.formatter(data);
      this.submitFn(submitData)
        .then(res => {
          if (res.code === 20000) {
            this.$message.success(res.message);
            this.$emit("refresh");
            this.visible = false;
          } else if (res.code === 20010) {
            this.$confirm(res.message, "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                this.dialogConfig.extra.value = 1;
                this.dialogConfig.inttype = 1;
                this.handleSubmit(data);
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消"
                });
              });
          }
        })
        .finally(() => {
          this.isLoading = false;
          this.saveLoading = false;
        });
    },
    handleSuccess() {},
    triggerRequest() {
      this.$refs.fForm.handleSubmitForm();
    },
    triggerCancel() {
      this.visible = false;
    },
    showHideDialog(value) {
      this.visible = value;
    },
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
    closeEvent() {
      this.$emit("close");
    },
    openedEvent() {
      this.$emit("opened");
    }
  },
  render(h) {
    return h(
      "el-dialog",
      {
        props: {
          title: this.title,
          visible: this.visible,
          customClass: "ys",
          modal: false,
          closeOnClickModal: false,
          width: this.dialogConfig.width || "800px"
        },
        on: {
          "update:visible": this.showHideDialog,
          close: this.closeEvent,
          opened: this.openedEvent
        }
      },
      [
        h(
          "ele-form",
          {
            props: {
              isLoading: this.isLoading,
              isDialog: true,
              disabled: this.disabled,
              visible: this.visible,
              labelPosition: this.dialogConfig.labelPosition || "left",
              formData: this.formData,
              requestFn: this.handleSubmit,
              formDesc: this.dialogDesc,
              order: this.order,
              isShowSubmitBtn: false,
              isShowCancelBtn: false,
              isShowErrorNotify: false
            },
            ref: "fForm",
            on: {
              "update:visible": this.showHideDialog,
              input: $event => {
                this.formData = $event;
              }
            }
          },
          [h("template", { slot: "form-footer" }, this.$slots.dialogmore)]
        ),
        this.disabled
          ? h()
          : h("template", { slot: "footer" }, [
              h(
                "el-button",
                {
                  props: { type: "primary", loading: this.saveLoading },
                  on: { click: this.triggerRequest }
                },
                "确定"
              ),
              h("el-button", { on: { click: this.triggerCancel } }, "取消")
            ])
      ]
    );
  }
};
