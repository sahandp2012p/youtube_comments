<template>
  <nav class="navbar backdrop-blur-sm">
    <div class="navbar-start flex grow items-center justify-between">
      <a href="/" class="btn btn-ghost text-xl font-bold">YouMent</a>
      <button
        id="menu-btn"
        class="md:hidden focus:outline-hidden btn btn-neutral text-neutral-content w-20 h-20 relative flex items-center justify-center"
        @click="toggleMenu"
      >
        <div
          class="menu-btn__line block w-8 h-1 bg-neutral-content rounded-full transition-all ease-linear duration-200"
        ></div>
      </button>
    </div>
    <ul
      ref="menu"
      id="menu"
      class="menu menu-vertical w-full bg-transparent fixed md:h-auto top-0 bottom-0 -left-32 md:static h-screen transition-all duration-150 ease-in-out opacity-0 md:opacity-100 md:menu-horizontal"
    >
      <li>
        <RouterLink to="/" class="text-base-content">Home</RouterLink>
      </li>
      <li>
        <RouterLink to="/onecomment" class="text-base-content"
          >One Comment Test</RouterLink
        >
      </li>
    </ul>
    <div class="hidden md:block">
      <label class="flex cursor-pointer gap-2">
        <template v-if="checkboxValue === 'dark'">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path
              d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
            />
          </svg>
        </template>
        <template v-else>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </template>
        <input
          type="checkbox"
          :value="checkboxValue"
          class="toggle theme-controller"
        />
        <template v-if="checkboxValue === 'dark'">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </template>
        <template v-else>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path
              d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
            />
          </svg>
        </template>
      </label>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";

const checkboxValue = ref("dark"); // Default to 'dark'

onMounted(() => {
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

  // Update checkbox value initially
  checkboxValue.value = prefersDarkMode.matches ? "emerald" : "dark";

  // Listen for changes to user's color scheme preference
  prefersDarkMode.addEventListener("change", (event) => {
    checkboxValue.value = event.matches ? "emerald" : "dark";
  });
});

const menu = ref(null);

const toggleMenu = () => {
  if (menu.value) {
    menu.value.classList.toggle("menu--open");
    document
      .querySelector(".menu-btn__line")
      .classList.toggle("menu-btn__line--open");
  }
};
</script>

<style scoped>
.menu--open {
  @apply opacity-100 bg-base-200 left-0;
}

.menu-btn__line--open {
  @apply bg-transparent;
}

.menu-btn__line::after,
.menu-btn__line::before {
  @apply block relative w-8 h-1 bg-neutral-content rounded-full transition-all ease-linear duration-200;
  content: "";
}

.menu-btn__line::before {
  @apply top-2;
}

.menu-btn__line::after {
  @apply bottom-[0.7rem];
}

.menu-btn__line--open::before {
  @apply top-[0.1rem] rotate-45;
}

.menu-btn__line--open::after {
  @apply bottom-[0.1rem] -rotate-45;
}
</style>
