<template>
  <div class="bg-black text-white min-h-screen">
    <!-- Section Hero (Film en vedette) -->
    <div class="relative w-full h-[500px]">
      <img 
        src="/public/image.webp" 
        alt="Film en vedette" 
        class="w-full h-full object-cover brightness-70"
      />
      <div class="absolute inset-0 flex flex-col justify-center px-10">
        <h1 class="text-5xl font-bold">🔥 Film en Vedette</h1>
        <p class="text-lg text-gray-300 mt-2 max-w-xl">
          Un film incroyable à ne pas manquer. Regardez-le dès maintenant !
        </p>
        <div class="mt-4 flex space-x-4">
          <button class="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">▶ Regarder</button>
          <button class="px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition">ℹ️ Plus d'infos</button>
        </div>
      </div>
    </div>

    <!-- Barre de recherche -->
    <div class="flex justify-center mt-6">
      <input 
        type="text" 
        placeholder="Rechercher un film..." 
        class="w-full max-w-md p-3 border rounded-md shadow-md bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-transform transform hover:scale-105 focus:border-red-500 focus:ring-offset-2"
      />
    </div>

    <!-- Section Catalogues -->
    <div class="mt-8 px-6">
      <h2 class="text-2xl font-semibold mb-4">🔥 Films les plus regardés</h2>
      <div class="flex space-x-4 overflow-x-auto scrollbar-hide">
        <div v-for="movie in topMovies" :key="movie.id" class="relative group w-40">
          <img :src="movie.image" :alt="movie.title" class="w-full rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"/>
          <p class="text-sm mt-2">{{ movie.title }}</p>
        </div>
      </div>
    </div>

    <div class="mt-8 px-6">
      <h2 class="text-2xl font-semibold mb-4">🚀 Tendances</h2>
      <div class="flex space-x-4 overflow-x-auto scrollbar-hide">
        <div v-for="movie in trendingMovies" :key="movie.id" class="relative group w-40">
          <img :src="movie.image" :alt="movie.title" class="w-full rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"/>
          <p class="text-sm mt-2">{{ movie.title }}</p>
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
          <p class="text-yellow-400">⭐ {{ review.rating }}/5</p>
        </div>
      </div>
    </div>

    <!-- Logo de meilleure souris -->
    <div class="cursor-follow"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
        { id: 1, user: "Alice", comment: "Incroyable film, j'ai adoré !", rating: 5 },
        { id: 2, user: "Bob", comment: "Pas mal, mais un peu long.", rating: 3.5 },
      ],
    };
  },
  mounted() {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-follow');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
  }
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
</style>
