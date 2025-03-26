<template>
  <div class="bg-black text-white min-h-screen flex items-center justify-center">
    <div class="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition">
      <h1 class="text-4xl font-bold text-center mb-6">Mon Compte</h1>
      <div v-if="user">
        <!-- Informations personnelles -->
        <div class="mb-6">
          <h2 class="text-2xl font-semibold mb-4">Informations personnelles</h2>
          <p class="text-lg text-gray-300"><strong>Nom d'utilisateur :</strong> {{ user.username }}</p>
          <p class="text-lg text-gray-300"><strong>Email :</strong> {{ user.email }}</p>
          <p class="text-lg text-gray-300"><strong>Prénom :</strong> {{ user.firstName }}</p>
          <p class="text-lg text-gray-300"><strong>Ville :</strong> {{ user.city }}</p>
        </div>

        <!-- Niveau d'abonnement -->
        <div class="mb-6">
          <h2 class="text-2xl font-semibold mb-4">Niveau d'abonnement</h2>
          <p class="text-lg text-gray-300">
            <strong>Abonnement :</strong> {{ user.subscriptionLevel }}
          </p>
        </div>

        <!-- Films préférés -->
        <div class="mb-6">
          <h2 class="text-2xl font-semibold mb-4">Ce que j'aime regarder</h2>
          <ul class="list-disc list-inside text-gray-300">
            <li v-for="movie in user.favoriteMovies" :key="movie">{{ movie }}</li>
          </ul>
        </div>

        <!-- Vidéos téléchargées -->
        <div class="mb-6">
          <h2 class="text-2xl font-semibold mb-4">Mes vidéos téléchargées</h2>
          <ul class="list-disc list-inside text-gray-300">
            <li v-for="video in user.downloadedVideos" :key="video">{{ video }}</li>
          </ul>
        </div>

        <!-- Bouton de déconnexion -->
        <button
          @click="logout"
          class="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 hover:scale-105 transition-transform transform"
        >
          Déconnexion
        </button>
      </div>
      <div v-else>
        <p class="text-lg text-gray-300 mb-4">Vous n'êtes pas connecté.</p>
        <button
          @click="$router.push('/login')"
          class="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:scale-105 transition-transform transform"
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
button {
  transition: all 0.3s ease;
}
</style>