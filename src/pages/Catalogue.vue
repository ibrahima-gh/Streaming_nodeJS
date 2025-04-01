<template>
  <div class="text-white px-6 relative">
    <!-- Barre de recherche avec logo -->
    <div class="flex items-center justify-center pt-30 relative">
      <div class="relative w-full max-w-lg">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher un film ou une série..."
          class="w-full p-5 px-10 border-2 rounded-full bg-transparent placeholder-gray-400"
          :class="theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'"
        />
        <!-- Résultats de recherche -->
        <div
          v-if="searchQuery && filteredItems.length > 0"
          class="absolute top-full left-0 w-full bg-gray-800 text-white rounded-lg shadow-lg mt-2 z-50"
        >
          <ul>
            <li
              v-for="item in filteredItems"
              :key="item.id"
              class="flex items-center p-3 hover:bg-gray-700 cursor-pointer"
              @click="showMovieDetails(item)"
            >
              <img
                :src="item.image"
                alt="Film"
                class="w-12 h-12 rounded-lg mr-4 object-cover"
              />
              <div>
                <p class="font-bold">{{ item.title }}</p>
                <p class="text-sm text-gray-400">"Découvrez ce chef-d'œuvre maintenant !"</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Titre de la page -->
    <h1 class="text-4xl font-extrabold text-center my-8">🎬 Catalogue</h1>

    <!-- Section : En tendances -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-6 flex items-center">🔥 En tendances</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <div
          v-for="item in trendingItems"
          :key="item.id"
          class="relative group cursor-pointer"
          @click="showMovieDetails(item)"
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
        </div>
      </div>
    </section>

    <!-- Section : Les plus récents -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-6 flex items-center">🆕 Les plus récents</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <div
          v-for="item in recentItems"
          :key="item.id"
          class="relative group cursor-pointer"
          @click="showMovieDetails(item)"
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
        </div>
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

    <!-- Modal pour les détails du film -->
    <div
      v-if="selectedMovie"
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    >
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <h2 class="text-2xl font-bold mb-4 text-center">{{ selectedMovie.title }}</h2>
        <img
          :src="selectedMovie.image"
          :alt="selectedMovie.title"
          class="w-full h-64 object-contain rounded-lg shadow-lg mb-4"
        />
        <p class="text-gray-300 mb-4">{{ selectedMovie.description }}</p>
        <div class="mb-4">
          <h3 class="text-lg font-semibold mb-2">Avis des utilisateurs :</h3>
          <div class="flex items-center space-x-2">
            <span class="text-yellow-400 text-lg">⭐ {{ selectedMovie.rating }}/5</span>
            <p class="text-gray-400">({{ selectedMovie.reviews }} avis)</p>
          </div>
        </div>
        <button
          @click="closeMovieDetails"
          class="absolute top-2 right-2 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
        >
          ✖
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
      theme: localStorage.getItem("theme") || "dark",
      items: [
        {
          id: "1",
          title: "Inception",
          image: "/public/téléchargement.jpg",
          description: "Un film incroyable réalisé par Christopher Nolan.",
          rating: 4.8,
          reviews: 150,
          category: "Action",
          trending: true,
          recent: true,
        },
        {
          id: "2",
          title: "Interstellar",
          image: "/public/images.jpg",
          description: "Un voyage épique dans l'espace.",
          rating: 4.7,
          reviews: 180,
          category: "Action",
          trending: true,
        },
        {
          id: "3",
          title: "The Dark Knight",
          image: "/18949761.jpg",
          description: "Un film de super-héros avec Batman.",
          rating: 4.9,
          reviews: 200,
          category: "Super-héros",
          trending: true,
        },
        { id: "4", title: "Avengers: Endgame", image: "/0472053.jpg", description: "Un combat épique.", rating: 4.6, reviews: 300, category: "Super-héros", recent: true },
        { id: "5", title: "Dune", image: "/4633954.webp", description: "Une aventure sur une planète désertique.", rating: 4.5, reviews: 250, category: "Action", recent: true },
        { id: "6", title: "Spider-Man: No Way Home", image: "/4860598.webp", description: "Un multivers de Spider-Man.", rating: 4.7, reviews: 400, category: "Super-héros", trending: true },
        { id: "7", title: "The Hangover", image: "/hangover.jpg", description: "Une nuit inoubliable à Vegas.", rating: 4.3, reviews: 120, category: "Comédie", recent: true },
        { id: "8", title: "Game of Thrones", image: "/got.jpg", description: "Une lutte pour le trône de fer.", rating: 4.8, reviews: 500, category: "Action" },
        { id: "9", title: "Stranger Things", image: "/strangerthings.jpg", description: "Des enfants découvrent un monde parallèle.", rating: 4.6, reviews: 350, category: "Action", trending: true },
        { id: "10", title: "Deadpool", image: "/deadpool.jpg", description: "Un anti-héros hilarant.", rating: 4.4, reviews: 220, category: "Comédie", trending: true },
      ],
      selectedMovie: null, // Film sélectionné pour afficher les détails
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
    showMovieDetails(movie) {
      this.selectedMovie = movie;
    },
    closeMovieDetails() {
      this.selectedMovie = null;
    },
  },
};
</script>