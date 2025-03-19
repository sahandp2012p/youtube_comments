<template>
  <div class="flex items-center justify-center min-h-screen bg-base-200">
    <div class="card w-full max-w-md shadow-2xl bg-base-100">
      <div class="card-body">
        <h1 class="text-3xl font-semibold text-center mb-6">YouMent</h1>

        <form @submit.prevent="formSubmit" class="space-y-4">
          <fieldset class="fieldset">
            <label class="label" for="commentInput">Enter Comment Text:</label>
            <input
              id="comment Input"
              v-model="comment"
              class="input"
              placeholder="e.g., This is Great!"
            />
          </fieldset>

          <button type="submit" class="btn btn-primary w-full">
            Get Score
          </button>
        </form>

        <Spinner v-if="loading" />

        <div v-if="result" class="text-center mt-4">
          <p class="text-gray-500">{{ result }}</p>
        </div>
      </div>
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
    result.value = "";
    loading.value = true;
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
