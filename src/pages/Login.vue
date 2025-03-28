<template>
  <div :class="theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'" class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg" :class="theme === 'dark' ? 'bg-gray-800' : 'bg-white'">
      <h1 class="text-4xl font-extrabold text-center text-red-500 mb-6">🔐 Connexion</h1>
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium mb-2">Adresse e-mail</label>
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="Entrez votre e-mail"
            class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            :class="theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium mb-2">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Entrez votre mot de passe"
            class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            :class="theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'"
          />
        </div>
        <button
          type="submit"
          class="w-full py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition"
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
export default {
  data() {
    return {
      email: "",
      password: "",
      theme: localStorage.getItem("theme") || "dark",
    };
  },
  methods: {
    handleLogin() {
      if (this.email && this.password) {
        alert("Connexion réussie !");
      } else {
        alert("Veuillez remplir tous les champs.");
      }
    },
  },
};
</script>

<style scoped>
/* Modernisation des styles */
button {
  transition: all 0.3s ease;
}

button:hover {
  transform: scale(1.05);
}
</style>
