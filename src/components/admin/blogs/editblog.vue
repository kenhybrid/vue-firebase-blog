<template>
  <v-row justify="">
    <v-dialog
      v-model="dialog"
      scrollable
      fullscreen=""
      transition="slide-x-reverse-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn class="primary " dark v-on="on" fab small
          ><v-icon>mdi-pencil-outline</v-icon></v-btn
        >
      </template>
      <v-card tile>
        <v-app-bar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn dark text icon><v-icon>mdi-dots-horizontal</v-icon></v-btn>
        </v-app-bar>
        <v-card-text style="height: 1000px;">
          <v-form class="ma-2" @submit.prevent="">
            <v-layout row wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  class="mx-2"
                  label="title*"
                  prepend-inner-icon="mdi-post-outline"
                  clearable
                  v-model="title"
                  :error-messages="titleErrors"
                  required
                  @input="$v.title.$touch()"
                  @blur="$v.title.$touch()"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  class="mx-2"
                  label="subtitle*"
                  prepend-inner-icon="mdi-head-question-outline"
                  clearable
                  v-model="subtitle"
                  :error-messages="subtitleErrors"
                  required
                  @input="$v.subtitle.$touch()"
                  @blur="$v.subtitle.$touch()"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-select
                  class="mx-2"
                  label="category*"
                  :items="items"
                  small-chips=""
                  item-text="category"
                  prepend-inner-icon="mdi-view-list-outline"
                  v-model="category"
                  :error-messages="categoryErrors"
                  required
                  @input="$v.category.$touch()"
                  @blur="$v.category.$touch()"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm12 md12 class="mx-2">
                <vue-editor v-model="body"></vue-editor>
              </v-flex>

              <v-flex xs12 sm12 md12>
                <div class="ma-2 ">
                  <v-btn block tile raised color="primary" dark @click="submit">
                    <v-icon left>mdi-cloud-outline</v-icon>
                    <span right>UPLOAD</span>
                  </v-btn>
                </div>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import { VueEditor } from "vue2-editor";

export default {
  props: ["blog"],
  components: {
    VueEditor
  },
  mixins: [validationMixin],
  validations: {
    title: { required, minLength: minLength(6) },
    subtitle: { required, minLength: minLength(10) },
    category: { required },
    body: { required }
  },
  data() {
    return {
      title: this.blog.title,
      subtitle: this.blog.subtitle,
      category: this.blog.category,
      body: this.blog.body,
      date: new Date().toISOString(),
      dialog: false,
      //cat
      items: ["kennedy", "baraka"]
    };
  },
  computed: {
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.minLength &&
        errors.push("title must be more than 6 characters.");
      !this.$v.title.required && errors.push("title  is required!");
      return errors;
    },
    subtitleErrors() {
      const errors = [];
      if (!this.$v.subtitle.$dirty) return errors;
      !this.$v.subtitle.minLength &&
        errors.push("subtitle must be more than 10 characters.");
      !this.$v.subtitle.required && errors.push("subtitle  is required!");
      return errors;
    },
    categoryErrors() {
      const errors = [];
      if (!this.$v.category.$dirty) return errors;
      !this.$v.category.required && errors.push("category  is required!");
      return errors;
    },
    bodyErrors() {
      const errors = [];
      if (!this.$v.body.$dirty) return errors;
      !this.$v.body.minLength &&
        errors.push("body must be more than 200 characters.");
      !this.$v.body.required && errors.push("body  is required!");
      return errors;
    },

    categories() {
      return this.$store.getters.categories;
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        //invalid
      } else {
        //valid
        console.log("submit!");
        console.log(this.blog.id);
        //  submit logic
        this.$store
          .dispatch("updateblog", {
            id: this.blog.id,
            title: this.title,
            subtitle: this.subtitle,
            category: this.category,
            body: this.body,
            date: this.date
          })
          .then(() => {
            this.dialog = false;
            this.$emit("updated");
          }, 300);
      }
    }
  }
};
</script>

<style scoped>
div {
  overflow: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;
}

::-webkit-scrollbar {
  width: 2px;
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgb(154, 154, 160);
}

.bg {
  background-color: rgb(245, 245, 245) !important;
}

.fluid {
  height: auto;
  width: 100%;
}
</style>
