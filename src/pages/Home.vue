<template>
  <div class="min-h-screen">

    <!-- Section Hero -->
    <div class="relative w-full h-[75vh]">
      <img
        src="/public/image.webp"
        alt="Film en vedette"
        class="w-full h-full object-cover brightness-50"
      />
      <div class="absolute inset-0 flex flex-col justify-center ml-10 gap-5">
        <h1 class="text-5xl text-white font-bold">🔥 Film en Vedette</h1>
        <p class="text-xl text-white/75">
          Découvrez les meilleurs films et séries à regarder dès maintenant !
        </p>
        <div class="mt-4 flex space-x-4">
          <button
            @click="playTrailer"
            class="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            ▶ Catalogue
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
        class="w-full max-w-md p-5 border rounded-3xl border-2 border-gray-500 placeholder-white/70 text-white"
      />
    </div>

    <!-- Section Films -->
    <div class="mt-8 px-6">
      <h2 class="text-white text-2xl font-semibold mb-4">🔥 Films les plus regardés</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <div v-for="movie in topMovies" :key="movie.id" class="relative group">
          <img
            :src="movie.image"
            :alt="movie.title"
            class="w-full h-48 object-contain rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
          />
          <p class="text-sm mt-2 text-center group-hover:text-red-500 transition">{{ movie.title }}</p>
        </div>
      </div>
    </div>

    <div class="mt-8 px-6">
      <h2 class="text-white text-2xl font-semibold mb-4">🚀 Tendances</h2>
      <div class="flex space-x-4 overflow-x-auto scrollbar-hide">
        <div v-for="movie in trendingMovies" :key="movie.id" class="relative group w-40">
          <img :src="movie.image" :alt="movie.title" class="w-full rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105" />
          <p class="text-sm mt-2 text-center group-hover:text-red-500 transition">{{ movie.title }}</p>
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
      topMovies: [
        { id: 1, title: "Inception", image: "/public/téléchargement.jpg" },
        { id: 2, title: "The Dark Knight", image: "/public/images.jpg" },
        { id: 3, title: "Interstellar", image: "/public/18949761.jpg" },
      ];
      trendingMovies: [
        { id: 4, title: "Avengers: Endgame", image: "/public/0472053.jpg" },
        { id: 5, title: "Dune", image: "/public/4633954.webp" },
        { id: 6, title: "Spider-Man: No Way Home", image: "/public/4860598.webp" },
      ]
</script>
