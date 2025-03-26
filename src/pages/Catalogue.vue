<template>
  <div class="bg-black text-white min-h-screen px-6 relative">
    <!-- Effet de souris -->
    <div class="cursor-follow"></div>

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
      <a
        v-for="item in filteredItems"
        :key="item.id"
        href="#"
        class="relative group block"
      >
        <img
          :src="item.image"
          :alt="item.title"
          class="w-full rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:brightness-75"
        />
        <p class="text-sm mt-2 text-center group-hover:text-red-500 transition">{{ item.title }}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      selectedCategory: "Tous",
      categories: ["Tous", "Films", "Séries"],
      items: [
        { id: 1, title: "Inception", image: "/public/téléchargement.jpg", category: "Films" },
        { id: 2, title: "The Dark Knight", image: "/public/images.jpg", category: "Films" },
        { id: 3, title: "Interstellar", image: "/public/18949761.jpg", category: "Films" },
        { id: 4, title: "Avengers: Endgame", image: "/public/0472053.jpg", category: "Films" },
        { id: 5, title: "Dune", image: "/public/4633954.webp", category: "Films" },
        { id: 6, title: "Spider-Man: No Way Home", image: "/public/4860598.webp", category: "Films" },
        { id: 7, title: "Breaking Bad", image: "/public/breakingbad.jpg", category: "Séries" },
        { id: 8, title: "Game of Thrones", image: "/public/got.jpg", category: "Séries" },
        { id: 9, title: "Stranger Things", image: "/public/strangerthings.jpg", category: "Séries" },
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
  },
  mounted() {
    // Effet de souris
    const cursor = document.createElement("div");
    cursor.classList.add("cursor-follow");
    document.body.appendChild(cursor);

    document.addEventListener("mousemove", (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
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

/* Effet de souris */
.cursor-follow {
  position: fixed;
  width: 20px;
  height: 20px;
  background-color: rgba(255, 0, 0, 0.7);
  border-radius: 50%;
  pointer-events: none;
  z-index: 50;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease;
}

/* Animation des images */
a img {
  transition: transform 0.3s ease, brightness 0.3s ease;
}

a:hover img {
  transform: scale(1.05);
  brightness: 0.75;
}

a:hover p {
  color: #ef4444; /* Rouge */
}
</style>
