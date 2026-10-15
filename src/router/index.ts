import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../pages/HomeView.vue"),
      meta: { title: "Home" },
    },
    {
      path: "/fetching",
      name: "fetching",
      component: () => import("../pages/GithubFetching.vue"),
      meta: {
        title: "GitHub Fetching",
      },
    },
    {
      path: "/posts",
      name: "posts",
      component: () => import("../pages/Posts/PostsPage.vue"),
      meta: { title: "Posts" },
    },
    {
      path: "/posts/:id",
      name: "post",
      component: () => import("../pages/Posts/PostsItemPage.vue"),
      props: true,
      beforeEnter: (to) => {
        if ("id" in to.params && !/^\d+$/.test(to.params.id)) {
          return { name: "posts" };
        }
      },
      meta: {
        title: (to) => {
          if ("id" in to.params) {
            return `Post #${to.params.id}`;
          } else {
            return "Post";
          }
        },
      },
    },
    {
      path: "/composables",
      name: "composables",
      component: () => import("../pages/ComposablesTest.vue"),
      meta: { title: "Composables" },
    },
    {
      path: "/user/:id",
      component: () => import("../pages/User/UserPage.vue"),
      props: true,
      beforeEnter: (to) => {
        if ("id" in to.params && !/^\d+$/.test(to.params.id)) {
          return { name: "posts" };
        }
      },
      meta: {
        title: (to) => {
          if ("id" in to.params) {
            return `User #${to.params.id}`;
          } else {
            return "User";
          }
        },
      },
      children: [
        {
          path: "",
          name: "userInfo",
          component: () => import("../pages/User/UserInfoPage.vue"),
          props: true,
        },
        {
          path: "posts",
          name: "userPosts",
          component: () => import("../pages/User/UserPostsPage.vue"),
          props: true,
        },
      ],
    },
  ],
});

router.afterEach((to, from, failure) => {
  if (failure) {
    return;
  }

  const { title } = to.meta;
  document.title = typeof title === "function" ? title(to) : (title ?? "petpet");
});
