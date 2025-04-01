<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-lg bg-zinc-800 p-10 rounded-4xl shadow-lg text-white">
      <h1 class="text-4xl font-extrabold text-center text-red-500 mb-10">Connexion</h1>
      <form @submit.prevent="handleLogin" class="flex flex-col gap-8">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-300 mb-2">Nom d'utilisateur</label>
          <input
            v-model="username"
            type="text"
            id="username"
            placeholder="Entrez votre nom d'utilisateur"
            class="w-full p-5 border-2 rounded-3xl text-white border-zinc-600 placeholder-white/50 focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium mb-2">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Entrez votre mot de passe"
            class="w-full p-5 border-2 rounded-3xl text-white border-zinc-600 placeholder-white/50 focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full py-5 bg-red-600 text-white font-semibold rounded-3xl shadow-md hover:bg-red-700 transition"
        >
          Se connecter
        </button>
      </form>
      <p class="text-center mt-6">
        Pas encore de compte ? 
        <router-link to="/register" class="text-red-500 hover:underline">Inscrivez-vous</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../stores/userStore';
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async handleLogin() {
      if (this.username && this.password) {
        try {
          // Envoi de la requête POST pour la connexion
          const response = await axios.post("http://localhost:3000/api/login", {
            username: this.username,
            password: this.password,
          });

          // Si la connexion réussie
          if (response.data.message === "Connexion réussie") {
            console.log("Utilisateur connecté:", response.data.user);

            const userStore = useUserStore();
            userStore.setUser(response.data.user);
            this.$router.push("/dashboard");
          } else {
            console.error('Erreur lors de la connexion:', response.data.error);
          }
        } catch (error) {
          console.error("Erreur serveur ou identifiants incorrects:", error);
        }
      } else {
        console.error("Veuillez remplir tous les champs.");
      }
    },
  },
};
</script>