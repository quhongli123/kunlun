import { createApp } from "vue";
import App from "./App.vue";
import setupPlugins from "@/plugins";
import ElementPlus from "element-plus";

// 本地SVG图标
import "virtual:svg-icons-register";

// 样式
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/styles/index.scss";
import "uno.css";
import "animate.css";

const app = createApp(App);
app.use(ElementPlus);

app.use(setupPlugins);

app.mount("#app");
