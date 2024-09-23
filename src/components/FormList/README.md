### 增删改查组件

props

headerBtns:  头部按钮数组

demo
```javascript
headerBtns: [
        { title: '新增', icon: 'el-icon-plus', loading: false, customEvent: { name: 'add', cb: async(param) => {
         // 弹窗默认值初始化
          Object.keys(this.dialogDesc).forEach(p => {
            this.$set(this.$refs.FormList.$refs.FormDialog.formData, p, this.dialogDesc[p].default)
          })
          // 主键清空
          this.dialogConfig.primary.value = ''
          this.dialogConfig.extra.value = 0
          this.dialogDesc.lngparentid.disabled = false
          this.dialogConfig.pageType = 'add'
          const list = await getIndextypeTree({
            'blnisinactive': this.dialogConfig.pageType === 'add' ? 0 : ''
          })
          this.dialogDesc.lngparentid.options = list.data
          this.dialogShow()
        } }}

      ],
```

formDesc: filter 区域查询条件生成

demo
```javascript
// 查询条件
      formDesc: {
        strindextypecode: {
          type: 'input',
          label: '指标类别编码',
          layout: 30,
          labelWidth: '100px',
          style: { width: '150px' }
        },
        strindextypename: {
          type: 'input',
          label: '指标类别名称',
          layout: 30,
          labelWidth: '100px',
          style: { width: '150px' }
        },
        blnisinactive: {
          type: 'select',
          label: '状态',
          prop: {
            text: 'label',
            value: 'value'
          },
          attrs: {
            clearable: false,
            filterable: true
          },
          default: 0,
          layout: 30,
          labelWidth: '50px',
          style: { width: '100px' },
          options: [
            { label: '全部', value: '' },
            { label: '启用', value: 0 },
            { label: '停用', value: 1 }
          ]
        },
        query: {
          type: 'button',
          label: '查询',
          title: '查询',
          style: { width: '80px' },
          layout: 1,
          isShowLabel: false,
          attrs: {
            type: 'primary',
            icon: 'el-icon-search'
          },
          on: {
            // 按钮事件触发
            click: async() => {
              await this.$refs.FormList.$refs.FormFilter.$refs.fForm.handleSubmitForm()
            }
          }
        }

      },
```

formConfig: filter的配置项 目前支持 noInitSearch传参 默认值false  传true表示加载页面默认不查询

tableDesc: tablearea区域的生成配置对象

selection  默认fale 是否显示可勾选的checkbox列

pagination: 默认true 开启分页查询

offset: 调整table的高度

status: 默认true 是否显示停启用列

tableItems:  []  配置table的列信息
btns:[] 配置操作列按钮


demo
```javascript
// 表格
      tableDesc: {
        selection: false,
        pagination: true,
        offset: 147,
        status: true,
        tableItems: [
          { prop: 'strindextypecode', label: '指标类别编码' },
          { prop: 'strindextypename', label: '指标类别名称' },
          { prop: 'strparentname', label: '上级' },
          { prop: 'strnote', label: '备注' }
        ],
        btns: [
          {
            title: '编辑', customEvent: { name: 'edit', cb: async(scope) => {
              const { row } = scope
              row['lngparentid'] = row['lngparentid'] === 0 ? '' : row['lngparentid']
              Object.keys(this.dialogDesc).forEach(p => {
                this.$set(this.$refs.FormList.$refs.FormDialog.formData, p, row[p])
              })
              this.$refs.FormList.$refs.FormDialog.formData.blnisdetail = row.blnisdetail
              this.dialogDesc.lngparentid.disabled = true
              this.dialogConfig.primary.value = row[this.dialogConfig.primary.key]
              this.dialogConfig.extra.value = 1
              this.dialogConfig.pageType = 'edit'
              const list = await getIndextypeTree({
                'blnisinactive': this.dialogConfig.pageType === 'add' ? 0 : ''
              })
              this.dialogDesc.lngparentid.options = list.data
              this.dialogShow()
            } }
          },
          { title: '删除', customEvent: { name: 'del', cb: async(scope) => {
            this.$confirm('确认要删除该指标类别吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              deleteFn(scope.row[this.dialogConfig.primary.key]).then(res => {
                if (res.code === 20000) {
                  this.$message.success(res.message)
                  this.$refs.FormList.$refs.FormTable.queryListByPage()
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
          } }}

        ]
      },
```

