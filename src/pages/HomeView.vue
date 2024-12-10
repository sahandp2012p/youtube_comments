<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <!-- Card content -->
      <h1 class="text-3xl font-semibold text-center mb-6 text-gray-800">
        YouMent
      </h1>

      <form @submit.prevent="formSubmit" class="space-y-4">
        <label for="id" class="block text-sm font-medium text-gray-600">
          Enter Video ID:
        </label>
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

<script setup>
import { ref } from "vue";
import axios from "axios";
import Spinner from "../components/Spinner.vue";

const videoId = ref(""); // Bound to the input
const loading = ref(false); // Controls spinner visibility
const result = ref(""); // Display result
const comment = ref(""); // Text for top comment
const rating = ref(0);

const formSubmit = async () => {
  // Clear previous results when submitting a new video ID
  result.value = "";
  comment.value = "";
  loading.value = true;

  try {
    const response = await axios.post(
      "https://youtube-comments-backend-kv2i.onrender.com",
      { id: videoId.value },
    );

    if (response.status === 200) {
      const {
        score,
        emoji,
        comments,
        top_comment: { comment: topComment, rating: topRating },
      } = response.data;

      comment.value = topComment;
      rating.value = topRating;
      result.value = `${score}/10 ${emoji} Out of ${comments} comments`;
    } else {
      result.value = response.data.detail;
    }
  } catch (error) {
    result.value = "An error occurred while fetching data.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Styling for general layout */
body {
  font-family: "Arial", sans-serif;
  margin: 0;
  padding: 0;
}

input,
button {
  transition: all 0.3s ease-in-out;
}

input:focus,
button:focus {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
</style>
