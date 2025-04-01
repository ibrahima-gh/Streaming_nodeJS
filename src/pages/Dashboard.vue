<template>
  <div class="flex items-center justify-center min-h-screen text-white">
    <!-- Affichage de l'utilisateur connecté ou d'un message si aucun utilisateur n'est connecté -->
    <div class="text-center">
      <p v-if="userStore.user" class="text-2xl mb-4">Utilisateur connecté : {{ userStore.user.username }}</p>
      <p v-else class="text-2xl mb-4">Aucun utilisateur connecté</p>
  
      <!-- Bouton de déconnexion affiché uniquement si un utilisateur est connecté -->
      <button
        v-if="userStore.user"
        @click="logout"
        class="text-lg bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
      >
        Déconnexion
      </button>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../stores/userStore';

export default {
  computed: {
    userStore() {
      return useUserStore();
    }
  },
  methods: {
    logout() {
      this.userStore.logout();
    }
  }
}
</script>