<template>
  <div>
    <el-table
      ref="table"
      :key="tableKey"
      v-loading="listLoading"
      :header-cell-style="{ background: '#F5F4F7' }"
      :data="list"
      border
      fit
      stripe
      highlight-current-row
      height="calc(100vh - 250px)"
      style="width: 100%;"
      size="mini"
    >
      <el-table-column
        type="index"
        width="50"
        label="序号"
        align="center"
        fixed
        show-overflow-tooltip
      >
        <template v-slot="scope">
          {{ scope.$index + (paging.page - 1) * paging.size + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="表单 ID"
        sortable
        width="200px"
        prop="lngdataviewid"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.lngdataviewid }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="表单名称" min-width="200px">
        <template slot-scope="scope">
          <span>{{ scope.row.strdataviewname }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="操作"
        width="150"
        class-name="small-padding fixed-width"
        fixed="right"
      >
        <template slot-scope="{ row }">
          <el-button
            type="text"
            :disabled="!!row.blnisinactive"
            @click="createTable(row)"
            >建表</el-button
          >
          <el-button
            type="text"
            :disabled="!!row.blnisinactive"
            @click="handleUpdate(row)"
            >编辑</el-button
          >
          <el-button
            type="text"
            :disabled="!!row.blnisinactive || row.lngdataviewid == 8"
            class="del"
            @click="delPosition(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-if="paging.total > 0"
      style="margin-top: 15px;float:right;"
      background
      :current-page.sync="paging.page"
      :page-size.sync="paging.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="paging.total"
      @size-change="queryListByPage()"
      @current-change="queryListByPage()"
    />
  </div>
</template>
<script>
export default {
  name: "TableArea",
  data() {
    return {
      list: [],
      tableKey: 0,
      listLoading: false,
      formInline: {
        strdataviewname: ""
      },
      paging: {
        total: 100,
        page: 1,
        size: 50
      }
    };
  },
  created() {
    this.queryListByPage();
  },
  methods: {
    queryListByPage(str) {
      this.listLoading = true;
      if (str) {
        this.paging.page = 1;
      }
      this.$axios
        .request({
          url: `http://127.0.0.1:9999/xlyk/xlykdesign/dataview/page?page=${this.paging.page}&size=${this.paging.size}&strdataviewname=${this.formInline.strdataviewname}`,
          method: "get"
        })
        .then(res => {
          if (res.code === 1) {
            this.paging.total = res.data.total;
            this.list = res.data.list;
          }
        })
        .finally(() => {
          this.listLoading = false;
        });
    },
    // 编辑
    handleUpdate(row) {
      this.$emit("edit", row);
    },
    createTable(row) {
      this.$axios
        .request({
          url:
            "http://127.0.0.1:9999/xlyk/xlykdesign/dataview/createtable?lngdataviewid=" +
            row.lngdataviewid,
          method: "get"
        })
        .then(res => {
          if (res.code === 1) {
            this.$message({
              showClose: true,
              message: "建表成功",
              type: "success"
            });
          }
        });
    },
    // 删除
    delPosition(row) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .request({
              url:
                "http://127.0.0.1:9999/xlyk/xlykdesign/dataview/del?lngdataviewid=" +
                row.lngdataviewid,
              method: "get"
            })
            .then(res => {
              if (res.code === 1) {
                this.$message({
                  showClose: true,
                  message: "删除成功",
                  type: "success"
                });
                this.queryListByPage();
              }
            });
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
