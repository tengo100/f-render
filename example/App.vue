<template>
  <div>
    <app-header
      @change="pure = !pure"
      @select="selectEvent"
      :style="{ marginBottom: pure ? '20px' : 0 }"
    />
    <f-render
      ref="frender"
      v-if="isrendered"
      @save="handleSave"
      :loading="loading"
      height="calc(100vh - 150px)"
      :config="formConfig"
      v-model="formData"
      :pure="pure"
      :comps="comps"
      :formItemCommon="formItemCommon"
    />
  </div>
</template>

<script>
import AppHeader from "./AppHeader";
// 默认配置
import comps from "../src/fixtures/comps";
import tableEditor from "../src/fixtures/extends/table-editor";
import formItemCommonDefault from "../src/fixtures/form-item-common";
export default {
  components: {
    AppHeader
  },
  data() {
    return {
      isrendered: false,
      loading: false,
      formConfig: "",
      lngdataviewid: "",
      formData: {},
      pure: false,
      formItemCommon: {},
      comps: comps.concat(tableEditor)
    };
  },
  methods: {
    handleSave(res) {
      localStorage.setItem("form-config", res);
      this.save(res);
    },
    selectEvent(item) {
      this.isrendered = false;
      this.formConfig = item.strformjson || {};
      this.lngdataviewid = item.lngdataviewid;
      this.$axios
        .request({
          url: `${this.$BaseUrl}/xlyk/xlykdesign/dataview/findbyid?lngdataviewid=${item.lngdataviewid}`,
          method: "get"
        })
        .then(res => {
          if (res.code === 1) {
            const { field } = formItemCommonDefault.config;
            Object.assign(field, {
              options: res.data[0].dataviewfield.map(item => {
                return {
                  text: item.strdataviewfieldname,
                  value: item.strdataviewfieldcode,
                  ...item
                };
              }),
              on: {
                change: val => {
                  const one = field.options.find(
                    item => item.strdataviewfieldcode === val
                  );

                  this.$refs.frender.formItemList[
                    this.$refs.frender.currentIndex
                  ].label = one.strdataviewfieldname;
                }
              }
            });
            this.formItemCommon = formItemCommonDefault;
            this.isrendered = true;
          }
        });
    },
    save(res) {
      const data = { lngdataviewid: this.lngdataviewid, strformjson: res };
      fetch(`${this.$BaseUrl}/xlyk/xlykdesign/dataview/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(() => {
          this.$message.success("保存成功啦~");
        })
        .catch(error => {
          // 处理错误
          console.error("发生错误:", error);
        });
    }
  },
  mounted() {
    // this.loading = true;
    // setTimeout(() => {
    //   this.loading = false;
    //   this.formConfig = localStorage.getItem("form-config") || "";
    // }, 1000);
  }
};
</script>
