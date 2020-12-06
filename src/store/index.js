import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
const firebase = require("../model");
// import Cookies from "js-cookie";
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  // plugins: [
  //   createPersistedState({
  //     storage: {
  //       getItem: key => Cookies.get(key),
  //       setItem: (key, value) =>
  //         Cookies.set(key, value, { expires: 3, secure: true }),
  //       removeItem: key => Cookies.remove(key)
  //     }
  //   })
  // ],
  state: {
    loading: false,
    user: null,
    blogs: [],
    emails: [],
    users: [],
    categories: ["kennedy", "baraka"]
  },
  getters: {
    blogs(state) {
      return state.blogs;
    },
    blog(state) {
      return id => {
        return state.blogs.find(blog => {
          return blog.id === id;
        });
      };
    },
    blogslength(state) {
      return state.blogs.length;
    },
    emailslength(state) {
      return state.emails.length;
    },
    userslength(state) {
      return state.users.length;
    },
    emails(state) {
      return state.emails;
    },
    categories(state) {
      return state.categories;
    },

    users(state) {
      return state.users;
    },
    user(state) {
      return state.user;
    },
    setloading(state) {
      return state.loading;
    }
  },
  mutations: {
    //loading from firebase
    loadblogs(state, payload) {
      state.blogs = payload;
    },
    loademails(state, payload) {
      state.emails = payload;
    },
    loadcategories(state, payload) {
      state.categories = payload;
    },

    loadusers(state, payload) {
      state.users = payload;
    },

    //inserting into firebase
    createcategory(state, payload) {
      state.categories.push(payload);
    },
    createblog(state, blogdata) {
      state.blogs.push(blogdata);
    },

    deleteblog(state, payload) {
      var index = state.blogs.findIndex(blog => {
        return payload.id == blog.id;
      });
      state.blogs.splice(index, 1);
    },
    deleteemail(state, payload) {
      var index = state.emails.findIndex(email => {
        return payload.id == email.id;
      });
      state.emails.splice(index, 1);
    },
    updateblog(state, payload) {
      const blog = state.blogs.find(blog => {
        return blog.id === payload.id;
      });
      if (payload.title) {
        blog.title = payload.title;
      }
      if (payload.subtitle) {
        blog.subtitle = payload.subtitle;
      }
      if (payload.category) {
        blog.category = payload.category;
      }
      if (payload.body) {
        blog.body = payload.body;
      }
      if (payload.date) {
        blog.date = payload.date;
      }
    },

    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    //loading from firebase
    loadblogs({ commit }) {
      firebase.database
        .collection("blogs")
        .orderBy("date", "desc")
        .get()
        .then(querySnapshot => {
          const blogs = [];
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id,
              title: doc.data().title,
              subtitle: doc.data().subtitle,
              body: doc.data().body,
              category: doc.data().category,
              author: doc.data().author,
              comments: doc.data().comments,
              likes: doc.data().likes,
              dislikes: doc.data().dislikes,
              date: doc.data().date,
              image: doc.data().image
            };
            blogs.push(data);
            console.log(doc.id, " => ", doc.data());
          });
          commit("loadblogs", blogs);
        })
        .catch(error => {
          console.log("Error getting documents: ", error);
        });
    },
    loademails({ commit }) {
      firebase.database
        .collection("emails")
        .get()
        .then(querySnapshot => {
          const emails = [];
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id,
              sender: doc.data().sender,
              email: doc.data().email,
              subject: doc.data().subject,
              message: doc.data().message,
              date: doc.data().date
            };
            emails.push(data);
            console.log(doc.id, " => ", doc.data());
          });
          commit("loademails", emails);
        })
        .catch(error => {
          console.log("Error getting documents: ", error);
        });
    },
    loadcategories({ commit }) {
      firebase.database
        .collection("categories")
        .get()
        .then(querySnapshot => {
          const categories = [];
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id,
              name: doc.data().name,
              date: doc.data().date
            };
            categories.push(data);
            console.log(doc.id, " => ", doc.data());
          });
          commit("loadcategories", categories);
        })
        .catch(error => {
          console.log("Error getting documents: ", error);
        });
    },

    loadusers({ commit }) {
      firebase.database
        .collection("users")
        .get()
        .then(querySnapshot => {
          const users = [];
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id,
              firstname: doc.data().firstname,
              lastname: doc.data().lastname,
              email: doc.data().email,
              date: doc.data().date
            };
            users.push(data);
            console.log(doc.id, " => ", doc.data());
          });
          commit("loadusers", users);
        })
        .catch(error => {
          console.log("Error getting documents: ", error);
        });
    },
    //nserting to firebase
    createcategory({ commit }, payload) {
      const category = {
        category: payload.category
      };
      firebase.database
        .collection("categories")
        .doc()
        .set(category)
        .then(() => {
          commit("createcategory", category);
        })
        .catch(error => {
          console.log("Error  ", error);
        });
    },
    createblog({ commit }, payload) {
      const blog = {
        title: payload.title,
        subtitle: payload.subtitle,
        category: payload.category,
        body: payload.body,
        date: payload.date,
        author: payload.author,
        likes: payload.likes,
        dislikes: payload.dislikes,
        comments: payload.comments
      };
      firebase.database
        .collection("blogs")
        .add(blog)
        .then(doc => {
          const id = doc.id;
          console.log("Document successfully written!");
          console.log(id);
          const blogdata = {
            id: id,
            title: payload.title,
            subtitle: payload.subtitle,
            category: payload.category,
            body: payload.body,
            date: payload.date,
            author: payload.author,
            likes: payload.likes,
            dislikes: payload.dislikes,
            comments: payload.comments
          };
          commit("createblog", blogdata);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },

    deleteblog({ commit }, payload) {
      firebase.database
        .collection("blogs")
        .doc(payload.id)
        .delete()
        .then(() => {
          console.log("successfully deleted");
          commit("deleteblog", payload);
        })
        .catch(() => {
          console.log("error while deleting");
        });
    },
    updateblog({ commit }, payload) {
      const updateblog = {};
      if (payload.title) {
        updateblog.title = payload.title;
      }
      if (payload.subtitle) {
        updateblog.subtitle = payload.subtitle;
      }
      if (payload.category) {
        updateblog.category = payload.category;
      }
      if (payload.body) {
        updateblog.body = payload.body;
      }
      if (payload.date) {
        updateblog.date = payload.date;
      }
      firebase.database
        .collection("blogs")
        .doc(payload.id)
        .update(updateblog)
        .then(() => {
          commit("updateblog", payload);
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteemail({ commit }, payload) {
      firebase.database
        .collection("emails")
        .doc(payload.id)
        .delete()
        .then(() => {
          console.log("successfully deleted");
          commit("deleteemail", payload);
        })
        .catch(() => {
          console.log("error while deleting");
        });
    },
    signUp({ commit }, payload) {
      commit("setLoading", true);
      firebase.auth
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const newUser = {
            id: user.uid
          };
          commit("setUser", newUser);
          commit("setLoading", false);
        })
        .catch(error => {
          console.log(error.message);
          commit("setLoading", false);
        });
    },
    signIn({ commit }, payload) {
      commit("setLoading", true);
      firebase.auth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const newUser = {
            id: user.uid
          };
          commit("setUser", newUser);
          commit("setLoading", false);
        })
        .catch(error => {
          console.log(error.message);
          commit("setLoading", false);
        });
    },
    autoSignin({ commit }, payload) {
      //dipatch it in acreated cycle
      commit("setUser", {
        id: payload.uid
      });
    },
    logOut({ commit }) {
      firebase.auth.signOut().then(() => {
        commit("setUser", null);
        this.$router.push("/login");
        console.log("logged out");
      });
      commit("setUser", null);
    } //add users to firebase
  }
});
// methods: {
//   uploadImage(e) {
//     if (e.target.files[0]) {
//       let file = e.target.files[0];

