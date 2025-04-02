import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Catalogue from "@/pages/Catalogue.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import Dashboard from "@/pages/Dashboard.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/catalogue", component: Catalogue },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/dashboard", component: Dashboard },
  { path: "/:pathMatch(.*)*", redirect: "/" }, // Redirige vers la page d'accueil si aucune route ne correspond
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
