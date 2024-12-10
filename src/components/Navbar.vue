<template>
    <nav class="flex items-center justify-between px-4 py-2 bg-white shadow-lg md:flex-nowrap">
      <div class="flex items-center justify-between">
        <a href="/" class="text-xl font-bold text-gray-800">YouMent</a>
        <button id="menu-btn" class="md:hidden focus:outline-none" @click="toggleMenu">
          <svg
            class="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16v12H4zM4 12h16v12H4z"
            />
          </svg>
        </button>
      </div>
      <ul ref="menu" class="hidden md:flex flex-col md:flex-row md:space-x-8">
        <li>
          <RouterLink to="/" class="text-gray-700 hover:text-indigo-500">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/onecomment" class="text-gray-700 hover:text-indigo-500">One Comment Test</RouterLink>
        </li>
      </ul>
    </nav>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { RouterLink } from "vue-router";
  
  const menu = ref(null);
  
  const toggleMenu = () => {
    if (menu.value) {
      menu.value.classList.toggle("hidden");
    }
  };
  </script>
  
  <style scoped>
  @media (max-width: 768px) {
    #menu {
      transition: all 0.3s ease-in-out;
    }
  }
  </style>
  