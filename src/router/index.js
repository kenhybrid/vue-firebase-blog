import Vue from "vue";
import VueRouter from "vue-router";
//admin
import Dashboard from "../components/admin/dashboard";
import Categories from "../components/admin/categories.vue";
import Users from "../components/admin/users";
import Emails from "../components/admin/emails";
import Blogs from "../components/admin/blogs";
import System from "../components/admin/system";
//utils for blogs
import Editblog from "../components/admin/blogs/editblog";
import Viewblog from "../components/admin/blogs/viewblog";
//cat
import Editcategory from "../components/admin/categories/editcategory";
// //auth
import Auth from "@/components/auth/auth";
import Authguard from "./auth-guard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Auth",
    component: Auth
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: Authguard
  },

  {
    path: "/categories",
    name: "Categories",
    component: Categories,
    beforeEnter: Authguard
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    beforeEnter: Authguard
  },
  {
    path: "/emails",
    name: "Emails",
    component: Emails,
    beforeEnter: Authguard
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
    meta: {
      reload: true
    },
    beforeEnter: Authguard
  },
  {
    path: "/editblog/:id",
    name: "Editblog",
    props: true,
    meta: {
      reload: true
    },
    component: Editblog,
    beforeEnter: Authguard
  },
  {
    path: "/system",
    name: "System",
    component: System,
    beforeEnter: Authguard
  },
  {
    path: "/viewblog/:id",
    name: "Viewblog",
    props: true,
    component: Viewblog
  },
  {
    path: "/editcategory/:id",
    name: "Editcategory",
    props: true,
    component: Editcategory,
    beforeEnter: Authguard
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
