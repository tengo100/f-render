<template>
  <div>
    <el-table
      ref="table"
      v-loading="listLoading"
      :header-cell-style="{ background: '#F5F4F7' }"
      :data="tableData"
      border
      fit
      stripe
      highlight-current-row
      :height="tableHeight"
      style="width: 100%;"
      :class="{ 'no-operate': tableDesc.noOperate }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="tableDesc.selection"
        type="selection"
        width="50"
        align="center"
      />
      <el-table-column
        v-if="tableDesc.seq || true"
        type="index"
        width="60"
        label="序号"
        align="center"
      />
      <el-table-column
        v-for="(item, index) in tableDesc.tableItems"
        :key="index"
        v-bind="item"
      />
      <el-table-column
        v-if="tableDesc.status"
        fixed="right"
        align="center"
        label="启用/停用"
        width="100"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.blnisinactive"
            active-color="#30b08f"
            inactive-color="#B7B7B7"
            :active-value="0"
            :inactive-value="1"
            @change="dispatch(componentName, 'changeState', scope)"
          />
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableDesc.btns.length"
        label="操作"
        :width="btnColumnWidth"
        align="center"
        class-name="mb0"
        fixed="right"
      >
        <template v-slot="scope">
          <el-button
            v-for="(item, index) in computedBtns(scope.row)"
            :key="index"
            type="text"
            :disabled="item.disabled"
            @click="
              item.customEvent
                ? dispatch(componentName, item.customEvent.name, scope)
                : noop
            "
            >{{ item.title }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-if="tableDesc.pagination"
      background
      :current-page.sync="paging.page"
      :page-sizes="tableDesc.pageSizes || [10, 20, 30, 40]"
      :page-size.sync="paging.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="paging.total"
      @size-change="queryListByPage('search')"
      @current-change="queryListByPage"
    />
  </div>
</template>
<script>
import emitter from "f-render/utils/emitter.js";
import calculateCommonTableHeight from "f-render/utils/calculateCommonTableHeight";
export default {
  mixins: [calculateCommonTableHeight, emitter],
  inject: ["componentName"],
  props: {
    tableDesc: {
      type: Object,
      default: () => {}
    },
    queryFn: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      tableData: [],
      listLoading: false,
      searchForm: {},
      paging: {
        page: 1,
        size: 10,
        total: 0
      },
      offset: this.tableDesc.offset + 3 || 120
    };
  },
  computed: {
    btnColumnWidth() {
      return (
        this.tableDesc.btns.reduce((acc, cur) => {
          acc += cur.title;
          return acc;
        }, "").length * 30
      );
    }
  },
  activated() {
    this.$nextTick(() => {
      this.$refs.table && this.$refs.table.doLayout();
    });
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit("selection-change", val);
    },
    computedBtns(row) {
      let arr = [];
      arr = this.tableDesc.btns
        .slice(0)
        .map(item => {
          if (item.vif) {
            item.vif = row[item.vif.key] * 1 === item.vif.value * 1;
          }
          if (item.disabled) {
            item.disabled =
              row[item.disabled.key] * 1 === item.disabled.value * 1;
          }
          return item;
        })
        .filter(item => item.vif !== false);
      return arr;
    },
    // 获取列表查询
    query(searchForm) {
      if (!this.tableDesc.requiredList) {
        this.tableDesc.requiredList = [];
      }
      const keys = this.tableDesc.requiredList.map(item => item.key);
      if (
        keys.some(el => {
          if (!searchForm[el]) {
            const one = this.tableDesc.requiredList.find(
              item => item.key === el
            );
            this.$message.error(one.message);
            return true;
          }
        })
      ) {
        return false;
      }
      this.searchForm = JSON.parse(JSON.stringify(searchForm));
      this.paging.page = 1;
      this.queryListByPage();
    },
    async queryListByPage(str) {
      if (str === "search") {
        this.paging.page = 1;
      }
      try {
        this.listLoading = true;
        let res = null;
        if (this.tableDesc.pagination) {
          res = await this.queryFn(
            this.searchForm,
            this.paging.page,
            this.paging.size
          );
        } else {
          res = await this.queryFn(this.searchForm);
        }
        if (res.code === 20000) {
          if (this.tableDesc.pagination) {
            this.tableData = res.data.rows;
            this.paging.total = res.data.total;
          } else {
            this.tableData = res.data;
          }
          this.$nextTick(() => {
            this.$refs.table.doLayout();
          });
        }
      } finally {
        this.listLoading = false;
      }
    }
  }
};
</script>
