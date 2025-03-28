<template>
  <div :class="theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'" class="min-h-screen px-6 relative">
    <!-- Bouton Dark Mode -->
    <div class="absolute top-4 right-4 z-50">
      <button
        @click="toggleTheme"
        class="p-3 rounded-full shadow-md focus:outline-none transition-transform transform hover:scale-110"
        :class="theme === 'dark' ? 'bg-gray-800 text-yellow-400' : 'bg-yellow-400 text-gray-800'"
      >
        <span v-if="theme === 'dark'">🌞</span>
        <span v-else>🌙</span>
      </button>
    </div>

    <!-- Barre de recherche avec logo -->
    <div class="flex items-center justify-center py-6 relative z-20">
      <div class="relative w-full max-w-lg">
        <img src="/popcorn.png" alt="Popcorn" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-8 h-8" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher un film ou une série..."
          class="w-full p-4 pl-14 border rounded-full shadow-md bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-transform transform hover:scale-105"
          :class="theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'"
        />
        <!-- Suggestions dynamiques -->
        <ul
          v-if="searchQuery && filteredItems.length"
          class="absolute top-full left-0 w-full rounded-lg shadow-lg mt-2 z-30 max-h-64 overflow-y-auto"
          :class="theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'"
        >
          <li
            v-for="item in filteredItems"
            :key="item.id"
            @click="goToMovie(item.id)"
            class="flex items-center p-3 cursor-pointer transition"
            :class="theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'"
          >
            <img
              :src="item.image"
              :alt="item.title"
              class="w-12 h-12 rounded-md mr-3 object-cover"
            />
            <span class="text-sm font-medium">{{ item.title }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Titre de la page -->
    <h1 class="text-4xl font-extrabold text-center my-8">🎬 Catalogue</h1>

    <!-- Section : En tendances -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-6 flex items-center">
        🔥 En tendances
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <router-link
          v-for="item in trendingItems"
          :key="item.id"
          :to="{ path: `/movie/${item.id}` }"
          class="block group"
        >
          <div class="relative overflow-hidden rounded-lg shadow-lg">
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-48 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <p class="text-white text-lg font-bold">{{ item.title }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </section>

    <!-- Section : Les plus récents -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-6 flex items-center">
        🆕 Les plus récents
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <router-link
          v-for="item in recentItems"
          :key="item.id"
          :to="{ path: `/movie/${item.id}` }"
          class="block group"
        >
          <div class="relative overflow-hidden rounded-lg shadow-lg">
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-48 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <p class="text-white text-lg font-bold">{{ item.title }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </section>

    <!-- Section : Comédie -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-6 flex items-center">
        😂 Comédie
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <router-link
          v-for="item in comedyItems"
          :key="item.id"
          :to="{ path: `/movie/${item.id}` }"
          class="block group"
        >
          <div class="relative overflow-hidden rounded-lg shadow-lg">
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-48 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <p class="text-white text-lg font-bold">{{ item.title }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </section>

    <!-- Section : Super-héros -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-6 flex items-center">
        🦸‍♂️ Super-héros
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <router-link
          v-for="item in superheroItems"
          :key="item.id"
          :to="{ path: `/movie/${item.id}` }"
          class="block group"
        >
          <div class="relative overflow-hidden rounded-lg shadow-lg">
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-48 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <p class="text-white text-lg font-bold">{{ item.title }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      theme: localStorage.getItem("theme") || "dark",
      items: [
        { id: "1", title: "Inception", image: "/public/téléchargement.jpg", category: "Action", trending: true, recent: true },
        { id: "2", title: "Interstellar", image: "/public/images.jpg", category: "Action", trending: true },
        { id: "3", title: "The Dark Knight", image: "/public/18949761.jpg", category: "Super-héros", trending: true },
        { id: "4", title: "Avengers: Endgame", image: "/public/0472053.jpg", category: "Super-héros", recent: true },
        { id: "5", title: "Dune", image: "/public/4633954.webp", category: "Action", recent: true },
        { id: "6", title: "Spider-Man: No Way Home", image: "/public/4860598.webp", category: "Super-héros", trending: true },
        { id: "7", title: "The Hangover", image: "/public/hangover.jpg", category: "Comédie", recent: true },
        { id: "8", title: "Game of Thrones", image: "/public/got.jpg", category: "Action" },
        { id: "9", title: "Stranger Things", image: "/public/strangerthings.jpg", category: "Action", trending: true },
        { id: "10", title: "Deadpool", image: "/public/deadpool.jpg", category: "Comédie", trending: true },
      ],
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter((item) =>
        item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    trendingItems() {
      return this.items.filter((item) => item.trending);
    },
    recentItems() {
      return this.items.filter((item) => item.recent);
    },
    comedyItems() {
      return this.items.filter((item) => item.category === "Comédie");
    },
    superheroItems() {
      return this.items.filter((item) => item.category === "Super-héros");
    },
  },
  methods: {
    goToMovie(id) {
      this.$router.push(`/movie/${id}`);
    },
    toggleTheme() {
      this.theme = this.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", this.theme);
    },
  },
};
</script>

<style scoped>
/* Styles modernisés */
body {
  font-family: 'Arial', sans-serif;
}

h1, h2 {
  font-family: 'Poppins', sans-serif;
}

button {
  transition: all 0.3s ease;
}

button:hover {
  transform: scale(1.1);
}

img {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.group:hover img {
  transform: scale(1.1);
  opacity: 0.9;
}
</style>