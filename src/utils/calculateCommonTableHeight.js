/**
 * @param tableHeight {number} table表格的高度
 * @param tableref {string} el-table的ref值，可以自定义，默认为table
 * @param offset  {number}  el-table计算的高度的偏移值，可根据页面微调 默认值为148
 * @description 动态计算el-table的高度，根据窗口的改变而改变
 */

// 底部有制单人等
export default {
  data() {
    return {
      tableHeight: 0
    };
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.calTableHeight();
      }, 50);
      window.addEventListener("resize", this.calTableHeight, false);
    });
  },
  activated() {
    // 将包含el-table的组件存入store，提供给切换侧边栏时动态计算表格高度用
    this.$store.dispatch(
      "app/setTableRef",
      this.$refs[this.tableref || "table"].$parent.$parent
    );
  },
  deactivated() {
    this.$store.dispatch("app/setTableRef", null);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.calTableHeight, false);
    this.calTableHeight = null;
    this.tableHeight = undefined;
  },
  methods: {
    calTableHeight() {
      const refName = this.tableref || "table";
      this.tableHeight =
        window.innerHeight -
        this.$refs[refName].$el.offsetTop -
        (this.offset || 148);
    }
  }
};
