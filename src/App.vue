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
      />

      <button
        type="submit"
        class="w-full px-4 py-2 text-white bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md"
      >
        Get Score
      </button>
    </form>

    <div
      role="status"
      v-if="loading"
      class="inset-x-0 mt-7 flex items-center justify-center"
    >
      <svg
        aria-hidden="true"
        class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>

    <p
      v-if="result"
      class="mt-4 text-center text-white relative z-10 text-gradient bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500"
    >
      {{ result }}
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      videoId: "", // Bound to the input
      loading: false, // Controls spinner visibility
      result: "", // Display result
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
          const { score, emoji, comments } = response.data;
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
};
</script>
