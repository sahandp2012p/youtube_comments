import { createWebHistory, createRouter } from "vue-router";

import HomeView from "./pages/HomeView.vue";
import OneComment from "./pages/OneComment.vue";

const routes = [{ path: "/", component: HomeView }, {path: "/onecomment", component: OneComment}];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
