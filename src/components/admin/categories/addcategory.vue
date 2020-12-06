<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      scrollable
      fullscreen=""
      transition="slide-x-reverse-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn color="primary " dark v-on="on" fab raised fixed bottom right
          ><v-icon>mdi-plus</v-icon></v-btn
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
        <!-- <v-card-title>Add a Product</v-card-title>
        <v-divider></v-divider> -->
        <v-card-text style="height: 1000px;">
          <v-form class="ma-2">
            <v-subheader>CATEGORY</v-subheader>
            <v-layout row wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  class="mx-2"
                  label="category*"
                  prepend-inner-icon="mdi-view-list-outline"
                  clearable
                  v-model="category"
                  :error-messages="categoryErrors"
                  required
                  @input="$v.category.$touch()"
                  @blur="$v.category.$touch()"
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm12 md12>
                <div class="ma-2 ">
                  <v-btn
                    block
                    tile
                    raised
                    color="primary"
                    dark
                    @click="submit"
                    :loading="isloading"
                  >
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
export default {
  mixins: [validationMixin],
  validations: {
    category: { required, minLength: minLength(4) }
  },
  data() {
    return {
      category: "",
      dialog: false
    };
  },
  computed: {
    categoryErrors() {
      const errors = [];
      if (!this.$v.category.$dirty) return errors;
      !this.$v.category.minLength &&
        errors.push("Category must be more than 3 characters.");
      !this.$v.category.required && errors.push("This is a required field!");
      return errors;
    },
    isloading() {
      //get state
      return false;
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
        //  submit logic
        this.$store.dispatch("createcategory", {
          category: this.category
        });
        //create a users table
      }
    }
  }
};
</script>
<style></style>
