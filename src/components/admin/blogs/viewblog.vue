<template>
  <div>
    <v-snackbar
      v-model="updated"
      :timeout="6000"
      top
      right
      color="black"
      @updated="updated = true"
    >
      This blog has been updated.
      <v-chip
        small
        icon
        color="success"
        class="float white"
        @click.native="updated = false"
      >
        <v-icon small>mdi-refresh</v-icon>
      </v-chip>
    </v-snackbar>

    <v-container class="px-5">
      <v-layout row wrap class="px-2">
        <v-flex xs12 sm12 md12>
          <v-card tile flat class="mt-1">
            <v-card-title>
              <v-btn fab small color="warning" router to="/blogs">
                <v-icon small>mdi-arrow-left</v-icon>
              </v-btn>
              <div class="text-uppercase ml-2 subtitle-1">{{ blog.title }}</div>
              <v-spacer></v-spacer>
              <v-chip color="grey lighten-3" text-color="black">
                <v-progress-circular
                  indeterminate
                  color="warning"
                  class="mr-1"
                  :size="22"
                  :width="2"
                >
                  <v-icon small color="black">mdi-clock-outline</v-icon>
                </v-progress-circular>
                {{ blog.date | moment("from", "now") }}
              </v-chip>
            </v-card-title>
            <img src="../../../assets/1.jpeg" class="cover" />

            <v-card-actions class="cover-text">
              <div class="text-uppercase">{{ blog.subtitle }}</div>

              <v-spacer></v-spacer>

              <v-btn
                color="success"
                @click.prevent=""
                rounded=""
                small
                class="ml-1"
              >
                <v-icon small left>mdi-thumb-up</v-icon>
                <span right>{{ blog.likes }} </span>
              </v-btn>
              <v-btn
                color="warning"
                @click.prevent=""
                rounded=""
                small
                class="mx-1"
              >
                <v-icon small left>mdi-thumb-down</v-icon>
                <span right>{{ blog.dislikes }} </span>
              </v-btn>
            </v-card-actions>
            <v-card-text>
              <div>
                <div v-html="blog.body" class="body"></div>
                <div>Author: {{ blog.author }}</div>
              </div>
            </v-card-text>

            <v-layout row justify-center>
              <v-dialog v-model="dialog" persistent max-width="400">
                <v-card>
                  <v-card-title primary-title> </v-card-title>
                  <v-card-text class="text-center pt-2">
                    <p>Do yo want to delete this post?</p>
                    <img
                      src="../../../assets/delete.gif"
                      width="280"
                      height="180"
                    />
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="primary" text @click="deletepost(blog.id)">
                      <v-icon>mdi-check</v-icon>
                      <span>yes</span>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click.native="dialog = false">
                      <v-icon>mdi-close</v-icon>
                      <span>no</span>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
            <v-card-actions>
              <v-spacer></v-spacer>
              <div class="float ">
                <edit
                  :blog="blog"
                  @updated="updated = true"
                  class="float mx-2"
                />
                <v-btn color="error" small fab @click="dialog = true">
                  <v-icon small>mdi-delete-outline</v-icon>
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import edit from "./editblog";
export default {
  props: ["id"],
  components: {
    edit
  },
  data() {
    return {
      deleted: false,
      value: false,
      updated: false,
      dialog: false,
      title: "",
      subtitle: "",
      category: "",
      body: "",
      date: new Date().toISOString(),

      //cat
      items: ["kennedy", "baraka"]
    };
  },
  computed: {
    categories() {
      return this.$store.getters.categories;
    },
    blog() {
      return this.$store.getters.blog(this.id);
    }
  },
  methods: {
    deletepost() {
      this.$store
        .dispatch("deleteblog", {
          id: this.id
        })
        .then(() => {
          this.dialog = false;
          this.$router.push("/blogs");
        }, 300);
    }
  }
};
</script>

<style>
.cover {
  height: auto;
  width: 100%;
  margin: auto;
}
.cover-text {
  margin-top: -55px;
  color: white;
  position: relative;
}

.ql-syntax {
  background: black !important;
  color: aqua;
  padding: 15px;
}
.float {
  float: right;
}
.body img {
  height: auto;
  width: 100%;
  margin: auto;
}
.body p {
  font-size: 16px;
}
ul {
  padding: 3px;
}
</style>
