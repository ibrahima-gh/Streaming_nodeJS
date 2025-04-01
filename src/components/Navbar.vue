<template>
  <div>
    <header class="absolute z-50 w-full text-white p-8 flex flex-col md:flex-row items-center justify-between">
      <div class="flex items-center justify-between w-full md:w-auto">
        <h1 class="text-3xl font-bold cursor-pointer hover:text-rose-500 flex gap-5" @click="$router.push('/')">
          🎥 <span>Streaming </span>
        </h1>
        <!-- Bouton burger pour mobile -->
        <button @click="toggleMenu" class="md:hidden text-white ">
          <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0,0,256,256" width="50px" height="50px" fill-rule="nonzero">
            <g fill="#ffffff">
              <g transform="scale(5.12,5.12)">
                <path d="M0,9v2h50v-2zM0,24v2h50v-2zM0,39v2h50v-2z" />
              </g>
            </g>
          </svg>
          <p v-else class="text-white text-3xl">X</p>
        </button>
      </div>

      <nav :class="{'flex w-full mt-8 items-start': isMenuOpen, 'hidden': !isMenuOpen}"
        class="md:flex flex-col md:flex-row gap-10 items-center text-xl">

        <RouterLink to="/" class="hover:text-red-500 transition">Accueil</RouterLink>
        <RouterLink to="/catalogue" class="hover:text-red-500 transition">Catalogue</RouterLink>
        <RouterLink v-if="!user" to="/register" class="bg-red-500 py-2 px-4 rounded transition">S'identifier</RouterLink>

        <!-- Affiche le nom d'utilisateur si connecté -->
        <RouterLink to="/dashboard" v-else class="text-lg text-white bg-red-600 py-2 px-4 rounded-lg transition">{{ user.username }}</RouterLink>

        <button
          v-if="user"
          @click="logout"
          class="hidden text-lg bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Déconnexion
        </button>
      </nav>
    </header>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();
const user = userStore.user;
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const logout = () => {
  userStore.logout();
};
</script>