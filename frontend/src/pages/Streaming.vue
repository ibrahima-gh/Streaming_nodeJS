<template>
  <div class="min-h-screen bg-gray-900 text-white px-6 py-8">
    <!-- Titre et retour -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold">{{ movie.title }}</h1>
      <router-link to="/catalogue" class="text-red-500 hover:underline">← Retour au catalogue</router-link>
    </div>

    <!-- Lecteur vidéo -->
    <div class="relative w-full max-w-4xl mx-auto mb-8">
      <video
        controls
        autoplay
        class="w-full rounded-lg shadow-lg"
        :src="movie.videoUrl"
      >
        Votre navigateur ne supporte pas la lecture vidéo.
      </video>
    </div>

    <!-- Informations sur le film -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">À propos du film</h2>
      <p class="text-gray-300">{{ movie.description }}</p>
      <div class="mt-4 flex items-center space-x-4">
        <span class="text-yellow-400 text-lg">⭐ {{ movie.rating }}/5</span>
        <p class="text-gray-400">({{ movie.reviews }} avis)</p>
      </div>
    </div>

    <!-- Section commentaires -->
    <div>
      <h2 class="text-2xl font-semibold mb-4">Commentaires</h2>
      <div v-if="comments.length > 0" class="space-y-4">
        <div
          v-for="(comment, index) in comments"
          :key="index"
          class="bg-gray-800 p-4 rounded-lg shadow-md"
        >
          <p class="font-semibold text-red-500">{{ comment.username }}</p>
          <p class="text-gray-300">{{ comment.text }}</p>
        </div>
      </div>
      <div v-else>
        <p class="text-gray-400">Aucun commentaire pour le moment. Soyez le premier à commenter !</p>
      </div>

      <!-- Ajouter un commentaire -->
      <div class="mt-6">
        <h3 class="text-lg font-semibold mb-2">Ajouter un commentaire</h3>
        <textarea
          v-model="newComment"
          placeholder="Écrivez votre commentaire ici..."
          class="w-full p-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring focus:ring-red-500"
        ></textarea>
        <button
          @click="addComment"
          class="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Publier
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Streaming from "@/pages/Streaming.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/catalogue", component: Catalogue },
  { path: "/streaming/:id", component: Streaming }, // Nouvelle route
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/dashboard", component: Dashboard },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

export default {
  data() {
    return {
      movie: {
        id: 1,
        title: "Inception",
        description: "Un film incroyable réalisé par Christopher Nolan.",
        rating: 4.8,
        reviews: 150,
        videoUrl: "/public/inception.mp4", // URL de la vidéo
      },
      comments: [
        { username: "Alice", text: "Un film incroyable, je le recommande !" },
        { username: "Bob", text: "La bande-son est juste époustouflante." },
      ],
      newComment: "",
    };
  },
  methods: {
    addComment() {
      if (this.newComment.trim() !== "") {
        this.comments.push({
          username: "Utilisateur", // Vous pouvez remplacer par le nom de l'utilisateur connecté
          text: this.newComment,
        });
        this.newComment = "";
      } else {
        alert("Veuillez écrire un commentaire avant de publier.");
      }
    },
  },
};
</script>

<style scoped>
textarea {
  resize: none;
}
</style>