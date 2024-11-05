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
import eleFormVxeTable from "../src/fixtures/extends/ele-form-vxe-table";
import eleFormPullDownGrid from "../src/fixtures/extends/ele-form-pull-down-grid";
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
      lngbsformid: "",
      lngbstableid: "",
      formData: {},
      pure: false,
      formItemCommon: {},
      comps: comps.concat([tableEditor, eleFormVxeTable, eleFormPullDownGrid])
    };
  },
  methods: {
    handleSave(res) {
      localStorage.setItem("form-config", res);
      this.save(res);
    },
    selectEvent(item) {
      this.isrendered = false;
      this.$axios
        .request({
          url: `${this.$BaseUrl}/bsform/findFormSetting/${item.lngbsformid}`,
          headers: {
            "X-Token": this.$XToken
          },
          method: "get"
        })
        .then(rs => {
          this.formConfig = (rs.data && rs.data.strformjson) || {};
          this.lngbstableid = item.lngbstableid;
          this.lngbsformid = item.lngbsformid;
          this.$axios
            .request({
              url: `${this.$BaseUrl}/bstablefield/findAll`,
              headers: {
                "X-Token": this.$XToken
              },
              method: "post",
              data: { lngbstableid: item.lngbstableid }
            })
            .then(res => {
              if (res.code === 20000) {
                const { field } = formItemCommonDefault.config;
                Object.assign(field, {
                  options: res.data.map(item => {
                    return {
                      text: item.strfieldcomments,
                      value: item.strfieldname,
                      ...item
                    };
                  }),
                  on: {
                    change: val => {
                      const one = field.options.find(
                        item => item.strfieldname === val
                      );

                      this.$refs.frender.formItemList[
                        this.$refs.frender.currentIndex
                      ].label = one.strfieldcomments;
                    }
                  }
                });
                this.formItemCommon = formItemCommonDefault;
                this.isrendered = true;
              }
            });
        });
    },
    save(res) {
      const bsformsublist = window.__frender.formItemList
        .filter(item => item.type === "ele-form-vxe-table")
        .map(item => {
          return {
            lngbstableid: item.attrs.child,
            strbstablefieldname: item.attrs.strbstablefieldname,
            strbstablefieldnamem: item.attrs.strbstablefieldnamem,
            strfield: item.field
          };
        });
      const data = {
        lngbsformid: this.lngbsformid,
        lngbstableid: this.lngbstableid,
        bsformsublist: bsformsublist,
        strformjson: res
      };
      // eslint-disable-next-line
      fetch(`${this.$BaseUrl}/bsform/saveFormSetting`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Token": this.$XToken
        },
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
