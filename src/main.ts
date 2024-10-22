import { createApp } from "vue";
import i18n from "./plugins/i18n";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import App from "./App.vue";
import "vuetify-sonner/style.css";
import "leaflet/dist/leaflet.css";

const app = createApp(App);

app.use(i18n);
app.use(router);
app.use(store);
app.use(vuetify);

app.mount("#app");
