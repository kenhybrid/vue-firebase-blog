<template>
  <v-app>
    <Navbar></Navbar>
    <v-main class="bg">
      <transition name="fade" mode="out-in" appear>
        <router-view ref="view" :key="$route.fullpath"></router-view>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/layout/Navbar";
export default {
  name: "App",
  components: {
    Navbar
  },
  created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.showUpgradeUI = true;
      });
    }
  },

  methods: {
    async accept() {
      this.showUpgradeUI = false;
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    }
  }
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.bg {
  background-color: rgb(245, 245, 245);
}
html {
  overflow: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;
}

::-webkit-scrollbar {
  width: 7px;
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgb(213, 213, 214);
}
</style>
