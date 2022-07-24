import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./index.css";

// library fixed
import Datepicker from "@vuepic/vue-datepicker";
import AOS from "aos";
import VueGoodTablePlugin from "vue-good-table-next";
import VueWriter from "vue-writer";
import vSelect from "vue-select";
import { QuillEditor } from "@vueup/vue-quill";

// testing

// style
import "@vuepic/vue-datepicker/dist/main.css";
import "aos/dist/aos.css";
import "vue-good-table-next/dist/vue-good-table-next.css";
import "vue-select/dist/vue-select.css";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const app = createApp(App);

// define your options
const globalOptions = {
  //   debug: "info",
  //   modules: {
  //     toolbar: "minimal",
  //   },
  placeholder: "Type here . . .",
  readOnly: false,
  theme: "snow",
};
// set default globalOptions prop
QuillEditor.props.globalOptions.default = () => globalOptions;

// calling library fixed
app.use(router);
app.use(createPinia());
app.component("Datepicker", Datepicker);
app.use(AOS.init());
app.use(VueGoodTablePlugin);
app.use(VueWriter);
app.component("v-select", vSelect);
app.component("QuillEditor", QuillEditor);

// testing

app.mount("#app");
