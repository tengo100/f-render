export default {
  type: "ele-form-pull-down-grid",
  label: "下拉形式",
  sort: 103,
  config: {
    url: "",
    attrs: {
      config: {
        params: {
          type: "data-editor",
          label: "请求参数",
          attrs: {
            types: ["object"],
            rows: 4
          }
        },
        optionProps: {
          type: "data-editor",
          label: "下拉配置项",
          attrs: {
            types: ["object"],
            rows: 4
          }
        },
        columns: {
          type: "data-editor",
          label: "列配置",
          attrs: {
            types: ["array"],
            rows: 4
          }
        },
        gridType: {
          type: "select",
          label: "类型",
          options: [
            { label: "列表", value: "list" },
            { label: "分页", value: "page" },
            { label: "树形", value: "tree" }
          ]
        },
        multiple: {
          type: "switch",
          label: "是否多选"
        },
        lastStage: {
          type: "switch",
          label: "是否末级"
        },
        checkStrictly: {
          type: "switch",
          label: "是否父子关联"
        },
        checkAllLabel: {
          type: "input",
          label: "全选后显示的文字"
        },
        isOnlyLeaf: {
          type: "switch",
          label: "是否只显示叶子节点"
        },
        showAllLabel: {
          type: "switch",
          label: "是否全选文本"
        },
        clearable: {
          type: "switch",
          label: "是否可清空"
        },
        filterable: {
          type: "switch",
          label: "是否可搜索"
        },
        checkField: {
          type: "input",
          label: "选中标志"
        },
        labelField: {
          type: "input",
          label: "多选列字段"
        }
      },
      data: {
        columns: [
          {
            title: "编码",
            field: "strcode",
            minWidth: "140px",
            showOverflow: true
          },
          {
            title: "名称",
            field: "strname",
            minWidth: "100px",
            showOverflow: true
          }
        ],
        optionProps: {
          value: "id",
          label: "strdisplaytext",
          children: "children",
          disabled: "blnisinactive",
          hasChild: "haschild",
          parentKey: "lngparentid",
          level: "intlevel"
        },
        gridType: "list",
        multiple: false,
        lastStage: true,
        checkStrictly: false,
        checkAllLabel: "所有",
        isOnlyLeaf: false,
        showAllLabel: true,
        clearable: true,
        filterable: true,
        checkField: "choose",
        labelField: "strcode"
      }
    },
    common: {
      config: {
        default: {
          type: "textarea",
          label: "默认值"
        }
      },
      data: {
        isOptions: true,
        options: data => {
          return fetch("/xlyk-api/hrmanage/bsform/findAll", {
            method: "post",
            headers: {
              "X-Token": sessionStorage.getItem("X-Token"),
              "Content-Type": "application/json"
            },
            body: JSON.stringify({})
          }).then(response => response.json());
        }
      }
    }
  }
};
