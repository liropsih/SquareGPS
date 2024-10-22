import { createRouter, createWebHistory } from "vue-router";
import AboutView from "@/views/AboutView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "about",
      component: AboutView,
    },
    {
      path: "/map/:id?",
      name: "map",
      components: {
        navbar: () => import("@/components/map/MarkerList.vue"),
        default: () => import("@/views/MapView.vue"),
      },
    },
  ],
});

export default router;
