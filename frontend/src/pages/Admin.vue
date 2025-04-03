<template>
    <div class="flex flex-col w-3/4 mx-auto pt-40 p-8 text-white rounded-3xl shadow-lg">
      <h2 class="text-3xl font-bold mb-6 text-center text-red-500 col-span-2">Ajouter un Film</h2>
      <form @submit.prevent="addMovie" class="grid grid-cols-2 gap-8">
        <div class="col-span-1">
          <label class="block text-sm font-medium mb-2">Titre</label>
          <input v-model="movie.title" type="text" placeholder="Entrez le titre du film"
            class="w-full p-5 border-2 rounded-3xl text-white border-zinc-600 placeholder-white/50 focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
            required />
        </div>
        <div class="col-span-1">
          <label class="block text-sm font-medium mb-2">URL de l'image</label>
          <input v-model="movie.url_image" type="text" placeholder="URL de l'affiche"
            class="w-full p-5 border-2 rounded-3xl text-white border-zinc-600 placeholder-white/50 focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
            required />
        </div>
        <div class="col-span-1">
          <label class="block text-sm font-medium mb-2">URL de l'annonce</label>
          <input v-model="movie.url_annonce" type="text" placeholder="URL de la bande-annonce"
            class="w-full p-5 border-2 rounded-3xl text-white border-zinc-600 placeholder-white/50 focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
            required />
        </div>
        <iframe
        v-if="isYouTubeUrl(movie.url_annonce)"
        :src="movie.url_annonce"
        width="560"
        height="315"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
        <div class="col-span-1">
          <label class="block text-sm font-medium mb-2">Date de sortie</label>
          <input v-model="movie.date_sortie" type="date"
            class="w-full p-5 border-2 rounded-3xl text-white border-zinc-600 focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
            required />
        </div>
        <div class="col-span-1">
          <label class="block text-sm font-medium mb-2">Durée (en minutes)</label>
          <input v-model="movie.duree" type="number" placeholder="Durée en minutes"
            class="w-full p-5 border-2 rounded-3xl text-white border-zinc-600 placeholder-white/50 focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
            required />
        </div>
        <div class="col-span-1">
          <label class="block text-sm font-medium mb-2">Acteurs</label>
          <input v-model="movie.acteurs" type="text" placeholder="Séparés par des virgules"
            class="w-full p-5 border-2 rounded-3xl text-white border-zinc-600 placeholder-white/50 focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
            required />
        </div>
        <div class="col-span-1">
          <label class="block text-sm font-medium mb-2">ID de catégorie</label>
          <input v-model="movie.id_categorie" type="number" placeholder="ID de la catégorie"
            class="w-full p-5 border-2 rounded-3xl text-white border-zinc-600 placeholder-white/50 focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
            required />
        </div>
        <div class="col-span-2">
          <label class="block text-sm font-medium mb-2">Description</label>
          <textarea v-model="movie.description" placeholder="Description du film"
            class="w-full p-5 border-2 rounded-3xl text-white border-zinc-600 placeholder-white/50 focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500"
            required></textarea>
        </div>
        <button type="submit"
          class="col-span-2 w-full py-5 bg-red-600 text-white font-semibold rounded-3xl shadow-md hover:bg-red-700 transition">
          Ajouter le film
        </button>
        <p v-if="message" class="mt-4 text-green-400 text-center col-span-2">{{ message }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        movie: {
          title: '',
          url_image: '',
          url_annonce: '',
          date_sortie: '',
          duree: '',
          acteurs: '',
          id_categorie: '',
          description: ''
        },
        message: ''
      };
    },
    methods: {
        isYouTubeUrl(url) {
    return url.startsWith("https://www.youtube.com/");
  },
      async addMovie() {
        try {
          await axios.post('/api/films', this.movie);
          this.message = "Film ajouté avec succès !";
          this.movie = { title: '', url_image: '', url_annonce: '', date_sortie: '', duree: '', acteurs: '', id_categorie: '', description: '' };
        } catch (error) {
          this.message = "Erreur lors de l'ajout du film.";
        }
      }
    }
  };
  </script>