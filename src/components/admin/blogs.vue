<template>
  <div class="font">
    <v-snackbar v-model="added" :timeout="6000" top right color="black">
      You added a blog!
      <v-chip
        small
        icon
        color="success"
        class="float white"
        @click.native="added = false"
      >
        <v-icon small>mdi-check-all</v-icon>
      </v-chip>
    </v-snackbar>
    <v-container>
      <v-card class=" " tile flat>
        <v-layout row wrap>
          <v-flex xs8 sm6 md6 class="px-2">
            <v-text-field
              label="search"
              single-line=""
              prepend-inner-icon="mdi-magnify"
              v-model="search"
              rounded
              class="f"
            ></v-text-field>
          </v-flex>
          <v-flex xs4 sm6 md6 class="px-2" hidden-xs-only>
            <!-- body -->
            <div class="pt-4 px-5 float">
              <v-btn fab small color="success">
                <v-icon>mdi-filter</v-icon>
              </v-btn>
            </div>
          </v-flex>
        </v-layout> </v-card
      ><v-card class=" px-2 " tile flat>
        <v-layout row wrap class="pa-1" hidden-xs-only>
          <v-flex xs12 sm2 md2 class="pa-2">
            <!-- title -->
            <div class="ml-2">Title</div>
          </v-flex>
          <v-flex xs12 sm4 md4 class="pa-2" hidden-xs-only>
            <!-- body -->
            <div>Subtitle</div>
          </v-flex>
          <v-flex xs12 sm2 md2 class="pa-2 center" hidden-xs-only>
            <!-- subtite -->
            <v-chip>
              <v-icon small color="primary" class="mr-1"
                >mdi-thumb-up-outline</v-icon
              >
              <v-icon small color="error" class="ml-1"
                >mdi-thumb-down-outline</v-icon
              >
            </v-chip>
            <!-- <div>
              <v-icon small color="primary" class="mr-1"
                >mdi-thumb-up-outline</v-icon
              >
              <v-icon small color="error" class="ml-1"
                >mdi-thumb-down-outline</v-icon
              >
            </div> -->
          </v-flex>
          <v-flex xs6 sm2 md2 class="pa-1" hidden-xs-only>
            <!-- category -->
            <div class="small center">Category</div>
          </v-flex>
          <v-flex xs6 sm2 md2 class="pa-2 " hidden-xs-only>
            <!-- date -->
            <div class="center ">Date</div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>

      <v-card style="height:70vh;overflow-y:auto;overflow-x:hidden" tile flat>
        <v-card
          v-for="blog in filteredblogs"
          :key="blog.id"
          class="hover px-2 "
          tile
          flat
          @added="added = true"
          router
          link
          :to="'/viewblog/' + blog.id"
        >
          <v-layout row wrap class="pa-1">
            <v-flex xs12 sm2 md2 class="pa-2">
              <!-- title -->
              <div class="ml-2">{{ blog.title | title }}</div>
            </v-flex>
            <v-flex xs12 sm4 md4 class="pa-2">
              <!-- subtite -->
              <div>{{ blog.subtitle | subtitle }}</div>
            </v-flex>
            <v-flex xs12 sm2 md2 class="pa-2 center" hidden-xs-only>
              <!-- subtite -->
              <div class="mx-2">
                <span class="primary--text">{{ blog.likes }} </span> |
                <span class="error--text">{{ blog.dislikes }}</span>
              </div>
            </v-flex>
            <v-flex xs6 sm2 md2 class="pa-1 center">
              <!-- category -->
              <v-chip class="small ">{{ blog.category }}</v-chip>
            </v-flex>
            <v-flex xs6 sm2 md2 class="pa-2 ">
              <!-- date -->
              <div class=" ">
                <v-icon class="pb-1" small>mdi-calendar-outline</v-icon>
                {{ blog.date | moment("from", "now") }}
              </div>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
        </v-card>
      </v-card>
    </v-container>
    <add @added="added = true" />
  </div>
</template>
<script>
import add from "./blogs/addblog";
export default {
  components: { add },
  data() {
    return {
      added: false,
      deleted: false,
      search: ""
    };
  },
  methods: {
    sort(prop) {
      this.filteredblogs.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    }
  },
  computed: {
    blogs() {
      return this.$store.getters.blogs;
    },
    filteredblogs() {
      let match = this.search.toLowerCase();
      return this.blogs.filter(blog => {
        return (
          blog.title.toLowerCase().match(match) ||
          blog.category.toLowerCase().match(match) ||
          blog.subtitle.toLowerCase().match(match)
        );
      });
    }
  },
  filters: {
    subtitle(value) {
      return value.slice(0, 35) + "...";
    },
    title(value) {
      return value.slice(0, 18) + "...";
    }
  }
};
</script>

<style scoped>
html {
  overflow: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;
}

::-webkit-scrollbar {
  width: 4px;
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgb(213, 213, 214);
}
.b {
  border-left: blue solid 3px !important;
}
.float {
  float: right;
}
.font {
  font-size: 14px;
}
.hover:hover {
  background: rgb(243, 240, 240);
}
.center {
  align-content: center;
  align-items: center;
  text-align: center;
}
</style>
