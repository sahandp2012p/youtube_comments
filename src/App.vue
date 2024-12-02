<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <!-- Card content -->
      <h1 class="text-3xl font-semibold text-center mb-6 text-gray-800">
        YouMent
      </h1>

      <form @submit.prevent="formSubmit" class="space-y-4">
        <label for="id" class="block text-sm font-medium text-gray-600">Enter Video ID:</label>
        <input
          type="text"
          v-model="videoId"
          class="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g., dQw4w9WgXcQ"
          required
        />

        <button
          type="submit"
          class="w-full px-4 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Get Score
        </button>
      </form>

      <Spinner v-if="loading" />

      <!-- Display the result only if it's available -->
      <p v-if="result" class="mt-4 text-center text-gray-700">
        {{ result }}
      </p>

      <!-- Display the best comment only if it's available -->
      <p v-if="comment" class="text-center text-gray-700">
        Best comment: {{ comment }} Score: {{ rating * 10 }}/10
      </p>
    </div>
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
      // Clear previous results when submitting a new video ID
      this.result = "";
      this.comment = "";
      this.loading = true;

      try {
        const response = await axios.post(
          "https://youtube-comments-backend-kv2i.onrender.com",
          { id: this.videoId }
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

<style scoped>
/* Styling for general layout */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}

input, button {
  transition: all 0.3s ease-in-out;
}

input:focus, button:focus {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
</style>
