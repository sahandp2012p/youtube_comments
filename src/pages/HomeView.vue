<template>
  <div class="flex items-center justify-center min-h-screen bg-base-200">
    <div class="card w-full max-w-md shadow-2xl bg-base-100">
      <div class="card-body">
        <h1 class="text-3xl font-semibold text-center mb-6">YouMent</h1>

        <form @submit.prevent="formSubmit" class="space-y-4">
          <fieldset class="fieldset">
            <label class="label" for="videoId">Enter Video ID:</label>
            <input type="text" id="videoId" v-model="videoId" class="input" placeholder="e.g., dQw4w9WgXcQ" />
          </fieldset>

          <button type="submit" class="btn btn-primary w-full">
            Get Score
          </button>
        </form>

        <Spinner v-if="loading" />

        <div v-if="result" class="text-center mt-4">
          <p class="text-gray-500">{{ result }}</p>
        </div>

        <button
          type="submit"
          class="btn btn-primary w-full mx-auto"
          v-if="comment"
          @click="setShowtop"
        >
          {{ showtop ? "Hide Best Comment" : "Show Best Comment" }}
        </button>

        <div v-if="showtop" class="text-center mt-4">
          <p class="text-gray-500">
            Best comment: {{ comment }} Score: {{ rating * 10 }}/10
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import Spinner from "../components/Spinner.vue";

const videoId = ref(""); // Bound to the input
const loading = ref(false); // Controls spinner visibility
const showtop = ref(false);
const result = ref(""); // Display result
const comment = ref(""); // Text for top comment
const rating = ref(0);

const setShowtop = async () => {
  showtop.value = !showtop.value;
};

const formSubmit = async () => {
  // Clear previous results when submitting a new video ID
  showtop.value = false;
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
input,
button {
  transition: all 0.3s ease-in-out;
}

input:focus,
button:focus {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
</style>
