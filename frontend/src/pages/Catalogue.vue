<template>
  <div class="text-white px-6 relative">
    <h1 class="text-4xl font-extrabold text-center py-20">🎬 Catalogue</h1>

    <section v-if="films.length > 0" class="mb-12">
      <h2 class="text-2xl font-semibold mb-6 flex items-center">🎥 Tous les films</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <RouterLink
          v-for="film in films"
          :key="film.id"
          :to="`/film/${film.id_film}`"
          class="relative group cursor-pointer"
        >
          <div class="relative overflow-hidden rounded-lg shadow-lg">
            <img
              :src="film.url_image"
              :alt="film.title"
              class="w-48 h-full transition-transform duration-300 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <p class="text-white text-lg font-bold">{{ film.title }}</p>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { RouterLink } from "vue-router";

export default {
  data() {
    return {
      films: [],
    };
  },
  mounted() {
    this.fetchFilms();
  },
  methods: {
    async fetchFilms() {
      try {
        const response = await axios.get("/api/films");
        this.films = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des films :", error);
      }
    },
  },
};
</script>
