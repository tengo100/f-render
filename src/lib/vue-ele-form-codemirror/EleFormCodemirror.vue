<template>
  <div class="ele-form-codemirror">
    <vue-codemirror
      :class="desc.class"
      :style="desc.style"
      v-bind="attrs"
      v-model="newValue"
      v-on="desc.on"
      @blur="handleChange(newValue)"
    />
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
      }
    };
  }
};
</script>

<style>
.ele-form-codemirror {
  line-height: 1.3;
}
</style>
