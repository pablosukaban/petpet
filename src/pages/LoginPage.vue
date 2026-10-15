<script setup lang="ts">
import { useAuthStore } from "@/authStore";
import PageComponent from "@/components/PageComponent.vue";
import { useRoute, useRouter } from "vue-router";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const handleClick = () => {
  if (authStore.isAuth) {
    authStore.logOut();
  } else {
    authStore.logIn();

    const redirect = typeof route.query.redirect === "string" ? route.query.redirect : "/posts";
    router.push(redirect);
  }
};
</script>

<template>
  <PageComponent>
    <button @click="handleClick">
      {{ authStore.isAuth ? "Log out" : "Log in" }}
    </button>
  </PageComponent>
</template>

<style scoped></style>
