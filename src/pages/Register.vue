<template>
  <div class="bg-black text-white min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold text-center mb-6">📝 Inscription</h1>
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium mb-2">Nom d'utilisateur</label>
          <input
            v-model="username"
            type="text"
            id="username"
            placeholder="Entrez votre nom d'utilisateur"
            class="w-full p-3 border rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium mb-2">Adresse e-mail</label>
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="Entrez votre e-mail"
            class="w-full p-3 border rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium mb-2">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Entrez votre mot de passe"
            class="w-full p-3 border rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <button
          type="submit"
          class="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 hover:scale-105 transition"
        >
          S'inscrire
        </button>
      </form>
      <p class="text-center text-gray-400 mt-4">
        Vous avez déjà un compte ?
        <router-link to="/login" class="text-red-500 hover:underline">Connectez-vous</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    handleRegister() {
      if (this.username && this.email && this.password) {
        const user = { username: this.username };
        localStorage.setItem("user", JSON.stringify(user));
        alert("Inscription réussie !");
        this.$router.push("/"); // Redirige vers la page d'accueil
      } else {
        alert("Veuillez remplir tous les champs.");
      }
    },
  },
};
</script>

<style scoped>
/* Ajout de styles pour la page d'inscription */
button {
  transition: all 0.3s ease;
}
</style>
