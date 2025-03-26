<template>
  <div>
    <header class="bg-black text-white p-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold">🎥 Streaming App</h1>
      <div v-if="user" class="flex items-center space-x-4">
        <p class="text-sm">Bienvenue, {{ user.username }}</p>
        <img src="/account-icon.png" alt="Compte" class="w-8 h-8 rounded-full" />
      </div>
    </header>
    <router-view />
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
