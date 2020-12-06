<template>
  <div class="text-center">
    <v-menu
      max-width="250"
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-y
      right=""
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon color="grey" v-on="on">
          <v-icon color="grey">mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-card tile flat>
        <v-list>
          <v-list-item dense="">
            <v-list-item-action>
              <v-icon color="warning">mdi-email-outline</v-icon>
            </v-list-item-action>
            <v-list-item-title>1 Message</v-list-item-title>
          </v-list-item>
          <v-list-item dense="">
            <v-list-item-action>
              <v-icon color="warning">mdi-bell-outline</v-icon>
            </v-list-item-action>
            <v-list-item-title>0 Notifications</v-list-item-title>
          </v-list-item>

          <v-list-item dense="">
            <v-list-item-action>
              <v-icon color="warning">mdi-calendar</v-icon>
            </v-list-item-action>
            <v-list-item-title>Events</v-list-item-title>
          </v-list-item>
          <div class="pa-4">
            <v-btn block color="warning" rounded="" @click="logout" small>
              <v-icon left>mdi-exit-to-app</v-icon>
              <span right>Logout</span>
            </v-btn>
          </div>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menu: false,
      hints: false
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logOut").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>
