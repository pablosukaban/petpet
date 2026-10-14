import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: () => import("../pages/HomeView.vue") },
    {
      path: "/fetching",
      name: "fetching",
      component: () => import("../pages/GithubFetching.vue"),
    },
    {
      path: "/posts",
      name: "posts",
      component: () => import("../pages/Posts/PostsPage.vue"),
    },
    {
      path: "/posts/:id",
      name: "post",
      component: () => import("../pages/Posts/PostsItemPage.vue"),
      props: true,
    },
    {
      path: "/composables",
      name: "composables",
      component: () => import("../pages/ComposablesTest.vue"),
    },
  ],
});