dialogDesc： 新增编辑弹窗配置


```javascript
dialogDesc: {
        'strindextypecode': {
          default: '',
          type: 'input',
          label: '指标类别编码',
          required: true,
          layout: 24
        },
        'strindextypename': {
          default: '',
          type: 'input',
          label: '指标类别名称',
          required: true,
          layout: 24
        },
        'lngparentid': {
          type: CustomTSelect,
          label: '上级',
          default: '',
          disabled: false,
          isReloadOptions: true,
          options: []
        },
        'strnote': {
          default: '',
          type: 'textarea',
          label: '备注',
          layout: 24
        },
        'lngindextypeid': {
          default: 0,
          type: 'input',
          label: '',
          layout: 33,
          disabled: true,
          isShowLabel: false,
          style: {
            display: 'none'
          }
        }
      }
    }
```

dialogConfig： 弹窗额外配置参数

width: 弹窗的宽度
pageType: 新增编辑查看
primary: 主键
extra: 额外的参数
```javascript
  // dialog
      dialogConfig: {
        width: '500px',
        pageType: '',
        primary: {
          key: 'lngindextypeid',
          value: ''
        },
        extra: {
          key: 'inttype',
          value: 0
        }
      },
```

一个完整的实例

```javascript
<template>
  <div>
    <FormList
      ref="FormList"
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
import FormList from '@/base/components/FormList'
import { findSearchPageFn, addOrUpdateFn, updateBlnisinactiveFn, deleteFn, getIndextypeTree } from '@/api/operational-indicator-budget/basic-setting/index-category'
import CustomTSelect from '@/components/CustomTSelect'
const componentName = 'IndexCategory'
export default {
  name: componentName,
  componentName: componentName,
  components: { FormList },
  provide() {
    return {
      componentName
    }
  },
  data() {
    return {
      submitFn: addOrUpdateFn,
      queryFn: findSearchPageFn,
      delFn: () => {},
      // 按钮
      headerBtns: [
        { title: '新增', icon: 'el-icon-plus', loading: false, customEvent: { name: 'add', cb: async(param) => {
          Object.keys(this.dialogDesc).forEach(p => {
            this.$set(this.$refs.FormList.$refs.FormDialog.formData, p, this.dialogDesc[p].default)
          })

          this.dialogConfig.primary.value = ''
          this.dialogConfig.extra.value = 0
          this.dialogDesc.lngparentid.disabled = false
          this.dialogConfig.pageType = 'add'
          const list = await getIndextypeTree({
            'blnisinactive': this.dialogConfig.pageType === 'add' ? 0 : ''
          })
          this.dialogDesc.lngparentid.options = list.data
          this.dialogShow()
        } }}

      ],
      // 查询条件
      formDesc: {
        strindextypecode: {
          type: 'input',
          label: '指标类别编码',
          layout: 30,
          labelWidth: '100px',
          style: { width: '150px' }
        },
        strindextypename: {
          type: 'input',
          label: '指标类别名称',
          layout: 30,
          labelWidth: '100px',
          style: { width: '150px' }
        },
        blnisinactive: {
          type: 'select',
          label: '状态',
          prop: {
            text: 'label',
            value: 'value'
          },
          attrs: {
            clearable: false,
            filterable: true
          },
          default: 0,
          layout: 30,
          labelWidth: '50px',
          style: { width: '100px' },
          options: [
            { label: '全部', value: '' },
            { label: '启用', value: 0 },
            { label: '停用', value: 1 }
          ]
        },
        query: {
          type: 'button',
          label: '查询',
          title: '查询',
          style: { width: '80px' },
          layout: 1,
          isShowLabel: false,
          attrs: {
            type: 'primary',
            icon: 'el-icon-search'
          },
          on: {
            // 按钮事件触发
            click: async() => {
              await this.$refs.FormList.$refs.FormFilter.$refs.fForm.handleSubmitForm()
            }
          }
        }

      },
      // 表格
      tableDesc: {
        selection: false,
        pagination: true,
        offset: 147,
        status: true,
        tableItems: [
          { prop: 'strindextypecode', label: '指标类别编码' },
          { prop: 'strindextypename', label: '指标类别名称' },
          { prop: 'strparentname', label: '上级' },
          { prop: 'strnote', label: '备注' }
        ],
        btns: [
          {
            title: '编辑', customEvent: { name: 'edit', cb: async(scope) => {
              const { row } = scope
              row['lngparentid'] = row['lngparentid'] === 0 ? '' : row['lngparentid']
              Object.keys(this.dialogDesc).forEach(p => {
                this.$set(this.$refs.FormList.$refs.FormDialog.formData, p, row[p])
              })
              this.$refs.FormList.$refs.FormDialog.formData.blnisdetail = row.blnisdetail
              this.dialogDesc.lngparentid.disabled = true
              this.dialogConfig.primary.value = row[this.dialogConfig.primary.key]
              this.dialogConfig.extra.value = 1
              this.dialogConfig.pageType = 'edit'
              const list = await getIndextypeTree({
                'blnisinactive': this.dialogConfig.pageType === 'add' ? 0 : ''
              })
              this.dialogDesc.lngparentid.options = list.data
              this.dialogShow()
            } }
          },
          { title: '删除', customEvent: { name: 'del', cb: async(scope) => {
            this.$confirm('确认要删除该指标类别吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              deleteFn(scope.row[this.dialogConfig.primary.key]).then(res => {
                if (res.code === 20000) {
                  this.$message.success(res.message)
                  this.$refs.FormList.$refs.FormTable.queryListByPage()
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
          } }}

        ]
      },
      // dialog
      dialogConfig: {
        width: '500px',
        pageType: '',
        primary: {
          key: 'lngindextypeid',
          value: ''
        },
        extra: {
          key: 'inttype',
          value: 0
        }
      },
      dialogDesc: {
        'strindextypecode': {
          default: '',
          type: 'input',
          label: '指标类别编码',
          required: true,
          layout: 24
        },
        'strindextypename': {
          default: '',
          type: 'input',
          label: '指标类别名称',
          required: true,
          layout: 24
        },
        'lngparentid': {
          type: CustomTSelect,
          label: '上级',
          default: '',
          disabled: false,
          isReloadOptions: true,
          options: []
        },
        'strnote': {
          default: '',
          type: 'textarea',
          label: '备注',
          layout: 24
        },
        'lngindextypeid': {
          default: 0,
          type: 'input',
          label: '',
          layout: 33,
          disabled: true,
          isShowLabel: false,
          style: {
            display: 'none'
          }
        }
      }
    }
  },
  computed: {
    primaryKey() {
      return this.dialogConfig.primary.key
    }
  },
  created() {
    this.headerBtns.concat(this.tableDesc.btns).forEach(item => {
      this.$on(item.customEvent.name, (param) => {
        item.customEvent.cb(param)
      })
    })
    // 启用停用
    this.$on('changeState', (param) => {
      this.changeState(param)
    })
  },
  methods: {
    dialogShow() {
      this.$refs.FormList.$refs.FormDialog.show()
    },
    formatterFn(data) {
      return data
    },
    changeState(scope) {
      const { row } = scope
      updateBlnisinactiveFn(row).then(res => {
        if (res.code === 20000) {
          this.$message.success(res.message)
          this.$refs.FormList.$refs.FormTable.queryListByPage()
        }
      })
    }
  }
}
</script>
<style>
.el-col-md-33{
  display: none;
}
</style>

```

备注： 此组件依赖vue-ele-form库  npm install vue-ele-form

文档 https://www.yuque.com/chaojie-vjiel/vbwzgu