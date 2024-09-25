/**
 * 此文件用于注册全局组件
 */

import Vue from "vue";

// 滚动
import PerfectScrollbar from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";

// 扩展组件
import EleFormDynamic from "./lib/vue-ele-form-dynamic";
import EleFormDataEditor from "./lib/vue-ele-form-data-editor";
import EleFormTableEditor from "./lib/vue-ele-form-table-editor";
import EleFormCodemirror from "./lib/vue-ele-form-codemirror";

// 拖拽
import vueDraggable from "vuedraggable/src/vuedraggable";

// 代码编辑器
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css";
import "prismjs/themes/prism-tomorrow.css";

Vue.use(PerfectScrollbar);
Vue.component("dynamic", EleFormDynamic);
Vue.component("PrismEditor", PrismEditor);
Vue.component("vue-draggable", vueDraggable);
Vue.component("data-editor", EleFormDataEditor);
Vue.component("table-editor", EleFormTableEditor);
Vue.component("codemirror", EleFormCodemirror);
