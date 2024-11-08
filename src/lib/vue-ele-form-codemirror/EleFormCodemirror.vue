<template>
  <div class="ele-form-codemirror">
    <el-row>
      <el-col :span="4">
        <el-tree
          :data="data"
          :props="defaultProps"
          @node-click="handleNodeClick"
        ></el-tree>
      </el-col>
      <el-col :span="20">
        <div class="buttons-wp">
          <el-button type="primary" size="mini" @click="formatData"
            >格式化代码</el-button
          >
          <el-button type="primary" size="mini" @click="copyData"
            >复制代码</el-button
          >
        </div>
        <vue-codemirror
          ref="codeMirror"
          :class="desc.class"
          :style="desc.style"
          v-bind="attrs"
          v-model="newValue"
          v-on="desc.on"
          @blur="handleChange(newValue)"
          @keydown.native="keyDownFormatData"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
// language js
import "codemirror/mode/javascript/javascript.js";
// theme css
import "codemirror/theme/base16-dark.css";
import formMixin from "../vue-ele-form/mixins/formMixin";
import { js_beautify } from "js-beautify";
import commonFunctions from "./codes/commonFunctions";
import commonTemplates from "./codes/commonTemplates";
import copy from "clipboard-copy";
export default {
  name: "codemirror",
  mixins: [formMixin],
  components: {
    "vue-codemirror": codemirror
  },
  data() {
    return {
      defaultAttrs: {
        options: {
          tabSize: 4,
          mode: "text/javascript",
          theme: "base16-dark",
          lineNumbers: true,
          line: true
        }
      },
      data: [
        {
          label: "常用函数",
          children: [
            {
              label: "保存",
              code: commonFunctions.save
            },
            {
              label: "下拉数据",
              children: [
                {
                  label: "科室数据",
                  code: commonFunctions.select
                },
                {
                  label: "职员数据",
                  code: commonFunctions.select
                }
              ]
            },
            {label:"link数据",code:commonFunctions.linkValue}
          ]
        },
        {
          label: "常用模版",
          children: [
            {
              label: "下拉props",
              code: commonTemplates.props
            },
            {
              label: "vif配置",
              code: commonTemplates.vif
            },
            {
              label: "disabled配置",
              code: commonTemplates.disabled
            },
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    formatData() {
      this.newValue = js_beautify(this.newValue);
    },
    copyData() {
      copy(this.newValue).then(() => {
        this.$message({ message: "复制成功", type: "success" });
      });
    },
    keyDownFormatData(event) {
      // ctrl + shift + k 格式化代码
      if (event.ctrlKey && event.shiftKey && event.keyCode === 75) {
        this.formatData();
      }
    },
    handleNodeClick(data) {
      if (data.code) {
        this.newValue = js_beautify(data.code);
        this.handleChange(this.newValue);
      }
    }
  }
};
</script>

<style>
.ele-form-codemirror {
  line-height: 1.3;
}
.heightAuto .CodeMirror {
  overscroll-y: scroll !important;
  height: calc(100vh - 170px) !important;
}
.buttons-wp {
  margin-bottom: 10px;
}
</style>
