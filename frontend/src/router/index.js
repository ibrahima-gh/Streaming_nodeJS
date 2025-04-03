import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Catalogue from "@/pages/Catalogue.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import Dashboard from "@/pages/Dashboard.vue";
import FilmPage from "@/pages/FilmPage.vue";
import Admin from "@/pages/Admin.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/catalogue", component: Catalogue },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/dashboard", component: Dashboard },
  { path: "/film/:id", component: FilmPage, props: true },
  { path: "/admin", component: Admin },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
