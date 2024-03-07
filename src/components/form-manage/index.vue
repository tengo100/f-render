<template>
  <card>
    <template v-slot:header>
      <Header ref="Header" @add="addEvent" />
    </template>
    <template v-slot:filter>
      <FilterTool ref="FilterTool" @search="searchEvent" />
    </template>
    <div class="staff-table">
      <TableArea ref="TableArea" @edit="editEvent" />
    </div>
    <Add ref="Add" @refresh="refreshEvent" />
  </card>
</template>
<script>
import Header from "./components/Header";
import Add from "./components/Add";
import TableArea from "./components/TableArea";
import FilterTool from "./components/FilterTool";
export default {
  name: "FormManage",
  components: { Header, Add, TableArea, FilterTool },
  data() {
    return {
      rowData: ""
    };
  },
  methods: {
    addEvent() {
      this.$refs.Add.title = "新增";
      this.$refs.Add.lngpostid = "";
      this.$refs.Add.show();
    },
    editEvent(row) {
      this.$refs.Add.title = "编辑";
      this.$axios
        .request({
          url:
            "http://127.0.0.1:9999/xlyk/xlykdesign/dataview/findbyid?lngdataviewid=" +
            row.lngdataviewid,
          method: "get"
        })
        .then(res => {
          if (res.code === 1) {
            this.$refs.Add.show();
            this.$refs.Add.formData = res.data[0];
          }
        });
    },
    refreshEvent() {
      this.$refs["TableArea"].queryListByPage();
    },
    searchEvent(item) {
      this.$refs.TableArea.formInline = item;
      this.$refs["TableArea"].queryListByPage("search");
    }
  }
};
</script>