//       var storageRef = fb
//         .storage()
//         .ref("products/" + Math.random() + "_" + file.name);

//       let uploadTask = storageRef.put(file);

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {},
//         (error) => {
//           // Handle unsuccessful uploads
//         },
//         () => {
//           // Handle successful uploads on complete
//           // For instance, get the download URL: https://firebasestorage.googleapis.com/...

//           uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//             this.product.images.push(downloadURL);
//           });
//         }
//       );
//     }
//   },
// },

// var file = ...

// // Create the file metadata
// var metadata = {
//   contentType: 'image/jpeg'
// };

// // Upload file and metadata to the object 'images/mountains.jpg'
// var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

// // Listen for state changes, errors, and completion of the upload.
// uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
//   function(snapshot) {
//     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log('Upload is ' + progress + '% done');
//     switch (snapshot.state) {
//       case firebase.storage.TaskState.PAUSED: // or 'paused'
//         console.log('Upload is paused');
//         break;
//       case firebase.storage.TaskState.RUNNING: // or 'running'
//         console.log('Upload is running');
//         break;
//     }
//   }, function(error) {

//   // A full list of error codes is available at
//   // https://firebase.google.com/docs/storage/web/handle-errors
//   switch (error.code) {
//     case 'storage/unauthorized':
//       // User doesn't have permission to access the object
//       break;

//     case 'storage/canceled':
//       // User canceled the upload
//       break;

//     ...

//     case 'storage/unknown':
//       // Unknown error occurred, inspect error.serverResponse
//       break;
//   }
// }, function() {
//   // Upload completed successfully, now we can get the download URL
//   uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
//     console.log('File available at', downloadURL);
//   });
// });

// createblog({ commit }, payload) {
//   const blog = {
//     title: payload.title,
//     subtitle: payload.subtitle,
//     category: payload.category,
//     body: payload.body,
//     date: payload.date,
//     author: payload.author,
//     likes: payload.likes,
//     dislikes: payload.dislikes,
//     comments: payload.comments,
//   };
//   let imgurl;
//   let key;
//   firebase.database
//     .collection("blogs")
//     .doc()
//     .set(blog)
//     .then((doc) => {
//       doc.data().id = key;

//       return key;
//     })
//     // .then((data) => {
//     //   const id = {
//     //     id: data.id,
//     //   };
//     //   return id;
//     //   // const filename = payload.image.name;
//     //   // const ext = filename.slice(filename.lastIndexOf("."));
//     //   // return firebase.storage
//     //   //   .ref("/blogs/")
//     //   //   .child(key + ext)
//     //   //   .put(payload.image);
//     // })
//     // .then((filedata) => {
//     //   imgurl = filedata.metadata.downloadURLs[0];
//     //   return firebase.database
//     //     .collection("blogs")
//     //     .doc(key)
//     //     .update({
//     //       image: imgurl,
//     //     });
//     // })
//     .then(() => {
//       commit("createblog", {
//         ...blog,
//         image: imgurl,
//         id: key,
//       });
//     })
//     .catch((error) => {
//       console.log("Error  ", error);
//     });
// },
