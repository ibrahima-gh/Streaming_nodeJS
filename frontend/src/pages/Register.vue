<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-lg bg-zinc-800 p-10 rounded-4xl shadow-lg">
      <h1 class="text-4xl font-extrabold text-center text-red-500 mb-10">Inscription</h1>
      <form @submit.prevent="handleRegister" class="flex flex-col gap-8">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-300 mb-2">Nom d'utilisateur</label>
          <input
            v-model="username"
            type="text"
            id="username"
            placeholder="Entrez votre nom d'utilisateur"
            class="w-full p-5 border-2 rounded-3xl  text-white border-zinc-600 placeholder-white/50 text-white focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Adresse e-mail</label>
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
          <label for="password" class="block text-sm font-medium text-gray-300 mb-2">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Entrez votre mot de passe"
            class="w-full p-5 border-2 rounded-3xl text-white border-zinc-600 placeholder-white/50 text-white focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full py-5 bg-red-600 text-white font-semibold rounded-3xl shadow-md hover:bg-red-700 transition"
        >
          S'inscrire
        </button>
      </form>
      <p class="text-center text-gray-400 mt-6">
        Vous avez déjà un compte ?
        <router-link to="/login" class="text-red-500 hover:underline hover:text-red-400 transition">Connectez-vous</router-link>
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
    async handleRegister() {
      if (this.username && this.email && this.password) {
        try {
          const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: this.username,
              email: this.email,
              password: this.password,
            }),
          });

          const data = await response.json();

          if (response.ok) {
            alert('Inscription réussie !');
            this.$router.push('/');
          } else {
            alert(data.error || 'Erreur lors de l\'inscription.');
          }
        } catch (error) {
          console.error('Erreur:', error);
          alert('Une erreur est survenue, veuillez réessayer.');
        }
      } else {
        alert('Veuillez remplir tous les champs.');
      }
    },
  },
};
</script>