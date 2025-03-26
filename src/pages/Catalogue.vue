<template>
  <div class="bg-black text-white min-h-screen px-6 relative">
    <!-- Effet de souris -->
    <!-- Supprimé l'élément cursor-follow -->
    <!-- Barre de recherche avec logo -->
    <div class="flex items-center justify-center py-6">
      <div class="relative w-full max-w-md">
        <img src="/popcorn.png" alt="Popcorn" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-8 h-8" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher un film ou une série..."
          class="w-full p-3 pl-12 border rounded-md shadow-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-transform transform hover:scale-105"
        />
      </div>
    </div>

    <!-- Filtres par catégorie -->
    <div class="flex space-x-4 mb-6 justify-center">
      <button
        v-for="category in categories"
        :key="category"
        @click="filterCategory(category)"
        :class="[ 
          'px-4 py-2 rounded-lg text-sm font-semibold transition',
          selectedCategory === category
            ? 'bg-red-600 text-white'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        ]"
      >
        {{ category }}
      </button>
    </div>

    <!-- Grille des films/séries -->
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <router-link
        v-for="item in filteredItems"
        :key="item.id"
        :to="{ path: `/movie/${item.id}` }"
        class="relative group block"
      >
        <img
          :src="item.image"
          :alt="item.title"
          class="w-full rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:brightness-75"
        />
        <p class="text-sm mt-2 text-center group-hover:text-red-500 transition">{{ item.title }}</p>
      </router-link>
    </div>

    <!-- Modal pour les détails -->
    <div v-if="selectedMovie" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-2xl font-bold mb-4">{{ selectedMovie.title }}</h2>
        <img :src="selectedMovie.image" alt="Affiche" class="w-full rounded-lg mb-4" />
        <p class="text-gray-300">Description du film ou série...</p>
        <button
          @click="closeDetails"
          class="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Fermer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      selectedCategory: "Tous",
      selectedMovie: null, // Film ou série sélectionné(e)
      categories: ["Tous", "Films", "Séries"],
      items: [
        { id: "1", title: "Inception", image: "/public/téléchargement.jpg", category: "Films" },
        { id: "2", title: "Interstellar", image: "/public/images.jpg", category: "Films" },
        { id: "3", title: "The Dark Knight", image: "/public/18949761.jpg", category: "Films" },
        { id: "4", title: "Avengers: Endgame", image: "/public/0472053.jpg", category: "Films" },
        { id: "5", title: "Dune", image: "/public/4633954.webp", category: "Films" },
        { id: "6", title: "Spider-Man: No Way Home", image: "/public/4860598.webp", category: "Films" },
        { id: "7", title: "Breaking Bad", image: "/public/breakingbad.jpg", category: "Séries" },
        { id: "8", title: "Game of Thrones", image: "/public/got.jpg", category: "Séries" },
        { id: "9", title: "Stranger Things", image: "/public/strangerthings.jpg", category: "Séries" },
      ],
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter((item) => {
        const matchesCategory =
          this.selectedCategory === "Tous" || item.category === this.selectedCategory;
        const matchesSearch =
          item.title.toLowerCase().includes(this.searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });
    },
  },
  methods: {
    filterCategory(category) {
      this.selectedCategory = category;
    },
    showDetails(item) {
      this.selectedMovie = item;
    },
    closeDetails() {
      this.selectedMovie = null;
    },
  },
};
</script>

<style scoped>
/* Grille des éléments */
.grid {
  display: grid;
  gap: 1rem;
}

/* Boutons de filtre */
button {
  transition: all 0.3s ease;
}

/* Animation des images */
div img {
  transition: transform 0.3s ease, brightness 0.3s ease;
}

div:hover img {
  transform: scale(1.05);
  brightness: 0.75;
}

div:hover p {
  color: #ef4444; /* Rouge */
}
</style>
