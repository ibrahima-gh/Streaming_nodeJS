<template>
  <div>
    <!-- Image d'affiche -->
    <div class="image-container">
      <img src="/public/image.webp" alt="Movie Poster" class="poster-img" />
    </div>

    <!-- Titre principal -->
    <h1>Welcome to the Streaming App</h1>

    <!-- Description -->
    <p>Enjoy our awesome content, movies, and shows.</p>

    <!-- Barre de recherche -->
    <div>
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Search for movies..." 
        @keyup="searchMovies"
        class="search-bar"
      />
    </div>

    <!-- Affichage des résultats de la recherche -->
    <div v-if="movies.length">
      <h2>Search Results</h2>
      <ul>
        <li v-for="movie in movies" :key="movie.id">{{ movie.title }}</li>
      </ul>
    </div>

    <!-- Boutons de navigation -->
    <div>
      <button @click="goToMoviesList">Explore Movies</button>
      <button @click="goToLogin">Login</button>
      <router-link to="/register">Sign up</router-link>
    </div>

    <p>Your favorite movies, all in one place!</p>
  </div>
</template>

<script>
export default {
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
};
</script>
