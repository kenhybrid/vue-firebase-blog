<template>
  <nav v-if="userisauthenticated">
    <v-app-bar app color="white ">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="">ECO</v-toolbar-title>
      <v-spacer></v-spacer>

      <popup />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app color="white">
      <v-list class="top">
        <v-img src="../../assets/1.jpeg"></v-img>
      </v-list>
      <v-list dense link class="top2">
        <v-list-item
          v-for="item in bloglinks"
          :key="item.title"
          link
          router
          :to="item.link"
          active-class="primary--text"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="my-3 mx-2"></v-divider>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          router
          :to="item.link"
          active-class="error--text"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="my-3 mx-2"></v-divider>
        <v-list-item
          v-for="item in other"
          :key="item.title"
          link
          router
          @click="logout"
          active-class="success--text"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import popup from "./Popup";
export default {
  components: {
    popup
  },
  data() {
    return {
      drawer: true,

      bloglinks: [
        { icon: "mdi-view-dashboard-outline", title: "Dashboard", link: "/" },
        { icon: "mdi-post-outline", title: "Blogs", link: "/blogs" },
        {
          icon: "mdi-view-list-outline",
          title: "Categories",
          link: "/categories"
        }
      ],
      items: [
        {
          icon: "mdi-account-multiple-outline",
          title: "Users",
          link: "/users"
        },
        { icon: "mdi-email-outline", title: "Emails", link: "/emails" },
        { icon: "mdi-cog-refresh-outline", title: "System", link: "/system" }
      ],
      other: [{ icon: "mdi-exit-to-app", title: "Logout" }]
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logOut").then(() => {
        this.$router.push("/login");
      });
    }
  },
  computed: {
    userisauthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  }
};
</script>
<style scoped>
.top {
  margin-top: -8px !important;
}
.top2 {
  margin-top: -16px !important;
}
</style>
