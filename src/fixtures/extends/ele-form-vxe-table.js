const crudColumn = {
  width: 60,
  type: "crud",
  slots: {
    header: "crud_header",
    default: "crud_default"
  }
};
const seqColumn = {
  type: "seq",
  title: "序号",
  width: 60
};
export default {
  type: "ele-form-vxe-table",
  label: "表格组件",
  sort: 102,
  config: {
    url: "",
    attrs: {
      config: {
        child: {
          type: "select",
          label: "引入子表",
          prop: {
            text: "strdataviewname",
            value: "lngdataviewid"
          },
          options: async () => {
            const res = await fetch(
              "http://localhost:9999/xlyk/xlykdesign/dataview/search"
            ).then(response => response.json());
            return res.data;
          },
          on: {
            select: option => {
              const frender = window.__frender;
              const index = frender.currentIndex;
              const res = eval("(" + option.strformjson + ")");
              const formDesc = res.formDesc;
              const columns = [];
              const filterColumns = frender.formItemList[
                index
              ].attrs.columns.filter(col => ["seq", "crud"].includes(col.type));
              Object.keys(formDesc).forEach(prop => {
                columns.push({
                  field: prop,
                  title: formDesc[prop].label,
                  editRender: {
                    name: formDesc[prop].type,
                    attrs: formDesc[prop].attrs,
                    events: formDesc[prop].on,
                    options: formDesc[prop].options,
                    optionProps: formDesc[prop].prop
                  }
                });
              });
              frender.formItemList[index].attrs.columns = [
                ...filterColumns,
                ...columns
              ];
            }
          }
        },
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
        isSeq: {
          type: "switch",
          label: "是否显示序号",
          default: true,
          span: 24,
          on: {
            change: val => {
              const frender = window.__frender;
              const index = frender.currentIndex;
              if (val) {
                if (frender.formItemList[index].attrs.isCrud) {
                  frender.formItemList[index].attrs.columns.splice(
                    1,
                    0,
                    seqColumn
                  );
                } else {
                  frender.formItemList[index].attrs.columns.unshift(seqColumn);
                }
              } else {
                if (frender.formItemList[index].attrs.isCrud) {
                  frender.formItemList[index].attrs.columns.splice(1, 1);
                } else {
                  frender.formItemList[index].attrs.columns.shift();
                }
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
        columns: [crudColumn, seqColumn]
      }
    },
    common: {
      config: {},
      data: {}
    }
  }
};
