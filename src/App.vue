<template>
  <div
    class="w-full max-w-md p-6 bg-slate-600 bg-opacity-50 backdrop-blur-3xl rounded-2xl shadow-lg border border-white/30 relative overflow-visible"
  >
    <!-- Colorful Glassy "balls" at the edge of the form -->
    <div
      class="absolute -top-16 -right-16 w-32 h-32 rounded-full backdrop-blur-3xl shadow-lg opacity-75 hidden md:block"
      style="
        background: linear-gradient(
          135deg,
          rgba(255, 99, 71, 0.5),
          rgba(255, 99, 71, 0.2),
          rgba(255, 255, 0, 0.5)
        );
      "
    ></div>

    <div
      class="absolute -bottom-24 -left-24 w-48 h-48 rounded-full backdrop-blur-md shadow-lg opacity-75 hidden md:block"
      style="
        background: linear-gradient(
          135deg,
          rgba(0, 255, 255, 0.5),
          rgba(173, 216, 230, 0.3),
          rgba(255, 105, 180, 0.5)
        );
      "
    ></div>

    <!-- Card content -->
    <h1
      class="text-2xl font-semibold text-center mb-6 relative z-10 text-gradient bg-clip-text bg-gradient-to-r text-white"
    >
      YouTube Comments Sentiment Analysis
    </h1>

    <form @submit.prevent="formSubmit" class="space-y-4 relative z-10">
      <label
        for="id"
        class="block text-sm font-medium text-white text-gradient bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500"
        >Enter Video ID:</label
      >
      <input
        type="text"
        v-model="videoId"
        class="w-full px-3 py-2 bg-white bg-opacity-30 border border-gray-300 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-200 backdrop-blur-sm"
        placeholder="e.g., dQw4w9WgXcQ"
        required
      />

      <button
        type="submit"
        class="w-full px-4 py-2 text-white bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md"
      >
        Get Score
      </button>
    </form>

    <Spinner v-if="loading" />

    <p
      v-if="result"
      class="mt-4 text-center text-white relative z-10 text-gradient bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500"
    >
      {{ result }}
    </p>
    <p class="text-center text-white" v-if="comment">Best comment: {{ comment }} Score: {{ rating*10 }}/10</p>
  </div>
</template>

<script>
import axios from "axios";
import Spinner from "./components/Spinner.vue";

export default {
  data() {
    return {
      videoId: "", // Bound to the input
      loading: false, // Controls spinner visibility
      result: "", // Display result
      comment: "", // Text for top comment
      rating: 0,
    };
  },
  methods: {
    async formSubmit() {
      this.loading = true;
      this.result = "";

      try {
        const response = await axios.post(
          "https://youtube-comments-backend-kv2i.onrender.com",
          { id: this.videoId },
        );

        if (response.status === 200) {
          const {
            score,
            emoji,
            comments,
            top_comment: { comment, rating },
          } = response.data;
          this.comment = comment;
          this.rating = rating;
          this.result = `${score}/10 ${emoji} Out of ${comments} comments`;
        } else {
          this.result = response.data.detail;
        }
      } catch (error) {
        this.result = "An error occurred while fetching data.";
      } finally {
        this.loading = false;
      }
    },
  },
  components: {
    Spinner,
  },
};
</script>
