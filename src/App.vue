<template>
  <div>
    <header class="bg-gray-800 text-white p-4 flex flex-col md:flex-row md:justify-between items-center">
      <h1 class="text-3xl font-bold cursor-pointer hover:text-red-500 transition mb-4 md:mb-0" @click="$router.push('/')">
        🎥 Streaming App
      </h1>
      <nav class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 items-center">
        <router-link to="/" class="text-lg hover:text-red-500 transition">Accueil</router-link>
        <router-link to="/catalogue" class="text-lg hover:text-red-500 transition">Catalogue</router-link>
        <router-link to="/account" class="text-lg hover:text-red-500 transition">Mon Compte</router-link>
        <router-link to="/login" v-if="!user" class="text-lg hover:text-red-500 transition">Se connecter</router-link>
        <router-link to="/register" v-if="!user" class="text-lg hover:text-red-500 transition">S'inscrire</router-link>
        <button
          v-if="user"
          @click="logout"
          class="text-lg bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Déconnexion
        </button>
      </nav>
    </header>
    <router-view @user-updated="updateUser" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null, // Stocke les informations de l'utilisateur connecté
    };
  },
  mounted() {
    // Vérifie si un utilisateur est connecté (simulé ici avec localStorage)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  },
  methods: {
    updateUser(user) {
      this.user = user;
    },
    logout() {
      localStorage.removeItem("user");
      this.user = null;
      this.$router.push("/login");
    },
  },
};
</script>

<style>
/* Masquer la scrollbar horizontale */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Ajout des effets de la barre de recherche */
input[type="text"] {
  transition: all 0.3s ease;
}
</style>
