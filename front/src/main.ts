import { createApp } from "vue";
import { createPinia } from "pinia";
import naive from "naive-ui";
import Vue3TouchEvents from "vue3-touch-events";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(naive);
app.use(Vue3TouchEvents);

app.mount("#app");
