export default {
  type: "ele-form-vxe-table",
  label: "表格组件",
  sort: 102,
  config: {
    url: "",
    attrs: {
      config: {
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
      data: {}
    },
    common: {
      config: {},
      data: {}
    }
  }
};
