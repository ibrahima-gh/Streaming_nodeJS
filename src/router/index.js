import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Catalogue from "../pages/Catalogue.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";

const routes = [
  {
    path: "/", // Route par défaut
    name: "Home",
    component: Home,
  },
  {
    path: "/catalogue",
    name: "Catalogue",
    component: Catalogue,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/:pathMatch(.*)*", // Redirection pour les routes non trouvées
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
