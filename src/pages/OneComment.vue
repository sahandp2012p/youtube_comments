<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <!-- Card content -->
      <h1 class="text-3xl font-semibold text-center mb-6 text-gray-800">
        YouMent
      </h1>

      <form @submit.prevent="formSubmit" class="space-y-4">
        <label for="id" class="block text-sm font-medium text-gray-600">
          Enter Comment Text:
        </label>
        <input
          type="text"
          v-model="comment"
          class="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g., This is Great!"
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

      <p v-if="result" class="mt-4 text-center text-gray-700">
        {{ result }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import Spinner from "../components/Spinner.vue";

const comment = ref(""); // Bound to the input
const loading = ref(false); // Controls spinner visibility
const result = ref("");

const formSubmit = async () => {
  
  try {
    const response = await axios.post(
      "https://youtube-comments-backend-kv2i.onrender.com/getcomment",
      { text: comment.value },
    );

    if (response.status === 200) {
      const score = response.data;
      console.log(score);

      result.value = `${score}/10`;
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
