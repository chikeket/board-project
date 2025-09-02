import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
createApp(App).use(store).mount("#app");
window.Kakao.init("41e29f7a53335e03725331e3d9e09c3c"); //발급받은 앱키
