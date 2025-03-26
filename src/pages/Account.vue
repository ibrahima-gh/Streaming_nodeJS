s<template>
  <div class="bg-gradient-to-b from-black via-gray-900 to-black min-h-screen flex items-center justify-center">
    <div class="w-full max-w-4xl bg-gray-800 p-8 rounded-lg shadow-2xl transform hover:scale-105 transition duration-300">
      <h1 class="text-4xl font-extrabold text-center text-red-500 mb-6">👤 Mon Compte</h1>
      <div v-if="user">
        <!-- Informations personnelles -->
        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-red-500 mb-4">Informations personnelles</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p class="text-lg text-gray-300"><strong>Nom d'utilisateur :</strong> {{ user.username }}</p>
            <p class="text-lg text-gray-300"><strong>Email :</strong> {{ user.email }}</p>
            <p class="text-lg text-gray-300"><strong>Prénom :</strong> {{ user.firstName }}</p>
            <p class="text-lg text-gray-300"><strong>Ville :</strong> {{ user.city }}</p>
          </div>
        </div>

        <!-- Niveau d'abonnement -->
        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-red-500 mb-4">Niveau d'abonnement</h2>
          <div class="p-4 bg-gray-700 rounded-lg shadow-md">
            <p class="text-lg text-gray-300">
              <strong>Abonnement :</strong> {{ user.subscriptionLevel }}
            </p>
            <p class="text-sm text-gray-400 mt-2">
              Profitez de tous les avantages de votre abonnement {{ user.subscriptionLevel }} !
            </p>
          </div>
        </div>

        <!-- Films préférés -->
        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-red-500 mb-4">Films préférés</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div
              v-for="movie in user.favoriteMovies"
              :key="movie"
              class="p-4 bg-gray-700 rounded-lg shadow-md transform hover:scale-105 transition duration-300"
            >
              <p class="text-lg text-gray-300">{{ movie }}</p>
            </div>
          </div>
        </div>

        <!-- Vidéos téléchargées -->
        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-red-500 mb-4">Vidéos téléchargées</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div
              v-for="video in user.downloadedVideos"
              :key="video"
              class="p-4 bg-gray-700 rounded-lg shadow-md transform hover:scale-105 transition duration-300"
            >
              <p class="text-lg text-gray-300">{{ video }}</p>
            </div>
          </div>
        </div>

        <!-- Bouton de déconnexion -->
        <button
          @click="logout"
          class="w-full py-3 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
        >
          Déconnexion
        </button>
      </div>
      <div v-else>
        <p class="text-lg text-gray-300 mb-4">Vous n'êtes pas connecté.</p>
        <button
          @click="$router.push('/login')"
          class="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
        >
          Se connecter
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    } else {
      // Exemple de données utilisateur si non connecté
      this.user = {
        username: "JohnDoe",
        email: "johndoe@example.com",
        firstName: "John",
        city: "Paris",
        subscriptionLevel: "Premium",
        favoriteMovies: ["Inception", "Interstellar", "The Dark Knight"],
        downloadedVideos: ["Dune", "Avengers: Endgame"],
      };
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.user = null;
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
/* Ajout d'une animation subtile pour les boutons */
button {
  transition: all 0.3s ease;
}
</style>