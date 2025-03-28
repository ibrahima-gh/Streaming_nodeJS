<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-lg bg-zinc-800 p-10 rounded-4xl shadow-lg text-white">
      <h1 class="text-4xl font-extrabold text-center text-red-500 mb-10">Connexion</h1>
      <form @submit.prevent="handleLogin" class="flex flex-col gap-8">
        <div>
          <label for="email" class="block text-sm font-medium mb-2">Adresse e-mail</label>
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="Entrez votre e-mail"
            class="w-full p-5 border-2 rounded-3xl text-white border-zinc-600 placeholder-white/50 text-white focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
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
            class="w-full p-5 border-2 rounded-3xl  text-white border-zinc-600 placeholder-white/50 text-white focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
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
