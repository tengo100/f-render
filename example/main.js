import Vue from "vue";
import App from "./App.vue";
import FRender from "f-render";
import ElementUI from "element-ui";
import EleForm from "../src/lib/vue-ele-form/index";
import "element-ui/lib/theme-chalk/index.css";
import "normalize.css";
import axios from "axios";
import Card from "../src/components/Card/index";
axios.interceptors.response.use(response => {
  // 将响应结果返回
  return response.data;
});
Vue.prototype.$axios = axios;
Vue.prototype.$BaseUrl = "http://localhost:9999";
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(EleForm, {
  upload: {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    responseFn(response) {
      // 因为是 mock 地址, 所以, 总是返回同一张图片的URL, 正常使用的时候不会
      return response.url;
    }
  },
  "upload-file": {
    responseFn(response, file) {
      return {
        name: file.name,
        url: URL.createObjectURL(file.raw),
        size: file.size
      };
    }
  },
  bmap: {
    ak: "9YLHZRPvUNLhi34Oh2ojqeGSpzCf1rVG"
  }
});
Vue.component("f-render", FRender);
Vue.component("card", Card);
new Vue({
  render: h => h(App)
}).$mount("#app");
