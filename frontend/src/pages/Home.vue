<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col">
    <!-- Section Hero -->
    <div class="relative w-full h-[75vh]">
      <img
        src="/CaptainAmerica.webp"
        alt="Film en vedette"
        class="w-full h-full object-cover brightness-50"
      />
      <div class="absolute inset-0 flex flex-col justify-center ml-10 gap-5 animate-fade-in">
        <h1 class="text-5xl font-bold animate-slide-in">🔥 Film en Vedette</h1>
        <p class="text-xl text-white/75 animate-fade-in">
          Découvrez les meilleurs films, séries, animés à regarder dès maintenant !
        </p>
        <div class="mt-4 flex space-x-4">
          <button
            @click="openTrailer"
            class="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition transform hover:scale-105"
          >
            ▶ Bande annonce
          </button>
          <button
            @click="showInfo"
            class="px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition transform hover:scale-105"
          >
            ℹ️ Plus d'infos
          </button>
        </div>
      </div>
    </div>

    <!-- Barre de recherche -->
    <div class="flex justify-center mt-6">
      <input
        type="text"
        placeholder="Rechercher un film ou une série..."
        class="w-full max-w-md p-5 border rounded-3xl border-2 border-gray-500 placeholder-white/70 text-white bg-gray-800 focus:ring-2 focus:ring-red-500 shadow-lg"
      />
    </div>

    <!-- Section Films recommandés -->
    <div class="mt-8 px-6 bg-gray-800 py-6 rounded-lg">
      <h2 class="text-3xl font-semibold mb-4">🎥 Films recommandés</h2>
      <div class="flex overflow-x-auto space-x-6">
        <div
          v-for="movie in recommendedMovies"
          :key="movie.id"
          class="flex-shrink-0 w-48 cursor-pointer transform transition-transform hover:scale-110"
        >
          <img
            :src="movie.url_image"
            :alt="movie.title"
            class="w-full h-64 object-cover rounded-lg shadow-lg"
          />
          <p class="mt-2 text-center font-semibold">{{ movie.title }}</p>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <!-- Modal Bande-annonce -->
    <div
      v-if="showTrailer"
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    >
      <div class="relative w-full max-w-4xl">
        <iframe
          width="100%"
          height="500"
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

    <!-- Modal Plus d'infos -->
    <div
      v-if="showInfoModal"
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    >
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <h2 class="text-2xl font-bold mb-4 text-center">Captain America</h2>
        <p class="text-gray-300 mb-4">
          Après les événements de "Avengers: Endgame", Sam Wilson (le Faucon) reprend le flambeau de Captain America et doit affronter de nouveaux défis pour protéger le monde.
        </p>
        <div class="mb-4">
          <h3 class="text-lg font-semibold mb-2">Avis des utilisateurs :</h3>
          <div class="flex items-center space-x-2">
            <span class="text-yellow-400 text-lg">⭐ 4.5/5</span>
            <p class="text-gray-400">(120 avis)</p>
          </div>
        </div>
        <button
          @click="closeInfo"
          class="absolute top-2 right-2 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
        >
          ✖
        </button>
      </div>
    </div>

    <!-- Section Animés -->
    <div class="mt-8 px-6 bg-gray-700 py-6 rounded-lg">
      <h2 class="text-3xl font-semibold mb-4">🎌 Animés</h2>
      <div class="flex overflow-x-auto space-x-6">
        <div
          v-for="anime in animes"
          :key="anime.id"
          class="flex-shrink-0 w-48 cursor-pointer transform transition-transform hover:scale-110"
        >
          <img
            :src="anime.image"
            :alt="anime.title"
            class="w-full h-64 object-cover rounded-lg shadow-lg"
          />
          <p class="mt-2 text-center font-semibold">{{ anime.title }}</p>
        </div>
      </div>
    </div>

    <!-- Section Dessins animés -->
    <div class="mt-8 px-6 bg-gray-800 py-6 rounded-lg">
      <h2 class="text-3xl font-semibold mb-4">🎨 Dessins animés</h2>
      <div class="flex overflow-x-auto space-x-6">
        <div
          v-for="cartoon in cartoons"
          :key="cartoon.id"
          class="flex-shrink-0 w-48 cursor-pointer transform transition-transform hover:scale-110"
        >
          <img
            :src="cartoon.image"
            :alt="cartoon.title"
            class="w-full h-64 object-cover rounded-lg shadow-lg"
          />
          <p class="mt-2 text-center font-semibold">{{ cartoon.title }}</p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-800 text-gray-400 py-6 mt-12">
      <div class="container mx-auto text-center">
        <p class="mb-4">© 2025 Streaming NodeJS. Tous droits réservés.</p>
        <div class="flex justify-center space-x-6">
          <a href="#" class="hover:text-white">Confidentialité</a>
          <a href="#" class="hover:text-white">Mentions légales</a>
          <a href="#" class="hover:text-white">Contact</a>
        </div>
        <div class="mt-4 flex justify-center space-x-4">
          <a href="#" class="hover:text-white">Facebook</a>
          <a href="#" class="hover:text-white">Twitter</a>
          <a href="#" class="hover:text-white">Instagram</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showTrailer: false,
      showInfoModal: false,
      recommendedMovies: [
        { id: 6, title: "The Matrix", url_image: "/matrix.jpg" },
        { id: 7, title: "Joker", url_image: "/joker.jpg" },
        { id: 8, title: "Parasite", url_image: "/parasite.jpg" },
      ],
      animes: [
        { id: 1, title: "Demon Slayer", image: "/demonslayer.webp" },
        { id: 2, title: "Attack on Titan", image: "/snk.webp" },
        { id: 3, title: "One Piece", image: "/op.png" },
      ],
      cartoons: [
        { id: 1, title: "Rick and Morty", image: "/rm.jpg" },
        { id: 2, title: "Adventure Time", image: "/adt.webp" },
        { id: 3, title: "The Simpsons", image: "/simpsons.jpg" },
      ],
    };
  },
  methods: {
    openTrailer() {
      this.showTrailer = true;
    },
    closeTrailer() {
      this.showTrailer = false;
    },
    showInfo() {
      this.showInfoModal = true;
    },
    closeInfo() {
      this.showInfoModal = false;
    },
  },
};
</script>

<style scoped>
/* Animations */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-in {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-in-out;
}

.animate-slide-in {
  animation: slide-in 1s ease-in-out;
}

/* Barre de recherche */
input:focus {
  outline: none;
}

/* Section Animés, Films recommandés et Dessins animés */
.flex {
  scrollbar-width: thin;
  scrollbar-color: #ff0000 transparent;
}

.flex::-webkit-scrollbar {
  height: 8px;
}

.flex::-webkit-scrollbar-thumb {
  background-color: #ff0000;
  border-radius: 4px;
}
</style>