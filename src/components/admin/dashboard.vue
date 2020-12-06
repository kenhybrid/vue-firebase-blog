<template>
  <div>
    <v-container>
      <v-layout row wrap class="ma-1">
        <v-flex xs12 sm6 md3>
          <v-card
            min-height="135"
            class="primary ma-1"
            tile
            router
            to="/blogs"
            link=""
          >
            <v-layout row wrap>
              <v-flex sm8 class="pa-5">
                <v-subheader class="white--text">BLOGS</v-subheader>
                <v-badge right color="primary lighten-2" class="ma-5">
                  <span slot="badge" class="black--text">{{ blogs }}</span>
                  <!--slot can be any component-->
                </v-badge>
              </v-flex>
              <v-flex sm4 class="pa-5 ">
                <v-icon x-large="" color="white" class="float">mdi-post</v-icon>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <v-card
            min-height="135"
            class="error ma-1"
            tile
            router
            to="/emails"
            link=""
          >
            <v-layout row wrap>
              <v-flex sm8 class="pa-5">
                <v-subheader class="white--text">EMAILS</v-subheader>
                <v-badge right color="error lighten-2" class="ma-5">
                  <span slot="badge" class="black--text">{{ emails }}</span>
                  <!--slot can be any component-->
                </v-badge>
              </v-flex>
              <v-flex sm4 class="pa-5">
                <v-icon x-large="" color="white" class="float"
                  >mdi-email-receive-outline</v-icon
                >
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <v-card
            min-height="135"
            class="success ma-1"
            tile
            router
            to="/users"
            link=""
          >
            <v-layout row wrap>
              <v-flex sm8 class="pa-5">
                <v-subheader class="white--text">USERS</v-subheader>
                <v-badge right color="success lighten-2" class="ma-5">
                  <span slot="badge" class="black--text">{{ users }}</span>
                  <!--slot can be any component-->
                </v-badge>
              </v-flex>
              <v-flex sm4 class="pa-5">
                <v-icon x-large="" color="white" class="float"
                  >mdi-account-multiple-outline</v-icon
                >
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <v-card
            min-height="135"
            class="warning ma-1"
            tile
            router
            to="/system"
            link=""
          >
            <v-layout row wrap>
              <v-flex sm8 class="pa-5">
                <v-subheader class="white--text">SYSTEM</v-subheader>
              </v-flex>
              <v-flex sm4 class="pa-5">
                <v-icon x-large="" color="white" class="float"
                  >mdi-cog-transfer</v-icon
                >
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="ma-3"> </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    blogs() {
      return this.$store.getters.blogslength;
    },
    emails() {
      return this.$store.getters.emailslength;
    },
    users() {
      return this.$store.getters.userslength;
    }
  }
};
</script>

<style scoped>
.float {
  float: right !important;
}
</style>
