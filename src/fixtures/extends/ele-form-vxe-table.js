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
            text: "strbsformname",
            value: "lngbstableid"
          },
          options: async () => {
            const res = await fetch(
              window.__frender.$BaseUrl + "/bsform/findAll",
              {
                method: "post",
                headers: {
                  "X-Token": window.__frender.$XToken,
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({})
              }
            ).then(response => response.json());
            return res.data;
          },
          on: {
            select: async option => {
              const rs = await fetch(
                window.__frender.$BaseUrl +
                  "/bsform/findFormSetting/" +
                  option.lngbsformid,
                {
                  method: "get",
                  headers: {
                    "X-Token": window.__frender.$XToken,
                    "Content-Type": "application/json"
                  }
                }
              ).then(response => response.json());
              const frender = window.__frender;
              const index = frender.currentIndex;
              const res = rs.data?.strformjson || { formDesc: {} };
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
        strbstablefieldname: {
          type: "select",
          label: "子表外键名称",
          optionsLinkageFields: ["child"],
          options: async data => {
            window.__frender.currentCompConfig.config.attrs.config.strbstablefieldnamem.options =
              window.__frender?.formItemCommon.config.field.options;
            const rs = await fetch(
              window.__frender.$BaseUrl + "/bstablefield/findAll",
              {
                method: "post",
                headers: {
                  "X-Token": window.__frender.$XToken,
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ lngbstableid: data.child })
              }
            ).then(response => response.json());
            return rs.data.map(item => {
              return {
                text: item.strfieldcomments,
                value: item.strfieldname,
                ...item
              };
            });
          }
        },
        strbstablefieldnamem: {
          type: "select",
          label: "父表主键名称",
          options: []
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
        columns: [crudColumn, seqColumn],
        strbstablefieldname: "",
        strbstablefieldnamem: ""
      }
    },
    common: {
      config: {},
      data: {}
    }
  }
};
