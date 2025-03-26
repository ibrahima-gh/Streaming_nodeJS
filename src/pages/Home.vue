<template>
  <div :class="theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'" class="min-h-screen">
    <!-- Bouton de bascule mode clair/sombre -->
    <div class="absolute top-4 right-4">
      <button
        @click="toggleTheme"
        class="p-2 rounded-full shadow-md"
        :class="theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'"
      >
        <span v-if="theme === 'dark'" class="material-icons">🌞</span>
        <span v-else class="material-icons">🌙</span>
      </button>
    </div>

    <!-- Section Hero (Film en vedette) -->
    <div class="relative w-full h-[500px]">
      <img
        src="/public/image.webp"
        alt="Film en vedette"
        class="w-full h-full object-cover brightness-70"
      />
      <div class="absolute inset-0 flex flex-col justify-center px-10">
        <h1 class="text-5xl font-bold">🔥 Film en Vedette</h1>
        <p class="text-lg mt-2 max-w-xl" :class="theme === 'dark' ? 'text-gray-300' : 'text-gray-700'">
          Un film incroyable à ne pas manquer. Regardez-le dès maintenant !
        </p>
        <div class="mt-4 flex space-x-4">
          <button
            @click="playTrailer"
            class="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            ▶ Regarder
          </button>
          <button class="px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition">ℹ️ Plus d'infos</button>
        </div>
      </div>
    </div>

    <!-- Barre de recherche -->
    <div class="flex justify-center mt-6">
      <input
        type="text"
        placeholder="Rechercher un film..."
        class="w-full max-w-md p-3 border rounded-md shadow-md bg-transparent placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-transform transform hover:scale-105"
      />
    </div>

    <!-- Section Catalogues -->
    <div class="mt-8 px-6">
      <h2 class="text-2xl font-semibold mb-4">🔥 Films les plus regardés</h2>
      <div class="flex space-x-4 overflow-x-auto scrollbar-hide">
        <div v-for="movie in topMovies" :key="movie.id" class="relative group w-40">
          <img :src="movie.image" :alt="movie.title" class="w-full rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105" />
          <p class="text-sm mt-2 text-center group-hover:text-red-500 transition">{{ movie.title }}</p>
        </div>
      </div>
    </div>

    <div class="mt-8 px-6">
      <h2 class="text-2xl font-semibold mb-4">🚀 Tendances</h2>
      <div class="flex space-x-4 overflow-x-auto scrollbar-hide">
        <div v-for="movie in trendingMovies" :key="movie.id" class="relative group w-40">
          <img :src="movie.image" :alt="movie.title" class="w-full rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105" />
          <p class="text-sm mt-2 text-center group-hover:text-red-500 transition">{{ movie.title }}</p>
        </div>
      </div>
    </div>

    <!-- Section Avis -->
    <div class="mt-8 px-6">
      <h2 class="text-2xl font-semibold mb-4">⭐ Avis des spectateurs</h2>
      <div class="space-y-4">
        <div v-for="review in reviews" :key="review.id" class="bg-gray-800 p-4 rounded-lg shadow-md">
          <p class="text-lg font-semibold">{{ review.user }}</p>
          <p class="text-sm text-gray-300">{{ review.comment }}</p>
          <p class="text-sm text-gray-400">Film : {{ review.movie }}</p>
          <p class="text-yellow-400">⭐ {{ review.rating }}/5</p>
        </div>
      </div>
    </div>

    <!-- Bande-annonce modale -->
    <div v-if="showTrailer" class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div class="relative w-full max-w-4xl">
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/hgX152xFTk8"
          title="Captain America 4 Trailer"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <button
          @click="closeTrailer"
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
      theme: "dark",
      showTrailer: false,
      topMovies: [
        { id: 1, title: "Inception", image: "/public/téléchargement.jpg" },
        { id: 2, title: "The Dark Knight", image: "/public/images.jpg" },
        { id: 3, title: "Interstellar", image: "/public/18949761.jpg" },
      ],
      trendingMovies: [
        { id: 4, title: "Avengers: Endgame", image: "/public/0472053.jpg" },
        { id: 5, title: "Dune", image: "/public/4633954.webp" },
        { id: 6, title: "Spider-Man: No Way Home", image: "/public/4860598.webp" },
      ],
      reviews: [
        { id: 1, user: "Alice", comment: "Incroyable film, j'ai adoré !", movie: "Inception", rating: 5 },
        { id: 2, user: "Bob", comment: "Pas mal, mais un peu long.", movie: "Dune", rating: 3.5 },
      ],
    };
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === "dark" ? "light" : "dark";
    },
    playTrailer() {
      this.showTrailer = true;
    },
    closeTrailer() {
      this.showTrailer = false;
    },
  },
  mounted() {
    const cursor = document.createElement("div");
    cursor.classList.add("cursor-follow");
    document.body.appendChild(cursor);

    document.addEventListener("mousemove", (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1.2)`;
    });

    document.addEventListener("mousedown", () => {
      cursor.style.transform += " scale(0.8)";
      cursor.style.backgroundColor = "rgba(255, 0, 0, 0.8)";
    });

    document.addEventListener("mouseup", () => {
      cursor.style.transform = cursor.style.transform.replace(" scale(0.8)", "");
      cursor.style.backgroundColor = "rgba(255, 0, 0, 0.7)";
    });
  },
};
</script>

<style scoped>
/* Masquer la scrollbar horizontale */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Ajout des effets de la barre de recherche */
input[type="text"] {
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
  transition: transform 0.1s ease, background-color 0.2s ease;
}

/* Animation pour la modale */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
