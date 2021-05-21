import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import store from "./store";
import VueLazyLoad from "vue3-lazyload";

createApp(App).use(store).use(VueLazyLoad).mount("#app");
