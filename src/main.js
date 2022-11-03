import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
// import MLoading from "./components/bases/MLoading.vue";

const app = createApp(App);


  // .component("MLoading", MLoading)
  app.use(router)
  app.use(store)
  // .use(ElementPlus)
  app.mount("#app");
