<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-center p-4 text-white" >
    <h1 class="text-4xl font-bold">Bienvenue dans notre app de streaming</h1>
    <div class="image-container my-4">
      <img src="/public/image.webp" alt="Movie Poster" class="poster-img w-64 h-auto rounded-lg shadow-lg" />
    </div>
    <p class="text-lg text-gray-600">Bon visionage </p>

    <div class="my-4 w-full max-w-md">
      <input type="text" placeholder="Search for movies..." class="w-full p-2 border rounded-md shadow-sm focus:outline-none text-white"/>
    </div>

    <div class="flex space-x-4 my-4">
      <button class="px-4 py-2 bg-zinc-700 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
        Explore Movies
      </button>
      <button class="px-4 py-2 bg-zinc-700 text-white rounded-lg shadow-md hover:bg-gray-600 transition">
        Login
      </button>
      <a href="#" class="px-4 py-2 bg-zinc-700 text-white rounded-lg shadow-md hover:bg-green-600 transition">
        Sign up
      </a>
    </div>

    <p class="text-lg text-gray-600">Your favorite movies, all in one place!</p>
  </div>
</template>

<script>
/*export default {
  name: 'Home',
  data() {
    return {
      searchQuery: '',
      movies: [],
    };
  },
  methods: {
    goToMoviesList() {
      this.$router.push('/movies');
    },
    goToLogin() {
      this.$router.push('/login');
    },
    searchMovies() {
      // Exemple de recherche basée sur un API ou une logique de recherche locale
      if (this.searchQuery.trim()) {
        // Utilisation d'une API ou d'un tableau de films local pour la recherche
        this.movies = this.mockSearch(this.searchQuery);
      } else {
        this.movies = [];
      }
    },
    mockSearch(query) {
      // Exemple de films pour démonstration, remplace par une vraie recherche API
      const allMovies = [
        { id: 1, title: 'Inception' },
        { id: 2, title: 'The Dark Knight' },
        { id: 3, title: 'Interstellar' },
      ];

      return allMovies.filter(movie => 
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
    },
  },
};*/
</script>
