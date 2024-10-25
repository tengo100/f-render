const crudColumn = {
  width: 60,
  slots: {
    header: "crud_header",
    default: "crud_default"
  }
};
export default {
  type: "ele-form-vxe-table",
  label: "表格组件",
  sort: 102,
  config: {
    url: "",
    attrs: {
      config: {
        isCrud: {
          type: "switch",
          label: "是否显示增删按钮",
          default: true,
          span: 24,
          on: {
            change: val => {
              const frender = window.__frender;
              const index = frender.currentIndex;
              if (val) {
                frender.formItemList[index].attrs.columns.unshift(crudColumn);
              } else {
                frender.formItemList[index].attrs.columns.shift();
              }
            }
          }
        },
        columns: {
          type: "data-editor",
          label: "表格列",
          attrs: {
            types: ["array"],
            showMore: true,
            formDesc: {
              // 配置弹窗内的表单
              codemirror: {
                type: "codemirror",
                label: ""
              }
            }
          }
        },
        data: {
          type: "data-editor",
          label: "表格数据",
          attrs: {
            types: ["array"]
          }
        },
        gridOption: {
          type: "data-editor",
          label: "表格配置",
          ref: "aabbcc",
          attrs: {
            types: ["object"],
            showMore: true,
            dialogAttrs: {
              fullscreen: true,
              "custom-class": "heightAuto"
            },
            formDesc: {
              // 配置弹窗内的表单
              codemirror: {
                type: "codemirror",
                label: ""
              }
            }
          }
        }
      },
      data: {
        columns: [crudColumn]
      }
    },
    common: {
      config: {},
      data: {}
    }
  }
};
