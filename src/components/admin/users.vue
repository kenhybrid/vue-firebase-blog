<template>
  <div>
    <v-container>
      <v-subheader>USERS</v-subheader>
      <v-card tile flat>
        <v-simple-table class="mb-2" scrollable>
          <thead>
            <tr class="grey lighten-5">
              <th class="primary--text">
                Firstname
              </th>
              <th class="primary--text">
                lastname
              </th>
              <th class="primary--text">
                Email
              </th>

              <th class="primary--text text--right">
                Date
              </th>
            </tr>
          </thead>
          <tbody style="max-height:600px;">
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.firstname }}</td>
              <td>{{ user.lastname }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.date }}</td>
              <!-- <td class="text-right">
                <v-btn icon color="error" @click="deletecustomer">
                  <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
              </td> -->
            </tr>
          </tbody>
        </v-simple-table>
      </v-card>
    </v-container>
    <!-- <v-layout row justify-center>
      <v-dialog v-model="deletedialog" persistent max-width="300">
        <v-card>
          <v-card-title class="headline"></v-card-title>
          <v-card-text class="text-center"
            >Do yo want to delete this Customer?</v-card-text
          >
          <v-card-actions>
            <v-btn color="primary" text @click.native="deletedialog = false">
              <v-icon>mdi-check</v-icon>
              <span>yes</span>
            </v-btn>
            <v-spacer></v-spacer>

            <v-btn color="error" text @click.native="deletedialog = false">
              <v-icon>mdi-close</v-icon>
              <span>no</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      deletedialog: false
    };
  },
  methods: {
    deletecustomer() {
      this.deletedialog = true;
    }
  },
  computed: {
    users() {
      return this.$store.getters.users;
    }
  }
};
</script>

<style></style>
