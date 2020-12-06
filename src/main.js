import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueMeta from "vue-meta";
Vue.use(require("vue-moment"));
Vue.use(VueMeta);
const firebase = require("./model");

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    this.$store.dispatch("loadblogs");
    this.$store.dispatch("loademails");
    this.$store.dispatch("loadcategories");
    this.$store.dispatch("loadusers");
    //autosignin
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoSignin", user);
      }
    });
  }
  // watch: {
  //   $route(to, from) {
  //     if (to.path === "/blogs") {
  //       if(from.path==="/ad" ){
  //         this.$store.dispatch("loadblogs");
  //       }

  //     } else if (from.path === "/editblog") {
  //       this.$store.dispatch("loadblogs");
  //     }
  //   }
  // },
}).$mount("#app");
