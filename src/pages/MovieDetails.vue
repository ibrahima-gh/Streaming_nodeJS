<template>
  <div class="bg-black text-white min-h-screen flex items-center justify-center">
    <div class="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition">
      <h1 class="text-3xl font-bold mb-4 text-center">{{ movie.title }}</h1>
      <!-- Correction : Utilisation de object-contain pour afficher l'image en totalité -->
      <img
        :src="movie.image"
        alt="Affiche du film"
        class="w-full h-64 object-contain rounded-lg shadow-lg mb-4"
      />
      <p class="text-lg text-gray-300 mb-4">{{ movie.description }}</p>
      <div class="flex justify-between items-center text-gray-400 text-sm">
        <p><strong>Catégorie :</strong> {{ movie.category }}</p>
        <p><strong>Durée :</strong> {{ movie.duration }}</p>
      </div>
      <button
        @click="$router.push('/catalogue')"
        class="mt-6 w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 hover:scale-105 transition-transform transform"
      >
        Retour au catalogue
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"], // L'ID du film est passé en tant que prop
  data() {
    return {
      movie: {}, // Détails du film sélectionné
    };
  },
  mounted() {
    // Liste des films (sans Breaking Bad)
    const movies = [
      { id: "1", title: "Inception", description: "Un film incroyable.", image: "/public/téléchargement.jpg", category: "Films", duration: "2h 28m" },
      { id: "2", title: "Interstellar", description: "Un voyage dans l'espace.", image: "/public/images.jpg", category: "Films", duration: "2h 49m" },
      { id: "3", title: "The Dark Knight", description: "Un film de super-héros.", image: "/public/18949761.jpg", category: "Films", duration: "2h 32m" },
      { id: "4", title: "Avengers: Endgame", description: "Un combat épique.", image: "/public/0472053.jpg", category: "Films", duration: "3h 2m" },
      { id: "5", title: "Dune", description: "Une aventure sur une planète désertique.", image: "/public/4633954.webp", category: "Films", duration: "2h 35m" },
      { id: "6", title: "Spider-Man: No Way Home", description: "Un multivers de Spider-Man.", image: "/public/4860598.webp", category: "Films", duration: "2h 28m" },
      { id: "10", title: "Deadpool", description: "Un anti-héros hilarant.", image: "/public/deadpool.jpg", category: "Films", duration: "1h 48m" },
      { id: "11", title: "The Hangover", description: "Une nuit inoubliable à Vegas.", image: "/public/hangover.jpg", category: "Films", duration: "1h 40m" },
    ];

    // Correction : Comparaison stricte des IDs (conversion explicite si nécessaire)
    this.movie = movies.find((movie) => String(movie.id) === String(this.id));

    // Vérification si le film n'est pas trouvé
    if (!this.movie) {
      console.error(`Film avec l'ID ${this.id} introuvable.`);
    }
  },
};
</script>

<style scoped>
button {
  transition: all 0.3s ease;
}
</style>
