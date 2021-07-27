import "@babel/polyfill";
import { createApp } from "vue";
import router from "./route";
import App from "./App.vue";

import MainHeader from "./components/header.vue";

import "./assets/styles/color-brewer.css";
import "./assets/styles/index.scss";

// import BinUI from "bin-ui-next";
// import "../src/styles/index.scss";

// import icon from "../src/components/icon/iconfont.json";
import generate from "./generateTreeData";

// const icons = icon.glyphs.map((i) => i.font_class);

const app = createApp(App);
// app.use(BinUI); // , { disabledDoc: true }
app.config.productionTip = false;
// app.config.globalProperties.$icon = icons;

app.config.globalProperties.$generateTree = generate; // Icon 列表页用
// app.component("DemoBlock", DemoBlock);
app.component("MainHeader", MainHeader);
// app.component("MainFooter", MainFooter);
// app.component("SideNav", SideNav);
// app.component("ColorBase", ColorBase);
// app.component("DraggableDemo", DraggableDemo);
// app.component("IconPane", IconPane);
app.use(router);
// Mount when the route is ready
router.isReady().then(() => {
  app.mount("#app", true);
});
