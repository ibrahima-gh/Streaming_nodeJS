<template>
    <div class="min-h-screen text-white flex flex-col items-center p-10">
      <h1 class="text-3xl font-bold mb-4">{{ film.title }}</h1>
      <iframe
        v-if="film.url_annonce"
        :src="film.url_annonce"
        width="560"
        height="315"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <p class="mt-4 text-lg">{{ film.description }}</p>
      <button @click="$router.push('/')" class="mt-6 px-5 py-2 bg-gray-700 text-white rounded-lg">Retour</button>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { useRoute } from "vue-router";
  import { ref, onMounted } from "vue";
  
  export default {
    setup() {
      const route = useRoute();
      const film = ref({});
  
      const fetchFilm = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/film/${route.params.id}`);
          film.value = response.data;
        } catch (error) {
          console.error("Erreur lors de la récupération du film", error);
        }
      };
  
      onMounted(fetchFilm);
  
      return { film };
    }
  };
  </script>