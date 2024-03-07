<template>
  <header class="app-header">
    <el-link
      :underline="false"
      href="https://github.com/dream2023/f-render"
      target="_blank"
      type="primary"
    >
      <h1 class="app-header-title">XLYK 表单设计器</h1>
    </el-link>
    <el-form :model="form" inline size="mini" class="top-form">
      <el-form-item label="请选择表单" title="选择要加载的表单">
        <el-select v-model="form.lngdataviewid" filterable>
          <el-option
            v-for="item in dataViews"
            :key="item.lngdataviewid"
            :label="item.strdataviewname"
            :value="item.lngdataviewid"
            @click.native="selectEvent(item)"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="addEvent">表单管理</el-button>
      </el-form-item>
    </el-form>

    <div class="app-header-right">
      <el-button
        @click="$emit('change')"
        icon="el-icon-view"
        type="text"
        style="margin-right: 20px"
        >切换视图</el-button
      >
      <el-link
        :href="item.url"
        target="_blank"
        type="primary"
        v-for="item of links"
        :key="item.title"
        >{{ item.title }}</el-link
      >
    </div>
    <el-drawer
      class="drawer-custom"
      :visible.sync="drawer"
      title="表单管理"
      size="70%"
    >
      <FormManage ref="FormManage" />
    </el-drawer>
  </header>
</template>

<script>
import FormManage from "../src/components/form-manage/index";
export default {
  name: "AppHeader",
  components: { FormManage },
  data() {
    return {
      dataViews: [],
      drawer: false,
      form: {
        lngdataviewid: ""
      },
      links: [
        {
          url: "https://github.com/dream2023/vue-ele-form",
          title: "vue-ele-form"
        },
        {
          url: "https://www.yuque.com/chaojie-vjiel/vbwzgu",
          title: "Docs"
        },
        {
          url: "https://github.com/dream2023/f-render",
          title: "GitHub"
        }
      ]
    };
  },
  created() {
    this.getDataViews();
  },
  methods: {
    selectEvent(item) {
      this.$emit("select", item);
    },
    addEvent() {
      this.drawer = true;
    },
    getDataViews() {
      fetch("http://127.0.0.1:9999/xlyk/xlykdesign/dataview/search")
        .then(response => response.json())
        .then(data => {
          // 处理返回的数据
          this.dataViews = data.data;
        })
        .catch(error => {
          // 处理错误
          console.error("发生错误:", error);
        });
    }
  }
};
</script>

<style scoped>
.app-header {
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 1;
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
}
.app-header .app-header-title {
  font-size: 24px;
  color: #409eff;
}
.app-header .app-header-right {
  display: flex;
  align-items: center;
}
.app-header .app-header-right .el-link {
  margin-right: 20px;
}
</style>
<style>
.top-form {
  align-self: center;
}
.top-form .el-form-item--mini.el-form-item {
  margin-bottom: 0;
}
.top-form .el-form-item__label {
  color: #409eff;
}
.drawer-custom .el-drawer__header {
  margin-bottom: 0;
}
</style>
