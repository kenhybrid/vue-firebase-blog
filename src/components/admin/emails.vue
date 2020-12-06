<template>
  <div class="font">
    <v-container>
      <v-subheader>EMAILS</v-subheader>
      <v-expansion-panels accordion tile>
        <v-expansion-panel v-for="email in emails" :key="email.id">
          <v-expansion-panel-header class="">
            <v-layout row wrap>
              <v-flex xs2 sm1 md1 class="px-2 my-1">
                <v-icon color="error">mdi-email-outline</v-icon>
              </v-flex>
              <v-flex xs10 sm11 md11 class="">
                <div>
                  <b>{{ email.subject }}</b>
                </div>
                <small>@{{ email.email }}</small>
              </v-flex>
            </v-layout>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-divider class="mb-2"></v-divider>
            <div><b>Subject: </b>{{ email.subject }}</div>
            <div><b>Message: </b>{{ email.message }}</div>
            <div><b>Date: </b>{{ email.date }}</div>
            <div class="float">
              <v-btn flat icon color="primary">
                <v-icon>mdi-reply-outline</v-icon>
              </v-btn>
              <v-btn flat icon color="error" @click="deletedialog = true">
                <v-icon>mdi-delete-outline</v-icon>
              </v-btn>
            </div>
          </v-expansion-panel-content>
          <v-layout row justify-center>
            <v-dialog v-model="deletedialog" persistent max-width="350">
              <v-card>
                <v-card-title class=" text--center error--text"></v-card-title>
                <v-card-text class="text-center"
                  ><p>Do yo want to delete this Email?</p>
                  <p>deleting animation</p></v-card-text
                >
                <v-card-actions>
                  <v-btn color="primary" text @click="deleteemail(email.id)">
                    <v-icon>mdi-check</v-icon>
                    <span>yes</span>
                  </v-btn>
                  <v-spacer></v-spacer>

                  <v-btn
                    color="error"
                    text
                    @click.native="deletedialog = false"
                  >
                    <v-icon>mdi-close</v-icon>
                    <span>no</span>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-layout>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deletedialog: false
    };
  },
  computed: {
    emails() {
      return this.$store.getters.emails;
    }
  },
  methods: {
    deleteemail(id) {
      this.$store.dispatch("deleteemail", id).then(() => {
        this.deletedialog = false;
      });
    }
  }
};
</script>

<style scoped>
.font {
  font-size: 14px !important;
}
.float {
  float: right;
}
</style>
